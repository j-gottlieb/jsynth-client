import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

class LoadSave extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {currentval, handleToggle, state} = this.props
    return (
      <div>
        <h1>Hello</h1>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Select</ControlLabel>
          <FormControl componentClass="select" placeholder="select">
            <option value="select">select</option>
            <option value="other">...</option>
          </FormControl>
        </FormGroup>
      </div>
    )
  }
}

export default LoadSave
