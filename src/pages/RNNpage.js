import React, { Component } from 'react'
import RNN from '../components/MusicRNN'

export default class RNNpage extends Component {
    render() {
        return (
            <div>
                <h1 className='text-center'>Generate a Random Trio Artificially</h1>
                <br/><br/>
                <RNN />
            </div>
        )
    }
}
