import React, { Component } from 'react'
import './App.scss'
import { Route, Link } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import SynthKey from './synth/SynthKey'
import frequencies from './synth/Frequencies'
import RangeSelector from './synth/RangeSelector'
import ToggleSwitch from './synth/Toggle'
import SaveSettings from './synth/Settings'
import LoadSave from './synth/LoadSave'
import {Switch} from 'react-mdl'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      flashMessage: '',
      flashType: null,
      gainValue: .5,
      chorusRate: 2.5,
      filterCutOff: .5,
      filterToggle: true,
      chorusToggle: true
    }
    this.onKey = this.onKey.bind(this)
    this.offKey = this.offKey.bind(this)
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  flash = (message, type) => {
    this.setState({ flashMessage: message, flashType: type })

    clearTimeout(this.messageTimeout)

    this.messageTimeout = setTimeout(() => this.setState({flashMessage: null
    }), 2000)
  }

  handleChange = (event, label) => {
    this.setState({ [`${label}`]: event.target.value })
  }

  handleToggle = (event, label) => {
    this.setState({ [`${label}`]: !this.state[`${label}`] })
  }

  onKey(e) {
    console.log(e.key)
    return e.key
  }

  offKey(e) {
    this.oscillator.disconnect(this.audioContext.destination)
  }

  render () {
    const { flashMessage, flashType, user } = this.state
    return (
      <React.Fragment>
        <Header user={user} />
        {flashMessage && <h3 className={flashType}>{flashMessage}</h3>}

        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp flash={this.flash} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn flash={this.flash} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut flash={this.flash} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword flash={this.flash} user={user} />
          )} />
          <SynthKey
            keyValue={e => this.onKey(e)}
            onKey={e => this.onKey(e)}
            offKey={e => this.offKey(e)}
            chorusRate={this.state.chorusRate}
          />
          <RangeSelector name='volume' state='gainValue' min='0' max='1' defaultValue='0.5' step='0.1' currentVal={this.state.gainValue * 10} handleChange={this.handleChange} />
          <div className='effect'>
            <h3>Chorus</h3>
            <ToggleSwitch state='chorusToggle' currentval={this.state.chorusToggle} handleToggle={this.handleToggle}/>
            <RangeSelector name='chorus rate' state='chorusRate' min='0.01' max='8' defaultValue='2.5' step='0.01' currentVal={this.state.chorusRate} handleChange={this.handleChange} />
          </div>
          <div className='effect'>
            <h3>Filter</h3>
            <ToggleSwitch state='filterToggle' currentval={this.state.filterToggle} handleToggle={this.handleToggle}/>
            <RangeSelector name='analog filter' state='filterCutOff' min='0' max='1' defaultValue='0.5' step='0.01' currentVal={this.state.filterCutOff} handleChange={this.handleChange} />
          </div>
          <Route path="/settings" component={SaveSettings} />
        </main>
      </React.Fragment>
    )
  }
}

export default App
