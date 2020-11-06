import React from 'react';
import * as mm from "@magenta/music";
import WebPiano from '../components/RecordingPiano'
import Slider from 'react-input-slider';

class RNN extends React.Component {
    constructor(props){
        super()

        this.player = new mm.Player()

        this.state = {
            trio: null,
            player: null,
            x: 0.5
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

    quantize = () => {
        const seque = mm.sequences.quantizeNoteSequence(this.TWINKLE_TWINKLE, 4)
        let rnnSteps = 80
        let rnnTemp = this.state.x

        this.music_rnn
        .continueSequence(seque, rnnSteps, rnnTemp)
        .then((sample) => this.player.start(sample));
    } 

    render(){
        return(
            <div>
                <div className='text-center'>
                <br/>
                <div>
                    <div>{'Temperature: ' + this.state.x}</div>
                    <Slider
                        axis="x"
                        xstep={0.1}
                        xmin={0.1}
                        xmax={1}
                        x={this.state.x}
                        onChange={({ x }) => this.setState({ x: parseFloat(x.toFixed(2)) })}
                    />
                </div>
                    <button className="btn btn-outline-info" onClick={()=>this.quantize()}>Generate</button>
                    <button className="btn btn-outline-danger" onClick={()=>this.play()}>Stop</button>
                </div>
                <br/><br/><br/>
                <div className='text-center'>
                    <WebPiano />
                </div>
            </div>
        )
    }
}

export default RNN;