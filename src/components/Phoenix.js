import React, { Component } from 'react'
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, Row, Col, Progress, Button } from 'reactstrap'
import Countdown from 'react-countdown-now'
import IconPopover from './iconPopover'

import iconPower from '../assets/iconPower.png'
import iconCooldown from '../assets/iconCooldown.png'
import iconBomb from '../assets/iconBomb.png'
import iconSteal from '../assets/iconSteal.png'
import iconPayout from '../assets/iconPayout.png'

import AbilityButton from './AbilityButton'
import BuyButton from './BuyButton'
import CountdownButton from './CountdownButton'
import PauseButton from './PauseButton'

const coundownRenderer = ({ isOwner, id, cooldown, price, gameEnd, team, web3, contract, account, currentPower, lowerPower, powerDrop, hours, minutes, seconds, completed }) => {
  let date = new Date().getTime()
  if (completed) {
    // Render a completed state
    return <AbilityButton 
            isOwner={isOwner} 
            id={id}
            price={price}
            team={team}
            gameEnd={gameEnd}
            web3={web3}
            contract={contract}
            account={account}
            currentPower={currentPower}
            lowerPower={lowerPower}
            powerDrop={powerDrop}
            />
    } else if (date > parseInt(gameEnd)*1000){
      return null
    } else {
    // Render a countdown
    return <CountdownButton 
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

    this.getPowerBar = this.getPowerBar.bind(this)
    this.shorten = this.shorten.bind(this)
    this.getAbilityButton = this.getAbilityButton.bind(this)
  }

  getPowerBar() {
    let color = (this.props.team == 'redTeamBG') ? 'danger' : 'info'
    return (
    <Progress multi>
    <Progress bar animated color={color} value={this.props.currentPower} max={this.props.powerCap} />
    <Progress bar animated color="warning" value={this.props.powerIncreaseAmt} max={this.props.powerCap} />
    </Progress>
    )
  }

  getDescriptIcons() {
    return (
      <div>
      <Row className="descriptIcons">
        <Col xs="6">
          <IconPopover 
          id={"powerUp" + this.props.id}
          image={iconPower}
          bg={(this.props.team == 'redTeamBG') ? 'descriptIconsRed' : 'descriptIconsBlue'}
          color = {(this.props.team == 'redTeamBG') ? 'danger' : 'info'}
          displayText={this.props.powerIncreaseAmt/100 + '%'}
          headerText={"Powerup Amount"}
          headerClass={(this.props.team == 'redTeamBG') ? 'popoverRed' : 'popoverBlue'}
          bodyText={"The increase in power upon every flip"}
          />
        </Col>
        <Col xs="6">
          <IconPopover 
          id={"cooldown" + this.props.id}
          image={iconCooldown}
          bg={(this.props.team == 'redTeamBG') ? 'descriptIconsRed' : 'descriptIconsBlue'}
          color = {(this.props.team == 'redTeamBG') ? 'danger' : 'info'}
          displayText={this.props.cooldownDecreaseAmt/60}
          headerText={"Cooldown Decrease Amount"}
          headerClass={(this.props.team == 'redTeamBG') ? 'popoverRed' : 'popoverBlue'}
          bodyText={"The decrease (in mins) of the cooldown time upon every flip"}
          />
        </Col>
      </Row>
      <Row className="descriptIcons">
      <Col xs="6">
        <IconPopover 
        id={"ability" + this.props.id}
        image={(this.props.id <= 6 || (this.props.id >= 11 && this.props.id <=14)) ? iconBomb : iconSteal}
        bg={(this.props.team == 'redTeamBG') ? 'descriptIconsRed' : 'descriptIconsBlue'}
        color = {(this.props.team == 'redTeamBG') ? 'danger' : 'info'}
        displayText={""}
        headerText={"Ability Type"}
        headerClass={(this.props.team == 'redTeamBG') ? 'popoverRed' : 'popoverBlue'}
        bodyText={(this.props.id <= 6 || (this.props.id >= 11 && this.props.id <=14)) ? "Takes from own team's pool" : "Takes from other team's pool"}
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
    </div>
    )
  }

  shorten(string) {
    if (typeof(string) == 'undefined') {
      return ''
    }
    return string.slice(0,10)
  }

  getAbilityButton() {
    if (this.props.paused) {
      return <PauseButton className={this.props.team} />
    }

    let date = new Date(0)
    date.setUTCSeconds(this.props.abilityAvailTime)
    return (
    <Countdown 
    date={date}
    renderer={coundownRenderer} 
    isOwner={this.props.currentOwner == this.props.account}
    id={this.props.id}
    cooldown={this.props.cooldown} 
    price={this.props.price}
    gameEnd={this.props.gameEnd}
    team={this.props.team}
    web3={this.props.web3}
    contract={this.props.contract}
    account={this.props.account}
    currentPower={this.props.currentPower}
    powerDrop={this.props.powerDrop}
    lowerPower={Math.max(this.props.currentPower-this.props.powerDrop,this.props.basePower)}
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
          <span>Power: {this.props.currentPower/100}%</span>
          {this.getPowerBar()}
          {this.getDescriptIcons()}
        <hr />
          {this.getAbilityButton()}
          <BuyButton
          paused={this.props.paused}
          isOwner={this.props.currentOwner == this.props.account} 
          account={this.props.account}
          id={this.props.id} 
          team={this.props.team}
          price={this.props.price} 
          web3={this.props.web3}
          network={this.props.network}
          contract={this.props.contract}
          gameEnd={this.props.gameEnd}
          />
      </CardBody>
    </Card>
    )
  }
}