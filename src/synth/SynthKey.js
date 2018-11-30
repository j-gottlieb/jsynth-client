import React, { Component } from 'react'
import Tuna from 'tunajs'

class Synth extends Component {
  constructor(props) {
    super(props)

    this.state = {
      oscOn: "c6",
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
    console.log('constructing Synth didMount')
  }

  toggleValue(bool) {
    bool ? 0 : 1
  }

  onKey(e) {
    if(e.key === this.props.keyboard) {
      console.log('constructing Synth onKey')
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
    console.log('constructing Synth render')
    return (
      <div className={[this.state.natural, this.state.played].join(' ')}>
        <h3 >{this.props.note}</h3>
      </div>
    )
  }
}

export default Synth
