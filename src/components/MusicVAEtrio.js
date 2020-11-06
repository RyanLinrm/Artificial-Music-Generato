import React from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import * as mm from "@magenta/music";
import Slider from 'react-input-slider';

class MusicVAE extends React.Component {
    constructor(props){
        super()

        this.canvasRef2 = React.createRef();

        const model = new mm.MusicVAE(
            'https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/trio_4bar');
        const player = new mm.Player();

        this.state = {
            trio: null,
            player: player,
            model: model,
            canvasrf: null,
            x: 0.5
        }

    }

    componentDidMount = () => {
        
        let canvasrf = this.canvasRef2.current;

        this.setState({
           canvasrf: canvasrf
        })
    }


    generate = () => {

            this.state.player.resumeContext(); // enable audio
            this.state.model.sample(1, this.state.x)
            .then((samples) => {
                let trio = samples[0];
                this.setState({
                    trio: trio
                })
                });
    }

    start = () => {

        let trio = this.state.trio;

        if(trio){

            this.state.player.start(trio);
        }
    }
    end = () => {
        this.state.player.stop();
    }

    show = () => {
        console.log(this.state.trio)
        
        const midi = mm.sequenceProtoToMidi(this.state.trio);
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

    render(){
        return(
            <div className="text-center">
                <div>
                    <canvas ref={this.canvasRef2} />
                </div>
                <br/>
                <div>
                    <div>{'Temperature: ' + this.state.x}</div>
                    <Slider
                        axis="x"
                        xstep={0.1}
                        xmin={0.1}
                        xmax={1.5}
                        x={this.state.x}
                        onChange={({ x }) => this.setState({ x: parseFloat(x.toFixed(2)) })}
                    />
                </div>
                <div>
                    <button className="btn btn-outline-info" onClick={()=>this.generate()}>Generate</button>
                </div>
                <br/>
                <div>
                    <button className="btn btn-outline-primary" onClick={()=>this.start()}>play</button>
                    <button className="btn btn-outline-danger" onClick={()=>this.end()}>stop</button>
                </div>
                <br/>
                <div>
                    <button className="btn btn-outline-info" onClick={()=>this.show()}>save midi</button>
                </div>
            </div>
        )
    }
}

export default MusicVAE;