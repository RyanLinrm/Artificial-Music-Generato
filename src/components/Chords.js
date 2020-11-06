import React, { Component } from 'react'
import * as mm from "@magenta/music";

export default class Chords extends Component {
    constructor(){
        super()

        this.model = new mm.MusicRNN(
            'https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/chord_pitches_improv')
        this.model.initialize()
        
        const player = new mm.Player();

        this.state = {
            chordProg : [],
            chord1 : '',
            chord2 : '',
            chord3 : '',
            chord4 : ''
        }

        this.sample1 = {
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

    handleChange1 = (event) => {
        this.setState({
            chord1 : event.target.value
        })
    }

    handleChange2 = (event) => {
        this.setState({
            chord2 : event.target.value
        })
    }

    handleChange3 = (event) => {
        this.setState({
            chord3 : event.target.value
        })
    }

    handleChange4 = (event) => {
        this.setState({
            chord4 : event.target.value
        })
    }

    play = () => {
        if (this.player.isPlaying()) {
            this.player.stop()
          return
        }
    }

    quantize = () => {
        const seque = mm.sequences.quantizeNoteSequence(this.sample1, 4)
        let rnnSteps = 40
        let rnnTemp = 0.5
        let chords = []
        chords.push(this.state.chord1)
        chords.push(this.state.chord2)
        chords.push(this.state.chord3)
        chords.push(this.state.chord4)

        this.model
        .continueSequence(seque, rnnSteps, rnnTemp, chords)
        .then((sample) => this.player.start(sample));
    } 

    render() {
        return (
            <div className='text-center'>
                <h5>Please Enter Your Chords Progression:</h5>
                <br/>
                <div>
                    <input type="text" value={this.state.chord1} onChange={this.handleChange1} />
                    <p>--</p>
                    <input type="text" value={this.state.chord2} onChange={this.handleChange2} />
                    <p>--</p>
                    <input type="text" value={this.state.chord3} onChange={this.handleChange3} />
                    <p>--</p>
                    <input type="text" value={this.state.chord4} onChange={this.handleChange4} />
                </div>
                <br/>
                <br/>
                <div>
                    <button className="btn btn-outline-info" onClick={()=>this.quantize()}>Generate</button>
                    <button className="btn btn-outline-danger" onClick={()=>this.play()}>Stop</button>
                </div>
            </div>
        )
    }
}
