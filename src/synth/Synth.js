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
    this.chorus = new this.tuna.Chorus({
      rate: 5,
      feedback: 0.8,
      delay: 0.0045,
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
      this.oscillator.connect(this.gain)
      this.gain.connect(this.chorus)
      this.chorus.connect(this.audioContext.destination)
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
    console.log(this.chorus)
    return (
      <div className={[this.state.natural, this.state.played].join(' ')}>
        <h3 >{this.props.note}</h3>
      </div>
    )
  }
}

export default Synth
