import React, { Component } from 'react'

export class Homepage extends Component {
    render() {
        return (
            <div>
                <br/>
                <h1 className="text-center">Home Page</h1>
                <h3 className='text-center'>Artificial Music Generator</h3>
                <br/><br/><br/>
                <div className='text-center'>
                    <button className='btn btn-primary'>Generate Trio</button>
                    <br/><br/>
                    <button className='btn btn-success'>Generate Melody</button>
                    <br/><br/>
                    <button className='btn btn-danger'>Continues a Melody</button>
                    <br/><br/>
                    <button className='btn btn-secondary'>Tools</button>
                    <br/><br/>
                    <button className='btn btn-info'>About</button>
                    <br/><br/>
                    <button className='btn'>Login</button>
                </div>
            </div>
        )
    }
}

export default Homepage
