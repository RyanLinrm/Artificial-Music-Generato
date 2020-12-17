import React, { Component } from 'react'
import { Route, Link, withRouter } from "react-router-dom"
import '../img/page.css'

export class Homepage extends Component {
    constructor(props) {
        super(props);
    }

    redirect1 = () => {
        this.props.history.push(`/gentrio`);
    }

    redirect2 = () => {
        this.props.history.push(`/genmelody`);
    }

    redirect3 = () => {
        this.props.history.push(`/genwithchords`)
    }

    redirect4 = () => {
        this.props.history.push(`/about`);
    }
    
    render() {
        return (
            <div id='homepage'>
                <br/>
                <h1 className="text-center hometext">Home Page</h1>
                <h2 className='text-center hometext'>Artificial Music Generator</h2>
                <br/><br/><br/>
                <br/><br/>
                <div className='text-center'>
                    <button className='btn btn-primary' onClick={this.redirect1}>Generate Trio</button>
                    <br/><br/><br/>
                    <button className='btn btn-success' onClick={this.redirect3}>Generate Melody by Chords</button>
                    <br/><br/><br/>
                    <button className='btn btn-danger' onClick={this.redirect2}>Continues a Melody</button>
                    <br/><br/><br/>
                    <button className='btn btn-info' onClick={this.redirect4}>About</button>
                    <br/><br/>
                    <br/><br/>
                    <br/><br/>
                    <br/><br/><br/><br/><br/><br/>
                </div>
            </div>
        )
    }
}

export default withRouter(Homepage)
