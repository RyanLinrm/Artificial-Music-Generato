import React, { Component } from 'react'
import Chords from '../components/Chords'
import '../img/page.css'

export default class ChordPage extends Component {
    render() {
        return (
            <div id='chordpage'>
                <br/><br/>
                <h1 className='text-center hometext'>Generate Melody With Customized Chord Progression</h1>
                <Chords />
                <br/>
            </div>
        )
    }
}
