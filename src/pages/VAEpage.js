import React, { Component } from 'react'
import MusicVAE from '../components/MusicVAEtrio'

export default class VAEpage extends Component {
    render() {
        return (
            <div>
                <h1 className='text-center'>Generate a Random Trio Artificially</h1>
                <br/><br/>
                <MusicVAE />

            </div>
        )
    }
}
