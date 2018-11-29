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
    this.oscillator.type = 'sine'
    this.oscillator.start()
    this.moog = new this.tuna.MoogFilter({
      cutoff: 0.5,    //0 to 1
      resonance: 2,   //0 to 4
      bufferSize: 256,  //256 to 16384
      bypass: 1
    })
    this.pingPong = new this.tuna.PingPongDelay({
      wetLevel: 0.5, //0 to 1
      feedback: 0.3, //0 to 1
      delayTimeLeft: 150, //1 to 10000 (milliseconds)
      delayTimeRight: 200, //1 to 10000 (milliseconds)
      bypass: 0
    })
    this.delay = new this.tuna.Delay({
      feedback: 0.45,    //0 to 1+
      delayTime: 150,    //1 to 10000 milliseconds
      wetLevel: 0.25,    //0 to 1+
      dryLevel: 1,       //0 to 1+
      cutoff: 2000,      //cutoff frequency of the built in lowpass-filter. 20 to 22050
      bypass: 0
    })
    this.overdrive = new this.tuna.Overdrive({
      outputGain: 0.9,         //0 to 1+
      drive: .5,              //0 to 1
      curveAmount: 1,          //0 to 1
      algorithmIndex: 0,       //0 to 5, selects one of our drive algorithms
      bypass: 0
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
      this.oscillator.connect(this.moog)
      this.moog.connect(this.delay)
      this.delay.connect(this.overdrive)
      this.overdrive.connect(this.gain)
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
    console.log(this.pingPong)
    return (
      <div className={[this.state.natural, this.state.played].join(' ')}>
        <h3 >{this.props.note}</h3>
      </div>
    )
  }
}

export default Synth
