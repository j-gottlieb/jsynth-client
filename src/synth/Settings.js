import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { apiSaveSetting } from './api.js'

class SaveSetting extends Component {
  constructor () {
    super()

    this.state = {
      name: '',
      chorusRate: '',
      chorusToggle: '',
      filterCutOff: '',
      filterToggle: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  saveSetting = event => {
    event.preventDefault()

    const { email, password, passwordConfirmation} = this.state
    const { flash, history, setUser } = this.props

    apiSaveSetting(this.state)
      .then(handleErrors)
      .then(() => signIn(this.state))
      .then(handleErrors)
      .then(res => res.json())
      .then(res => setUser(res.user))
      .then(() => flash(messages.signUpSuccess, 'flash-success'))
      .then(() => history.push('/'))
      .catch(() => flash(messages.signUpFailure, 'flash-error'))
  }

  render () {
    const { name, chorusRate, chorusToggle, filterCutOff, filterToggle } = this.state

    return (
      <form className='settings-form' onSubmit={this.saveSetting}>
        <h3>Sign Up</h3>

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
          name="filterrate"
          value={filterRate}
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
