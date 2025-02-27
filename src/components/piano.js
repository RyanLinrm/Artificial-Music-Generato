import React from 'react';
import ReactDOM from 'react-dom';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
import DimensionsProvider from '../DimensionsProvider';
import SoundfontProvider from '../SoundfontProvider';

export default function MidiKeyboard(props) {
    const firstNote = MidiNumbers.fromNote('c3');
    const lastNote = MidiNumbers.fromNote('f4');
    const keyboardShortcuts = KeyboardShortcuts.create({
        firstNote: firstNote,
        lastNote: lastNote,
        keyboardConfig: KeyboardShortcuts.QWERTY_ROW,
    });

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';

    const noteRange = {
        first: MidiNumbers.fromNote('c3'),
        last: MidiNumbers.fromNote('f4'),
    };
      
    return (
        <DimensionsProvider>
            {({ containerWidth, containerHeight }) => (
                <SoundfontProvider
                    instrumentName="acoustic_grand_piano"
                    audioContext={audioContext}
                    hostname={soundfontHostname}
                    render={({ isLoading, playNote, stopNote }) => (
                        <Piano
                            noteRange={noteRange}
                            width={containerWidth}
                            playNote={playNote}
                            stopNote={stopNote}
                            disabled={isLoading}
                            keyboardShortcuts={keyboardShortcuts}
                            {...props}
                        />
                    )}
                />
            )}
        </DimensionsProvider>
    );
}