import React, { Component } from 'react'
import { Switch } from 'react-mdl'

class ToggleSwitch extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {currentval, handleToggle, state} = this.props
    return (
      <React.Fragment>
        <Switch
          checked='true'
          onChange={(e) => handleToggle(e, state)}
        />
      </React.Fragment>
    )
  }
}

export default ToggleSwitch
