import React, { Component } from 'react'
import * as mm from "@magenta/music"
import Slider from 'react-input-slider'

export default class Chords extends Component {
    constructor(){
        super()

        this.canvasRef = React.createRef();
        this.tf = mm.tf

        let sq1, sq2

        this.model = new mm.MusicVAE
                        ('https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/multitrack_chords')
        this.model.initialize().then( ()=> {
            setTimeout( ()=> {
                this.generateSample( z => {
                    this.setState({
                        seq1: z
                    })
                    this.generateSample( z => {
                        this.setState({
                            seq2: z
                        })
                    })
                })
            },0)
        })
        this.player = new mm.SoundFontPlayer(
            'https://storage.googleapis.com/download.magenta.tensorflow.org/soundfonts_js/sgm_plus'
        );

        this.state = {
            chordProg : ['C','Am','F','G'],
            chord1 : 'C',
            chord2 : 'Am',
            chord3 : 'F',
            chord4 : 'G',
            music: null,
            viz: null,
            visualizer: null,
            canvasrf: null,
            tempo: 120,
            seq1: null,
            seq2: null,
            x: 0,
            chordseqs: null,
            finalSeq: null
        }

        this.sample1 = {
            notes: [
                //1st m
                {pitch: 60, startTime: 0.0, endTime: 0.5}, //C4 R
      
                {pitch: 60, startTime: 0.5, endTime: 1.0}, //C4 R
                
                {pitch: 67, startTime: 1.0, endTime: 1.5}, //G4 R
                
                {pitch: 67, startTime: 1.5, endTime: 2.0}, //G4 R
                
                {pitch: 69, startTime: 2.0, endTime: 2.5}, //A4 R
                
                {pitch: 69, startTime: 2.5, endTime: 3.0}, //A4 R
                
                {pitch: 67, startTime: 3.0, endTime: 4.0}, //G4 R
      
                //2nd m
                {pitch: 65, startTime: 4.0, endTime: 4.5}, //F4 R
                
                {pitch: 65, startTime: 4.5, endTime: 5.0}, //F4 R
                
                {pitch: 64, startTime: 5.0, endTime: 5.5}, //E4 R
  
                
                {pitch: 64, startTime: 5.5, endTime: 6.0}, //E4 R

                
                {pitch: 62, startTime: 6.0, endTime: 6.5}, //D4 R

                
                {pitch: 62, startTime: 6.5, endTime: 7.0}, //D4 R

                
                {pitch: 60, startTime: 7.0, endTime: 8.0}, //C4 R

      
                //3rd m
                //R:
                {pitch: 67, startTime: 8.0, endTime: 8.5},
                {pitch: 67, startTime: 8.5, endTime: 9.0},
                {pitch: 65, startTime: 9.0, endTime: 9.5},
                {pitch: 65, startTime: 9.5, endTime: 10.0},
                {pitch: 64, startTime: 10.0, endTime: 10.5},
                {pitch: 64, startTime: 10.5, endTime: 11.0},
                {pitch: 62, startTime: 11.0, endTime: 12.0},

                
                //4th m
                //R:
                {pitch: 67, startTime: 12.0, endTime: 12.5},
                {pitch: 67, startTime: 12.5, endTime: 13.0},
                {pitch: 65, startTime: 13.0, endTime: 13.5},
                {pitch: 65, startTime: 13.5, endTime: 14.0},
                {pitch: 64, startTime: 14.0, endTime: 14.5},
                {pitch: 64, startTime: 14.5, endTime: 15.0},
                {pitch: 62, startTime: 15.0, endTime: 16.0},


                //5th m
                //R:
                {pitch: 60, startTime: 16.0, endTime: 16.5},
                {pitch: 60, startTime: 16.5, endTime: 17.0},
                {pitch: 67, startTime: 17.0, endTime: 17.5},
                {pitch: 67, startTime: 17.5, endTime: 18.0},
                {pitch: 69, startTime: 18.0, endTime: 18.5},
                {pitch: 69, startTime: 18.5, endTime: 19.0},
                {pitch: 67, startTime: 19.0, endTime: 20.0},

                
                //last m
                //R:
                {pitch: 65, startTime: 20.0, endTime: 20.5},
                {pitch: 65, startTime: 20.5, endTime: 21.0},
                {pitch: 64, startTime: 21.0, endTime: 21.5},
                {pitch: 64, startTime: 21.5, endTime: 22.0},
                {pitch: 62, startTime: 22.0, endTime: 22.5},
                {pitch: 62, startTime: 22.5, endTime: 23.0},
                {pitch: 60, startTime: 23.0, endTime: 24.0}, 

            ],
            totalTime: 24
        };

    }

    componentDidMount = () => {
        
        let canvasrf = this.canvasRef.current;

        this.setState({
           canvasrf: canvasrf
        })
    }

    generateSample = (callBack) =>{

        let sample = this.tf.randomNormal([1, 256])
        sample.data().then( sampleArray => {
            sample.dispose()
            callBack(sampleArray)
        })
    }

    splinearinterp = (z1, z2, n) =>{
        let norm1 = this.tf.norm(z1)
        let norm2 = this.tf.norm(z2)
        let omega = this.tf.acos( this.tf.matMul(this.tf.div(z1, norm1),
                                                this.tf.div(z2, norm2),
                                                false, true))
        let sinOmega = this.tf.sin(omega)
        let t1 = this.tf.linspace(1, 0, n)
        let t2 = this.tf.linspace(0, 1, n)
        let alpha1 = this.tf.div(this.tf.sin(this.tf.mul(t1, omega)), sinOmega).as2D(n, 1)
        let alpha2 = this.tf.div(this.tf.sin(this.tf.mul(t2, omega)), sinOmega).as2D(n, 1)
        let z = this.tf.add(this.tf.mul(alpha1, z1), this.tf.mul(alpha2, z2))
        return z
    }

    interpSamplesOn1Chord = (chord, callBack) => {
        let z1Tensor = this.tf.tensor2d(this.state.seq1, [1, 256])
        let z2Tensor = this.tf.tensor2d(this.state.seq2, [1, 256])
        let zInterp = this.splinearinterp(z1Tensor, z2Tensor, 6);

        this.model.decode(zInterp, undefined, [chord], 24)
            .then( seq =>{
                callBack(seq)
        })
    }

    interpSamplesOnAllChords = ( index, result, callBack) => {
        if( index === this.state.chordProg.length ){
            callBack(result)
        }
        else{
            this.interpSamplesOn1Chord(this.state.chordProg[index], seqs => {
                for( let i = 0; i < 6; i++ ) {
                    result[i].push(seqs[i]);
                }
                this.interpSamplesOnAllChords( index + 1, result, callBack)
            })
        }
    }


    handleChange1 = (event) => {
        let chord = event.target.value
        let chordp = this.state.chordProg
        if(chordp.length === 0){
            chordp.push(chord)
        }
        else{
            chordp.splice(0, 1, chord)
        }
        this.setState({
            chord1: chord,
            chordProg : chordp
        })
    }

    handleChange2 = (event) => {
        let chord = event.target.value
        let chordp = this.state.chordProg
        if(chordp.length === 0){
            chordp.push('C')
            chordp.push(chord)
        }
        else{
            chordp.splice(1, 1, chord)
        }
        this.setState({
            chord2: chord,
            chordProg : chordp
        })
    }

    handleChange3 = (event) => {
        let chord = event.target.value
        let chordp = this.state.chordProg
        if(chordp.length === 0){
            chordp.push('C')
            chordp.push('F')
            chordp.push(chord)
        }
        else{
            chordp.splice(2, 1, chord)
        }
        this.setState({
            chord3: chord,
            chordProg : chordp
        })
    }

    handleChange4 = (event) => {
        let chord = event.target.value
        let chordp = this.state.chordProg
        if(chordp.length === 0){
            chordp.push('C')
            chordp.push('F')
            chordp.push('Am')
            chordp.push(chord)
        }
        else{
            chordp.splice(3, 1, chord)
        }
        this.setState({
            chord4: chord,
            chordProg : chordp
        })
    }

    conactenateSeqs = (seqs) => {
        let finalseq = new mm.sequences.clone(seqs[0])
        let steps = seqs[0].totalQuantizedSteps

        for( let i = 1; i < seqs.length; i++ ){
            let s = new mm.sequences.clone(seqs[i]);
            s.notes.forEach( note => {
                note.quantizedStartStep += steps
                note.quantizedEndStep += steps
                finalseq.notes.push(note)
            })
            steps += s.totalQuantizedSteps
        }
        finalseq.totalQuantizedSteps = steps
        return finalseq
    }


    generateProgressions = (callBack) => {
        let temp = [];
        for( let i = 0; i < 6; i++ ){
            temp.push([])
        }

        this.interpSamplesOnAllChords( 0, temp, seqs => {
            let sq = seqs
            let concatSeqs = sq.map( seq => this.conactenateSeqs(seq))
            let chordseqs = concatSeqs.map( seq => {
                let mergeSeq = new mm.sequences.mergeInstruments(seq)
                let chordseq = new mm.sequences.unquantizeSequence(mergeSeq)
                chordseq.ticksPerQuarter = 24
                return chordseq
            })

            let finalSeq = this.conactenateSeqs( concatSeqs )
            let mergedFinalSeq = new mm.sequences.mergeInstruments(finalSeq)

            this.player.loadSamples(mergedFinalSeq).then(callBack)
            this.setState( {
                chordseqs: sq,
                finalSeq: mergedFinalSeq
            })
        })
    }

    sequenceAdjustment = (seq) =>{
        let sq = new mm.sequences.clone(seq)
        sq.notes.forEach( (note) => {
            let offset = 0.01 * (Math.random() - 0.5)
            if( sq.notes.startTime + offset < 0 ){
                offset = -seq.notes.startTime
            }
            if( sq.notes.endTime > sq.totalTime ){
                offset = sq.totalTime - sq.notes.endTime
            }
            sq.notes.startTime += offset
            sq.notes.endTime += offset
        })
        return sq
    }

    play = (chordi) => {
        let index = this.state.x
        let playingSeq = new mm.sequences.unquantizeSequence(this.state.chordseqs[index][chordi])
        this.player.start(this.sequenceAdjustment(playingSeq)).then( ()=> {
            let nexti = (chordi + 1 )% this.state.chordProg.length
            this.play(nexti)
        })
        //console.log(this.state.chordseqs)
        /*console.log(this.state.x)
        console.log(chordi)*/
    }

    stop = () => {
        if (this.player.isPlaying()) {
            this.player.stop()
        }
    }

    quantize = async() => {
        await this.generateProgressions()
        //console.log(this.state.seq2)
    }

    /*quantize = async() => {
        const seque = mm.sequences.quantizeNoteSequence(this.sample1, 4)
        let rnnSteps = 80
        let rnnTemp = 0.8
        let chords = []
        chords.push(this.state.chord1)
        chords.push(this.state.chord2)
        chords.push(this.state.chord3)
        chords.push(this.state.chord4)

        await this.model
        .continueSequence(seque, rnnSteps, rnnTemp, chords)
        .then((sample) => this.setState({ music: sample}));

        /*let seq = this.state.music.notes
        seq.push({totalQuantizedSteps : 80})
        const notes = mm.sequences.quantizeNoteSequence(seq, 4)

        
        let viz = new mm.Visualizer(notes, this.state.canvasrf)
            
        let player = new mm.Player( false, {
                run: (note) => this.state.viz.redraw(note),
                stop: ()=> {console.log('done')}
            })

            let config = {
                noteHeight: 8,
                pixelsPerTimeStep: 30,
                noteSpacing: 1,
                noteRGB: '8, 41, 64',
                activeNoteRGB: '240, 84, 119',
                }
            let visualizer = new mm.Visualizer(notes, this.state.canvasrf, config)

            this.setState({
                viz: viz,
                visualizer: visualizer,
                player: player
            })*/
            /*let player = new mm.Player();
            this.setState({player: player})*/
    //} 

    render() {
        return (
            <div className='text-center'>
                <div>
                    <canvas ref={this.canvasRef} />
                </div>
                <br/>
                <div>
                <div>{'Randomness: '}</div>
                    <Slider
                        axis="x"
                        xstep={1}
                        xmin={0}
                        xmax={5}
                        x={this.state.x}
                        onChange={({ x }) => this.setState({ x: parseInt(x) })}
                    />
                </div>
                <br/>
                <h5>Please Enter Your Chords Progression:</h5>
                <br/>
                <div>
                    <input type="text" value={this.state.chord1} onChange={this.handleChange1} />
                    <p>--</p>
                    <input type="text" value={this.state.chord2} onChange={this.handleChange2} />
                    <p>--</p>
                    <input type="text" value={this.state.chord3} onChange={this.handleChange3} />
                    <p>--</p>
                    <input type="text" value={this.state.chord4} onChange={this.handleChange4} />
                </div>
                <br/>
                <br/>
                <div>
                    <button className="btn btn-outline-info" onClick={()=>this.quantize()}>Generate</button>
                    <button className="btn btn-outline-primary" onClick={()=>this.play(0)}>Play</button>
                    <button className="btn btn-outline-danger" onClick={()=>this.stop()}>Stop</button>
                </div>
            </div>
        )
    }
}
