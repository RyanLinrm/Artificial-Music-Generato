import React from 'react';
import ReactDOM from 'react-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './App.css';
import YouTube from 'react-youtube';
import Cookies from 'js-cookie';
import QRCode from 'qrcode.react'
import * as mm from "@magenta/music";
import MagentaCom from './mm.js';
import Generator from './generator';
import MidiKeyboard from './piano';
import WebPiano from './pianowhre';
import RNN from './components/MusicRNN';

class App extends React.Component {
  
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

export default App;
