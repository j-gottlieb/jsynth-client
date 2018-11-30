import React, { Component } from 'react'

class ToggleSwitch extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {currentval, handleToggle, state} = this.props
    return (
      <div>
        <label className="switch">
          <input type="checkbox" defaultChecked={currentval} onChange={(e) => handleToggle(e, state)} />
          <span className="slider round"></span>
        </label>
      </div>
    )
  }
}

export default ToggleSwitch
