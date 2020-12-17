import React from 'react';
import * as mm from "@magenta/music";
import WebPiano from '../components/RecordingPiano'
import Slider from 'react-input-slider';
import '../img/page.css'

class RNN extends React.Component {
    constructor(props){
        super()

        this.player = new mm.Player()

        this.state = {
            trio: null,
            player: null,
            x: 0.5,
            tempo : 80,
            mididata: null
        }

        this.TWINKLE_TWINKLE = {
            notes: [
              {pitch: 60, startTime: 0.0, endTime: 0.5},
              {pitch: 60, startTime: 0.5, endTime: 1.0},
              {pitch: 67, startTime: 1.0, endTime: 1.5},
              {pitch: 67, startTime: 1.5, endTime: 2.0},
              {pitch: 69, startTime: 2.0, endTime: 2.5},
              {pitch: 69, startTime: 2.5, endTime: 3.0},
              {pitch: 67, startTime: 3.0, endTime: 4.0},
              {pitch: 65, startTime: 4.0, endTime: 4.5},
              {pitch: 65, startTime: 4.5, endTime: 5.0},
              {pitch: 64, startTime: 5.0, endTime: 5.5},
              {pitch: 64, startTime: 5.5, endTime: 6.0},
              {pitch: 62, startTime: 6.0, endTime: 6.5},
              {pitch: 62, startTime: 6.5, endTime: 7.0},
              {pitch: 60, startTime: 7.0, endTime: 8.0},  
            ],
            totalTime: 8
          };

    }

    componentDidMount = () => {
        
        this.music_rnn = new mm.MusicRNN(
            'https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/melody_rnn')
        
        this.music_rnn.initialize()
    }

    play = () => {
        if (this.player.isPlaying()) {
            this.player.stop()
          return
        }
    }

    mididata = (e) => {
        let mididata = e
        let l = mididata.length

        for( let i = 0; i < l; i++ ){

            for( let j = 0; j < 3; j++ ){
                if(j === 0){
                    Object.defineProperty(mididata[i], 'pitch',
                        Object.getOwnPropertyDescriptor(mididata[i], "midiNumber"));
                    delete mididata[i]['midiNumber'];
                }
                if(j === 1){
                    mididata[i].startTime = parseFloat(mididata[i]['time'].toFixed(1))
                    delete mididata[i]['time'];
                }
                if(j === 2){
                    mididata[i].endTime = parseFloat( (mididata[i]['duration'] + mididata[i]['startTime']).toFixed(1) )
                    delete mididata[i]['duration'];
                }
            }
        }

        let totaltime = mididata[l-1].endTime

        let midiobj = {
            notes: mididata,
            totalTime: totaltime
        }

        this.setState({
            mididata: midiobj
        })
    }

    quantize = () => {
        const seque = mm.sequences.quantizeNoteSequence(this.state.mididata, 4)
        let rnnSteps = this.state.tempo
        let rnnTemp = this.state.x

        this.music_rnn
        .continueSequence(seque, rnnSteps)
        .then((sample) => this.player.start(sample));
    } 

    render(){
        return(
            <div>
                <div className='text-center'>
                <br/>
                <div>
                    <p className="labeltext">Temperature: </p>
                    <Slider
                        axis="x"
                        xstep={0.1}
                        xmin={0.1}
                        xmax={1}
                        x={this.state.x}
                        onChange={({ x }) => this.setState({ x: parseFloat(x.toFixed(2)) })}
                    />
                    <br/>
                </div>
                <br/>
                    <button className="btn btn-info" onClick={()=>this.quantize()}>Generate</button>
                    <button className="btn btn-danger" onClick={()=>this.play()}>Stop</button>
                </div>
                <br/><br/>
                <div className='text-center'>
                    <WebPiano passMidiData={this.mididata}/>
                </div>
            </div>
        )
    }
}

export default RNN;