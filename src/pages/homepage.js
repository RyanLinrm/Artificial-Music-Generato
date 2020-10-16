import React, { Component } from 'react'
import { Route, Link, withRouter } from "react-router-dom";

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
        this.props.history.push(`/tools`);
    }
    
    render() {
        return (
            <div>
                <br/>
                <h1 className="text-center">Home Page</h1>
                <h3 className='text-center'>Artificial Music Generator</h3>
                <br/><br/><br/>
                <div className='text-center'>
                    <button className='btn btn-primary' onClick={this.redirect1}>Generate Trio</button>
                    <br/><br/>
                    <button className='btn btn-success' onClick={this.redirect2}>Generate Melody</button>
                    <br/><br/>
                    <button className='btn btn-danger'>Continues a Melody</button>
                    <br/><br/>
                    <button className='btn btn-secondary' onClick={this.redirect3}>Tools</button>
                    <br/><br/>
                    <button className='btn btn-info'>About</button>
                    <br/><br/>
                    <button className='btn'>Login</button>
                </div>
            </div>
        )
    }
}

export default withRouter(Homepage)
