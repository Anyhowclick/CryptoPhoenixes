import React, { Component } from 'react'
import { Button } from 'reactstrap'

export default class PauseButton extends Component {
  render() {
    return (
      <Button className="pauseButton" size="sm" block disabled>Contract Paused</Button>
    )
  }
}