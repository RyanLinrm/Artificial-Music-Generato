import React from 'react';
import ReactDOM from 'react-dom'
import '../img/page.css'
import { Link } from "react-router-dom";

class AboutPage extends React.Component {
  
  render(){

    return (
      <div id='aboutpage'>
        <br/>
        <h1 className="text-center hometext">About This Project</h1>
        <p className='abouttext'>This is a project that uses two different Neural Networks which are Recurrent Neural Networks(RNN) and Variational Autoencoder(VAE) 
          from Google Magenta to solve the problem of Artificial Music Generation. There is only one simple goal which is to 
          generate music artificially, but in three different ways. It allows users to either <br/><br/>1.simply press a button to artificially 
          and randomly generate a short piece of trio, <br/>2.input a customized chord progression and then generates a few measures of 
          instrumental pattern artificially based on the user input, or <br/>3.input a MIDI sequence with their PC keyboard through the web piano 
          interface, and then generate a short piece of melody that continues the user input. <br/><br/>
          After generating the music, the user can always play it back with Web SoundFont Player to listen to it. 
          Users are able to regenerate as many times as they want, and save the result as a midi file to local machine. <br/><br/>
          Enjoy Generating!</p>
        <br/><br/>
        <h1 className="pagetitle">About Me</h1>
        <div className='abouttext2'>
          <h4>Runmin Lin</h4>
          <h5>Email: runminlin@gmail.com</h5>
          <a href="https://www.linkedin.com/in/runminlin/" alt="linkedin" style={{color: 'aqua'}}>Linkedin</a>
        </div>
        <br/><br/>
        <div className="text-center">
            <Link to="/">
                  <button className="btn btn-info">Back</button>
            </Link>
        </div>
        <br/>
      </div>
    );

}
}

export default AboutPage;
