import React, { Component } from 'react'
import { input } from 'audio-effects'
import {Output} from 'audio-effects'
import {Volume} from 'audio-effects'

class Synth extends Component {
  constructor(props) {
    super(props)
    this.audioContext = this.props.audioContext
    this.gain = this.audioContext.createGain()
    this.gain.gain.value = 0
    this.oscillator = this.audioContext.createOscillator()
    this.oscillator.frequency.value = this.props.pitch
    this.oscillator.start()
    this.input = new Input(audioContext)
    this.output = new Output(audioContext)
    this.volume = new Volume(audioContext)

    this.state = {
      oscOn: false,
      natural: this.props.natural,
      played: '',
      oscillator: null,
      gainValue: 0
    }
  }

  componentDidMount = (e) => {
    document.addEventListener('keydown', this.onKey.bind(this))
    document.addEventListener('keyup', this.offKey.bind(this))
  }

  onKey(e) {
    if(e.key === this.props.keyboard) {
      this.gain.gain.setTargetAtTime(this.props.gainValue, this.audioContext.currentTime, 0.05)
      this.oscillator.connect(this.gain)
      this.gain.connect(this.audioContext.destination)
      this.setState({ played: 'played'})
    }
  }

  offKey(e) {
    if (e.key === this.props.keyboard) {
      this.gain.gain.setTargetAtTime(0.000015, this.audioContext.currentTime, 0.05)
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
