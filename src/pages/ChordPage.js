import React, { Component } from 'react'
import Chords from '../components/Chords'

export default class ChordPage extends Component {
    render() {
        return (
            <div>
                <h1 className='text-center'>Generate Melody With Customized Chord Progression</h1>
                <br/><br/>
                <Chords />
            </div>
        )
    }
}
