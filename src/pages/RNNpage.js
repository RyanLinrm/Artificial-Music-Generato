import React, { Component } from 'react'
import RNN from '../components/MusicRNN'
import '../img/page.css'

export default class RNNpage extends Component {
    render() {
        return (
            <div id='rnnpage'>
                <br/>
                <h1 className='pagetext'>Continue with your input melody</h1>
                <br/><br/>
                <RNN />
                <br/><br/>
                <br/>
            </div>
        )
    }
}
