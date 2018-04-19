import React, { Component } from 'react'
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, Row, Col, Progress, Button } from 'reactstrap'
import Countdown from 'react-countdown-now'
import IconPopover from './iconPopover'

import iconCapt from '../assets/iconCapt.png'
import iconDumbbell from '../assets/iconDumbbell.png'
import iconPayout from '../assets/iconPayout.png'

import BuyButton from './BuyButton'
import CaptainAbilityButton from './CaptainAbilityButton'
import CountdownButton from './CountdownButton'
import PauseButton from './PauseButton'


const coundownRenderer = ({ isOwner, id, cooldown, abilityAvailTime, price, gameEnd, team, web3, contract, account, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <CaptainAbilityButton 
            isOwner={isOwner} 
            id={id}
            price={price}
            team={team}
            gameEnd={gameEnd}
            web3={web3}
            contract={contract}
            account={account}
            />
    } else if (abilityAvailTime > gameEnd && new Date().getTime() < gameEnd*1000) {
    return <Button color={(team == 'redTeamBG') ? 'danger' : 'info'} block className="explosionText" disabled>Ability used</Button>
    } else {
    return <CountdownButton 
            className="explosionText"
            team={team} 
            cooldown={cooldown}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
            />
          }
}

export default class PhoenixCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentOwner: this.props.currentOwner,
      abilityAvailTime: this.props.abilityAvailTime,
      account: this.props.account
    }

    this.getDescriptIcons = this.getDescriptIcons.bind(this)
    this.shorten = this.shorten.bind(this)
  }

  componentWillUpdate(nextProps) {
    if ((this.state.currentOwner != nextProps.currentOwner) || 
        (this.state.abilityAvailTime != nextProps.abilityAvailTime) || 
        (this.state.account != nextProps.account)) {

          this.setState({
            currentOwner: nextProps.currentOwner,
            abilityAvailTime: nextProps.abilityAvailTime,
            account: nextProps.account
          })
        }
  }

  shorten(string) {
    if (typeof(string) == 'undefined') {
      return ''
    }
    return string.slice(0,10)
  }

  getDescriptIcons() {
    return (
      <Row className="descriptIcons">
        <Col xs="6">
          <IconPopover 
          id={"cooldown" + this.props.id}
          image={iconDumbbell}
          bg={(this.props.team == 'redTeamBG') ? 'descriptIconsRed' : 'descriptIconsBlue'}
          color = {(this.props.team == 'redTeamBG') ? 'danger' : 'info'}
          displayText={"1.5x"}
          headerText={"Team Boost Ability"}
          headerClass={(this.props.team == 'redTeamBG') ? 'popoverRed' : 'popoverBlue'}
          bodyText={"Increases the current power of all team phoenixes by 1.5x! Can only be used once per game."}
          />
        </Col>
        <Col xs="6">
        <IconPopover 
          id={"payout" + this.props.id}
          image={iconPayout}
          bg={(this.props.team == 'redTeamBG') ? 'descriptIconsRed' : 'descriptIconsBlue'}
          color = {(this.props.team == 'redTeamBG') ? 'danger' : 'info'}
          displayText={this.props.payoutPercentage/100 + "%"}
          headerText={"Payout Percentage"}
          headerClass={(this.props.team == 'redTeamBG') ? 'popoverRed' : 'popoverBlue'}
          bodyText={"The proportion of team payouts to be given to this phoenix's owner"}
          />
        </Col>
      </Row>
    )
  }

  getAbilityButton() {
    if (this.props.paused) {
      return <PauseButton className={this.props.team}/>
    }

    let date = new Date(0)
    date.setUTCSeconds(this.props.abilityAvailTime)
    return (
    <Countdown 
    date={date}
    renderer={coundownRenderer} 
    isOwner={this.props.currentOwner == this.props.account}
    cooldown={this.props.cooldown}
    abilityAvailTime={this.props.abilityAvailTime}
    id={this.props.id} 
    price={this.props.price}
    gameEnd={this.props.gameEnd}
    team={this.props.team}
    web3={this.props.web3}
    contract={this.props.contract}
    account={this.state.account}
    />
  )
  }

  render() {
    return (
      <Card className={this.props.team}>
      <CardImg top width="100%" src={require('../assets/' + this.props.name + '.jpg')} alt="Card image cap" />
      <CardBody>
        <CardTitle className="cardTitleText">{this.props.name}</CardTitle>
        <CardSubtitle className="cardSubtitleText">
        {this.shorten(this.props.currentOwner)}
        <br />
        {this.props.price} ETH
        </CardSubtitle>
        <hr />
        <span className={(this.props.team == 'redTeamBG') ? 'redFont' : 'blueFont'}>1% of team phoenix sales!</span>
        {this.getDescriptIcons()}
        <hr />
        {this.getAbilityButton()}
          <BuyButton
          paused={this.props.paused}
          isOwner={this.props.currentOwner == this.props.account} 
          account={this.props.account}
          id={this.props.id} 
          price={this.props.price} 
          web3={this.props.web3}
          network={this.props.network}
          team={this.props.team}
          contract={this.props.contract}
          gameEnd={this.props.gameEnd}
          />
      </CardBody>
    </Card>
    )
  }
}