import React, { Component } from 'react'
import MusicVAE from '../components/MusicVAEtrio'
import { Link } from "react-router-dom"
import '../img/page.css'

export default class VAEpage extends Component {
    render() {
        return (
            <div id="vaepage">
                <br/><br/>
                <h1 className='text-center hometext'>Generate a Random Trio Artificially</h1>
                <br/><br/><br/><br/>
                <MusicVAE />
                <br/><br/><br/><br/>
                <div className="text-center">
                    <Link to="/">
                        <button className="btn btn-info">Back</button>
                    </Link>
                </div>
                <br/><br/><br/>
                <br/>

            </div>
        )
    }
}
