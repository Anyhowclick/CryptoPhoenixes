import React, { Component } from 'react'
import { Jumbotron, Container, Col, Row, Progress, Button } from 'reactstrap'
import Countdown from 'react-countdown-now'
import MagmaLogo from '../assets/MagmaLogo.png'
import AquaLogo from '../assets/AquaLogo.png'
import UserFundButton from './UserFundButton'

const coundownRenderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return (
      <Container className="gameDuration">
        Game has ended! 
      </Container>
    )
  
  } else {
    // Render a countdown
    return (
      <Container className="gameDuration">
        <span id="gameCountdownTimer">{hours}:{minutes}:{seconds}</span>
      </Container>
    )
  }
}

export default class GameStats extends Component {
  constructor(props) {
    super(props)

    this.state = {
      gameEnd: this.props.gameEnd,
      gameInProgress: this.props.gameInProgress,
      RED_POOL: this.props.POOLS[0],
      BLUE_POOL: this.props.POOLS[1],
      RED_SCORE: this.props.SCORES[0],
      BLUE_SCORE: this.props.SCORES[1],
      userFunds: this.props.userFunds
    }

    this.getGameCountdown = this.getGameCountdown.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      gameEnd: nextProps.gameEnd,
      gameInProgress: nextProps.gameInProgress,
      RED_POOL: nextProps.POOLS[0],
      BLUE_POOL: nextProps.POOLS[1],
      RED_SCORE: nextProps.SCORES[0],
      BLUE_SCORE: nextProps.SCORES[1],
      userFunds: nextProps.userFunds
    })
  }

  componentWillUpdate(nextProps) {
    if(nextProps.SCORES[0] != this.state.RED_SCORE) {
      this.setState({ RED_SCORE: nextProps.SCORES[0]})
    }

    if(nextProps.SCORES[1] != this.state.BLUE_SCORE) {
      this.setState({ BLUE_SCORE: nextProps.SCORES[1]})
    }
  }
  
  getGameCountdown() {
    let countdown = new Date(0)
    countdown.setUTCSeconds(this.state.gameEnd)
    return (
      <Countdown
      date={countdown}
      renderer={coundownRenderer} 
      />
    )
  }

  render() {
    return (
      <Jumbotron className="gameStats">
        <Row>
          <Col xs="3">
          <img src={MagmaLogo} />
          <div className="redFont poolAmt">
          {this.state.RED_POOL} ETH
          </div>
          </Col>
          <Col xs="6">
          <span id="gameScores">
            <span className="redFont">{this.state.RED_SCORE}</span> : <span className="blueFont">{this.state.BLUE_SCORE}</span>
          </span>
          <hr />
          {this.getGameCountdown()}
          </Col>
          <Col xs="3">
          <img src={AquaLogo} />
          <div className="blueFont poolAmt">
          {this.state.BLUE_POOL} ETH
          </div>
          </Col>
        </Row>
        <UserFundButton 
        userFunds={this.state.userFunds} 
        web3={this.props.web3}
        CryptoPhoenixes={this.props.contract} />
      </Jumbotron>
    )
  }
}