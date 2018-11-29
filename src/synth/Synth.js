import React, { Component } from 'react'
import Tuna from 'tunajs'

class Synth extends Component {
  constructor(props) {
    super(props)

    this.audioContext = this.props.audioContext
    this.tuna = new Tuna(this.audioContext)
    this.gain = this.audioContext.createGain()
    this.gain.gain.value = 0
    this.oscillator = this.audioContext.createOscillator()
    this.oscillator.frequency.value = this.props.pitch
    this.oscillator.type = 'square'
    this.oscillator.start()
    this.tremolo = new this.tuna.Tremolo({
      intensity: 1,    //0 to 1
      rate: 8,         //0.001 to 8
      stereoPhase: 0,    //0 to 180
      bypass: 0
    })
    this.moog = new this.tuna.MoogFilter({
      cutoff: 0.1,    //0 to 1
      resonance: 2,   //0 to 4
      bufferSize: 256,  //256 to 16384
      bypass: 1
    })
    this.pingPongDelay = new this.tuna.PingPongDelay({
      wetLevel: 0.6, //0 to 1
      feedback: 0.9, //0 to 1
      delayTimeLeft: 150, //1 to 10000 (milliseconds)
      delayTimeRight: 200, //1 to 10000 (milliseconds)
      bypass: 1
    })
    this.overdrive = new this.tuna.Overdrive({
      outputGain: 0.0,         //0 to 1+
      drive: 1,              //0 to 1
      curveAmount: 1,          //0 to 1
      algorithmIndex: 0,       //0 to 5, selects one of our drive algorithms
      bypass: 1
    })

    this.state = {
      oscOn: false,
      natural: this.props.natural,
      played: '',
      oscillator: null,
      gainValue: 0,
      oscType: 'sine'
    }
  }

  componentDidMount = (e) => {
    document.addEventListener('keydown', this.onKey.bind(this))
    document.addEventListener('keyup', this.offKey.bind(this))
  }

  onKey(e) {
    if(e.key === this.props.keyboard) {
      this.gain.gain.setTargetAtTime(this.props.gainValue, this.audioContext.currentTime, 0.05)
      this.oscillator.connect(this.pingPongDelay)
      this.pingPongDelay.connect(this.overdrive)
      this.overdrive.connect(this.moog)
      this.moog.connect(this.gain)
      this.gain.connect(this.audioContext.destination)
      this.setState({ played: 'played'})
    }
  }

  offKey(e) {
    if (e.key === this.props.keyboard) {
      this.gain.gain.setTargetAtTime(0.0000, this.audioContext.currentTime, 0.0015)
      this.setState({ played: ''})
    }
  }

  render () {
    // console.log(this.props.chorusRate)
    return (
      <div className={[this.state.natural, this.state.played].join(' ')}>
        <h3 >{this.props.note}</h3>
      </div>
    )
  }
}

export default Synth
