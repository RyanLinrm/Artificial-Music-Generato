import React, { Component } from 'react'
import RNN from '../components/MusicRNN'
import { Link } from "react-router-dom"
import '../img/page.css'

export default class RNNpage extends Component {
    render() {
        return (
            <div id='rnnpage'>
                <br/>
                <h1 className='pagetext'>Continue with your input melody</h1>
                <br/><br/>
                <RNN />
                <br/>
                <div className="text-center">
                    <Link to="/">
                        <button className="btn btn-info">Back</button>
                    </Link>
                </div>
                <br/>
            </div>
        )
    }
}
