import React, { Component } from 'react'
import MidiKeyboard from '../components/piano'
import MagentaCom from '../components/MidiPlayer.js';

export default class Toolspage extends Component {
    render() {
        return (
            <div>
                <div>
                    <h1 className='text-center'>MIDI Player</h1>
                    <MagentaCom />
                </div>
                <br/><br/><br/>
                <div>
                    <h1 className='text-center'>Piano Keyboard</h1>
                    <MidiKeyboard />
                </div>
            </div>
        )
    }
}
