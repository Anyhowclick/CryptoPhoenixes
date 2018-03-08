import React, { Component } from 'react'
import { Button } from 'reactstrap'

export default class PauseButton extends Component {
  render() {
    return (
      <Button color={this.props.color} size="sm" block disabled>Contract Paused</Button>
    )
  }
}