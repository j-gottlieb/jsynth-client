import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { apiSaveSetting } from './api.js'

class SaveSetting extends Component {
  constructor () {
    super()

    this.state = {
      synth_settings: {
        name: '',
        chorusRate: '',
        chorusToggle: '',
        filterCutOff: '',
        filterToggle: ''
      }
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  saveSetting = event => {
    event.preventDefault()

    // const { email, password, passwordConfirmation} = this.state
    // const { flash, history, setUser } = this.props

    apiSaveSetting(this.state, this.props.user)
      .then(res => console.log(res))
      .catch(console.error())
  }

  render () {
    const { name, chorusRate, chorusToggle, filterCutOff, filterToggle } = this.state

    return (
      <form className='settings-form' onSubmit={this.saveSetting}>
        <h3>Save Settings</h3>

        <label>Name</label>
        <input
          required
          name="name"
          value={name}
          type="string"
          placeholder="Name"
          onChange={this.handleChange}
        />
        <label>Chorus Rate</label>
        <input
          required
          name="chorusrate"
          value={chorusRate}
          type="float"
          placeholder="rate"
          onChange={this.handleChange}
        />
        <label>Chorus Toggle</label>
        <input
          required
          name="chorustoggle"
          value={chorusToggle}
          type="boolean"
          placeholder="on/off"
          onChange={this.handleChange}
        />
        <label>Filter Rate</label>
        <input
          required
          name="filtercutoff"
          value={filterCutOff}
          type="float"
          placeholder="rate"
          onChange={this.handleChange}
        />
        <label>Filter Toggle</label>
        <input
          required
          name="filtertoggle"
          value={filterToggle}
          type="boolean"
          placeholder="on/off"
          onChange={this.handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    )
  }
}

export default withRouter(SaveSetting)
