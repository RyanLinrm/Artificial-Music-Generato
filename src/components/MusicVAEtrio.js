import React from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import * as mm from "@magenta/music";
import Slider from 'react-input-slider';

class MusicVAE extends React.Component {
    constructor(props){
        super()

        const model = new mm.MusicVAE(
            'https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/trio_4bar');
        model.initialize();

        const player = new mm.SoundFontPlayer(
            'https://storage.googleapis.com/download.magenta.tensorflow.org/soundfonts_js/sgm_plus'
        );

        this.state = {
            trios: null,
            trioNum : 1,
            player: player,
            model: model,
            canvasrf: null,
            x: 1.0,
            tempo: 80
        }

    }


    generate = () => {

            this.state.player.resumeContext(); // enable audio
            this.state.model.sample(1, this.state.x)
            .then((samples) => {
                this.setState({
                    trios: samples
                    //trioNum: samples.length
                })
            });
        
    }

    start = (index) => {

        let trios = this.state.trios
        //let trioNum = this.state.trioNum
        let tempo = this.state.tempo

        if(trios){

            this.state.player.start(trios[index], tempo)
                .then( ()=> {
                    //let nexti = (index + 1) % trioNum
                    this.start(index)
                });
        }
    }

    end = () => {
        this.state.player.stop();
    }

    downloadMidi = () => {
        
        if( this.state.trios != null){
            const midi = mm.sequenceProtoToMidi(this.state.trios[0]);
            const file = new Blob([midi], {type: 'audio/midi'});
        
            if (window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(file, 'midi.mid');
            } else { // Others
                const a = document.createElement('a');
                const url = URL.createObjectURL(file);
                a.href = url;
                a.download = 'midi.mid';
                document.body.appendChild(a);
                a.click();
                setTimeout(() => {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);  
                }, 0); 
            }
        }
    }

    render(){
        return(
            <div className="text-center">
                <div>
                    <p className="labeltext2">Temperature: </p>
                    <Slider
                        axis="x"
                        xstep={0.1}
                        xmin={0.5}
                        xmax={1.5}
                        x={this.state.x}
                        onChange={({ x }) => this.setState({ x: parseFloat(x.toFixed(2)) })}
                    />
                    <br/><br/>
                    <p className="labeltext2">Tempo: </p>
                    <Slider
                        axis="x"
                        xstep={1}
                        xmin={60}
                        xmax={120}
                        x={this.state.tempo}
                        onChange={({ x }) => this.setState({ tempo: parseInt(x) })}
                    />
                </div>
                <br/><br/>
                <div>
                    <button className="btn btn-info" onClick={()=>this.generate()}>Generate</button>
                </div>
                <br/>
                <div>
                    <button className="btn btn-primary" onClick={()=>this.start(0)}>play</button>
                    <button className="btn btn-danger" onClick={()=>this.end()}>stop</button>
                </div>
                <br/>
                <div>
                    <button className="btn btn-info" onClick={()=>this.downloadMidi()}>save midi</button>
                </div>
            </div>
        )
    }
}

export default MusicVAE;