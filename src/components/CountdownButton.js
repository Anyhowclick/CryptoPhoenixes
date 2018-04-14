import React, { Component } from 'react'
import { Button } from 'reactstrap'
const ProgressBar = require('react-progress-bar-plus')

export default class CountdownButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      team: (this.props.team == 'redTeamBG') ? 'danger' : 'info',
      cooldown: this.props.cooldown,
      hours: this.props.hours,
      minutes: this.props.minutes,
      seconds: this.props.seconds
    }

    this.getCooldownPercent = this.getCooldownPercent.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if ((this.state.hours != nextProps.hours) || (this.state.minutes != nextProps.minutes) || (this.state.seconds != nextProps.seconds)) {
      this.setState({
        hours: nextProps.hours,
        minutes: nextProps.minutes,
        seconds: nextProps.seconds
      })
    }
  }

  getCooldownPercent() {
    let countdown = parseInt(this.state.hours * 3600) + parseInt(this.state.minutes * 60) + parseInt(this.state.seconds)
    let percent = Math.max(0,(this.state.cooldown-countdown)/this.state.cooldown*100)
    return (percent)
  }

  render() {
    return (
      <div>
        <ProgressBar percent={this.getCooldownPercent()} onTop={false} spinner={false}/>
        <Button color={this.state.team} className="countdownButtonText" disabled block>{this.state.hours}:{this.state.minutes}:{this.state.seconds}</Button>
      </div>
    )
  }
}