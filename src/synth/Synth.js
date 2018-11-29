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
    this.moog = new this.tuna.MoogFilter({
      cutoff: .5,    //0 to 1
      resonance: 2,   //0 to 4
      bufferSize: 256,  //256 to 16384
      bypass: 0
    })

    this.chorus = new this.tuna.Chorus({
      rate: 5,         //0.01 to 8+
      feedback: 0.4,     //0 to 1+
      delay: 0.5,     //0 to 1
      bypass: 0        //the value 1 starts the effect as bypassed, 0 or 1
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

  toggleValue(bool) {
    if (bool) {
      return 0
    } else {
      return 1
    }
  }

  onKey(e) {
    if(e.key === this.props.keyboard) {
      this.gain.gain.setTargetAtTime(this.props.gainValue, this.audioContext.currentTime, 0.05)
      this.moog.cutoff = this.props.filterCutOff
      this.chorus.rate = this.props.chorusRate
      this.moog.bypass = this.toggleValue(this.props.filterToggle)
      this.chorus.bypass = this.toggleValue(this.props.chorusToggle)
      this.oscillator.connect(this.chorus)
      this.chorus.connect(this.moog)
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
    return (
      <div className={[this.state.natural, this.state.played].join(' ')}>
        <h3 >{this.props.note}</h3>
      </div>
    )
  }
}

export default Synth
