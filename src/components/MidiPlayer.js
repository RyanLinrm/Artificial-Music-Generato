import React from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import * as mm from "@magenta/music";

class MagentaCom extends React.Component{
    constructor(props){
        super();

        this.canvasRef = React.createRef();

        this.state = {
            viz: null,
            piano: null,
            vizPlayer: null,
            config: null,
            visualizer: null
        }

    }

    componentDidMount = () => {
        let piano = {
    
            notes: [
                //1st m
                {pitch: 60, startTime: 0.0, endTime: 0.5}, //C4 R
                {pitch: 48, startTime: 0.0, endTime: 0.25}, //C3 L
                {pitch: 52, startTime: 0.25, endTime: 0.5}, //E3 L
      
                {pitch: 60, startTime: 0.5, endTime: 1.0}, //C4 R
                {pitch: 55, startTime: 0.5, endTime: 0.75}, //G3 L
                {pitch: 52, startTime: 0.75, endTime: 1.0}, //E3 L
                
                {pitch: 67, startTime: 1.0, endTime: 1.5}, //G4 R
                {pitch: 48, startTime: 1.0, endTime: 1.25}, //C3 L
                {pitch: 52, startTime: 1.25, endTime: 1.5}, //E3 L
                
                {pitch: 67, startTime: 1.5, endTime: 2.0}, //G4 R
                {pitch: 55, startTime: 1.5, endTime: 1.75}, //G3 L
                {pitch: 52, startTime: 1.75, endTime: 2.0}, //E3 L
                
                {pitch: 69, startTime: 2.0, endTime: 2.5}, //A4 R
                {pitch: 48, startTime: 2.0, endTime: 2.25}, //C3 L
                {pitch: 53, startTime: 2.25, endTime: 2.5}, //F3 L
                
                {pitch: 69, startTime: 2.5, endTime: 3.0}, //A4 R
                {pitch: 57, startTime: 2.5, endTime: 2.75}, //A3 L
                {pitch: 53, startTime: 2.75, endTime: 3.0}, //F3 L
                
                {pitch: 67, startTime: 3.0, endTime: 4.0}, //G4 R
                {pitch: 48, startTime: 3.0, endTime: 3.25}, //C3 L
                {pitch: 52, startTime: 3.25, endTime: 3.5}, //E3 L
                {pitch: 55, startTime: 3.5, endTime: 3.75}, //G3 L
                {pitch: 52, startTime: 3.75, endTime: 4.0}, //E3 L
      
                //2nd m
                {pitch: 65, startTime: 4.0, endTime: 4.5}, //F4 R
                {pitch: 47, startTime: 4.0, endTime: 4.25}, //B2 L
                {pitch: 50, startTime: 4.25, endTime: 4.5}, //D3 L
                
                {pitch: 65, startTime: 4.5, endTime: 5.0}, //F4 R
                {pitch: 55, startTime: 4.5, endTime: 4.75}, //G3 L
                {pitch: 50, startTime: 4.75, endTime: 5.0}, //D3 L
                
                {pitch: 64, startTime: 5.0, endTime: 5.5}, //E4 R
                {pitch: 48, startTime: 5.0, endTime: 5.25}, //C3 L
                {pitch: 52, startTime: 5.25, endTime: 5.5}, //E3 L
                
                {pitch: 64, startTime: 5.5, endTime: 6.0}, //E4 R
                {pitch: 55, startTime: 5.5, endTime: 5.75}, //G3 L
                {pitch: 52, startTime: 5.75, endTime: 6.0}, //E3 L
                
                {pitch: 62, startTime: 6.0, endTime: 6.5}, //D4 R
                {pitch: 47, startTime: 6.0, endTime: 6.25}, //B2 L
                {pitch: 50, startTime: 6.25, endTime: 6.5}, //D3 L
                
                {pitch: 62, startTime: 6.5, endTime: 7.0}, //D4 R
                {pitch: 55, startTime: 6.5, endTime: 6.75}, //G3 L
                {pitch: 50, startTime: 6.75, endTime: 7.0}, //D3 L
                
                {pitch: 60, startTime: 7.0, endTime: 8.0}, //C4 R
                {pitch: 48, startTime: 7.0, endTime: 7.25}, //C3 L  
                {pitch: 52, startTime: 7.25, endTime: 7.5}, //E3 L
                {pitch: 55, startTime: 7.5, endTime: 7.75}, //G3 L
                {pitch: 52, startTime: 7.75, endTime: 8.0}, //E3 L
      
                //3rd m
                //R:
                {pitch: 67, startTime: 8.0, endTime: 8.5},
                {pitch: 67, startTime: 8.5, endTime: 9.0},
                {pitch: 65, startTime: 9.0, endTime: 9.5},
                {pitch: 65, startTime: 9.5, endTime: 10.0},
                {pitch: 64, startTime: 10.0, endTime: 10.5},
                {pitch: 64, startTime: 10.5, endTime: 11.0},
                {pitch: 62, startTime: 11.0, endTime: 12.0},
                //L:
                {pitch: 47, startTime: 8.0, endTime: 8.25}, //B2 L
                {pitch: 50, startTime: 8.25, endTime: 8.5}, //D3 L
                {pitch: 55, startTime: 8.5, endTime: 8.75}, //G3 L
                {pitch: 50, startTime: 8.75, endTime: 9.0}, //D3 L
                
                {pitch: 48, startTime: 9.0, endTime: 9.25}, //C3 L
                {pitch: 52, startTime: 9.25, endTime: 9.5}, //E3 L
                {pitch: 55, startTime: 9.5, endTime: 9.75}, //G3 L
                {pitch: 52, startTime: 9.75, endTime: 10.0}, //E3 L

                {pitch: 47, startTime: 10.0, endTime: 10.25}, //B2 L
                {pitch: 50, startTime: 10.25, endTime: 10.5}, //D3 L
                {pitch: 55, startTime: 10.5, endTime: 10.75}, //G3 L
                {pitch: 50, startTime: 10.75, endTime: 11.0}, //D3 L
                
                {pitch: 48, startTime: 11.0, endTime: 11.25}, //C3 L
                {pitch: 52, startTime: 11.25, endTime: 11.5}, //E3 L
                {pitch: 55, startTime: 11.5, endTime: 11.75}, //G3 L
                {pitch: 52, startTime: 11.75, endTime: 12.0}, //E3 L
                
                //4th m
                //R:
                {pitch: 67, startTime: 12.0, endTime: 12.5},
                {pitch: 67, startTime: 12.5, endTime: 13.0},
                {pitch: 65, startTime: 13.0, endTime: 13.5},
                {pitch: 65, startTime: 13.5, endTime: 14.0},
                {pitch: 64, startTime: 14.0, endTime: 14.5},
                {pitch: 64, startTime: 14.5, endTime: 15.0},
                {pitch: 62, startTime: 15.0, endTime: 16.0},
                //L:
                {pitch: 47, startTime: 12.0, endTime: 12.25}, //B2 L
                {pitch: 50, startTime: 12.25, endTime: 12.5}, //D3 L
                {pitch: 55, startTime: 12.5, endTime: 12.75}, //G3 L
                {pitch: 50, startTime: 12.75, endTime: 13.0}, //D3 L
                
                {pitch: 48, startTime: 13.0, endTime: 13.25}, //C3 L
                {pitch: 52, startTime: 13.25, endTime: 13.5}, //E3 L
                {pitch: 55, startTime: 13.5, endTime: 13.75}, //G3 L
                {pitch: 52, startTime: 13.75, endTime: 14.0}, //E3 L

                {pitch: 47, startTime: 14.0, endTime: 14.25}, //B2 L
                {pitch: 50, startTime: 14.25, endTime: 14.5}, //D3 L
                {pitch: 55, startTime: 14.5, endTime: 14.75}, //G3 L
                {pitch: 50, startTime: 14.75, endTime: 15.0}, //D3 L
                
                {pitch: 48, startTime: 15.0, endTime: 15.25}, //C3 L
                {pitch: 52, startTime: 15.25, endTime: 15.5}, //E3 L
                {pitch: 55, startTime: 15.5, endTime: 15.75}, //G3 L
                {pitch: 52, startTime: 15.75, endTime: 16.0}, //E3 L

                //5th m
                //R:
                {pitch: 60, startTime: 16.0, endTime: 16.5},
                {pitch: 60, startTime: 16.5, endTime: 17.0},
                {pitch: 67, startTime: 17.0, endTime: 17.5},
                {pitch: 67, startTime: 17.5, endTime: 18.0},
                {pitch: 69, startTime: 18.0, endTime: 18.5},
                {pitch: 69, startTime: 18.5, endTime: 19.0},
                {pitch: 67, startTime: 19.0, endTime: 20.0},

                //L:
                {pitch: 48, startTime: 16.0, endTime: 16.25}, //C3 L
                {pitch: 52, startTime: 16.25, endTime: 16.5}, //E3 L
                {pitch: 55, startTime: 16.5, endTime: 16.75}, //G3 L
                {pitch: 52, startTime: 16.75, endTime: 17.0}, //E3 L

                {pitch: 48, startTime: 17.0, endTime: 17.25}, //C3 L
                {pitch: 52, startTime: 17.25, endTime: 17.5}, //E3 L
                {pitch: 55, startTime: 17.5, endTime: 17.75}, //G3 L
                {pitch: 52, startTime: 17.75, endTime: 18.0}, //E3 L

                {pitch: 48, startTime: 18.0, endTime: 18.25}, //C3 L
                {pitch: 53, startTime: 18.25, endTime: 18.5}, //F3 L
                {pitch: 57, startTime: 18.5, endTime: 18.75}, //A3 L
                {pitch: 53, startTime: 18.75, endTime: 19.0}, //F3 L

                {pitch: 48, startTime: 19.0, endTime: 19.25}, //C3 L
                {pitch: 52, startTime: 19.25, endTime: 19.5}, //E3 L
                {pitch: 55, startTime: 19.5, endTime: 19.75}, //G3 L
                {pitch: 52, startTime: 19.75, endTime: 20.0}, //E3 L
                
                //last m
                //R:
                {pitch: 65, startTime: 20.0, endTime: 20.5},
                {pitch: 65, startTime: 20.5, endTime: 21.0},
                {pitch: 64, startTime: 21.0, endTime: 21.5},
                {pitch: 64, startTime: 21.5, endTime: 22.0},
                {pitch: 62, startTime: 22.0, endTime: 22.5},
                {pitch: 62, startTime: 22.5, endTime: 23.0},
                {pitch: 60, startTime: 23.0, endTime: 24.0}, 

                //L:
                {pitch: 47, startTime: 20.0, endTime: 20.25}, //B2 L
                {pitch: 50, startTime: 20.25, endTime: 20.5}, //D3 L
                {pitch: 55, startTime: 20.5, endTime: 20.75}, //G3 L
                {pitch: 50, startTime: 20.75, endTime: 21.0}, //D3 L

                {pitch: 48, startTime: 21.0, endTime: 21.25}, //C3 L
                {pitch: 52, startTime: 21.25, endTime: 21.5}, //E3 L
                {pitch: 55, startTime: 21.5, endTime: 21.75}, //G3 L
                {pitch: 52, startTime: 21.75, endTime: 22.0}, //E3 L

                {pitch: 47, startTime: 22.0, endTime: 22.25}, //B2 L
                {pitch: 50, startTime: 22.25, endTime: 22.5}, //D3 L
                {pitch: 55, startTime: 22.5, endTime: 22.75}, //G3 L
                {pitch: 50, startTime: 22.75, endTime: 23.0}, //D3 L

                {pitch: 48, startTime: 23.0, endTime: 23.25}, //C3 L
                {pitch: 52, startTime: 23.25, endTime: 23.5}, //E3 L
                {pitch: 55, startTime: 23.5, endTime: 23.75}, //G3 L
                {pitch: 52, startTime: 23.75, endTime: 24.0}, //E3 L
            ],
            totalTime: 24
        };

        const canvas = this.canvasRef.current;
  
        //let player = new mm.Player();
        let viz = new mm.Visualizer(piano, canvas);
      
        let vizPlayer = new mm.Player(false, {
            run: (note) => this.state.viz.redraw(note),
            stop: () => {console.log('done');}
        });
        
        let config = {
        noteHeight: 8,
        pixelsPerTimeStep: 30,  // like a note width
        noteSpacing: 1,
        noteRGB: '8, 41, 64',
        activeNoteRGB: '240, 84, 119',
        }
        // Don't edit this line unless you want to break things. :)
        let visualizer = new mm.Visualizer(piano, canvas, config);

        this.setState({
            viz: viz,
            piano: piano,
            vizPlayer: vizPlayer,
            config: config,
            visualizer: visualizer
        })
    }

    pstart = () => {
        if(this.state.vizPlayer !== null){
        console.log('playing')
        this.state.vizPlayer.start(this.state.piano);}
    }
        
    pend = () => {
        if(this.state.vizPlayer !== null)
        this.state.vizPlayer.stop();
    }
        
    render(){

        return(
            <div className='text-center'>
                <div>
                    <canvas ref={this.canvasRef} />
                </div>
                <br/>
                <div>
                    <button className="btn btn-outline-primary" onClick={()=>this.pstart()}>play</button>
                    <button className="btn btn-outline-danger" onClick={()=>this.pend()}>stop</button>
                </div>
            </div>
        )
    }
}

export default MagentaCom;