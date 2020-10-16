import React from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import * as mm from "@magenta/music";
import MagentaCom from '../components/mm.js';
import MusicVAE from '../components/MusicVAE';
import MidiKeyboard from '../components/piano';
import WebPiano from '../components/RecordingPiano';
import RNN from '../components/MusicRNN';

class test extends React.Component {
  
  render(){

    return (
      <div className="App">
        <h4 className="text-center">Piano Roll:</h4>
        <MagentaCom />
        <br/>
        <Generator />
        <br/>
        {/*<MidiKeyboard />*/}
        <WebPiano />
        <br/>
        <RNN />
      </div>
    );

}
}

export default test;
