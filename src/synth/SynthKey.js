import React, { Component } from 'react'
import Tuna from 'tunajs'

class SynthKey extends Component {
  constructor(props) {
    super(props)

    this.state = {
      natural: 'natural',
      played: '',
      key: 'a',
      chorusRate: '5',
    }
  }

  componentDidMount() {
    this.audioContext = new AudioContext()
    this.oscillator = this.audioContext.createOscillator()
    this.oscillator.start()
    this.tuna = new Tuna(this.audioContext)
    this.chorus = new this.tuna.Chorus({
      rate: this.state.chorusRate,         //0.01 to 8+
      feedback: 0.4,     //0 to 1+
      delay: 0.5,     //0 to 1
      bypass: 0        //the value 1 starts the effect as bypassed, 0 or 1
    })
    this.oscillator.connect(this.chorus)
  }

  toggleValue(bool) {
    bool ? 0 : 1
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.ChorusRate !== prevState.chorusRate) {
      console.log('props changed. Return an object to change state')
      return {
        chorusRate: nextProps.chorusRate,
      }
    }
  }

  onKey(e) {
    this.chorus.connect(this.audioContext.destination)
    this.setState({ played: 'played' })
  }

  offKey(e) {
    this.chorus.disconnect()
    this.setState({ played: '' })
  }

  toggleSynth(e) {
    if (this.state.played === 'played') {
      this.chorus.disconnect()
      this.setState({ played: '' })
    } else {
      this.chorus.connect(this.audioContext.destination)
      this.setState({ played: 'played' })
    }
  }

  render () {
    return (
      <div tabIndex={0} className={[this.state.natural, this.state.played].join(' ')} onClick={e => this.toggleSynth(e)} onKeyPress={e => this.onKey(e)} onKeyUp={e => this.offKey(e)}>
        <h3>Yay</h3>
      </div>
    )
  }
}

export default SynthKey
