import React, { Component } from 'react'

class RangeSelector extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { name, min, max, defaultValue, onChange, step, state, handleChange } = this.props
    return (
      <React.Fragment>
        <legend>{name}: {this.props.currentVal}</legend>
        <input
          id={name}
          type="range"
          min={min} max={max}
          defaultValue={defaultValue}
          onChange={(e) => handleChange(e, state)}
          step={step}
        />
      </React.Fragment>
    )
  }
}

export default RangeSelector
