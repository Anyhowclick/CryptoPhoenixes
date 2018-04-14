import React, { Component } from 'react'
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, Col, Progress, Button } from 'reactstrap'
import Countdown from 'react-countdown-now'
import BuyButton from './BuyButton'

export default class RainbowPhoenix extends Component {
  constructor(props) {
    super(props)

    this.shorten = this.shorten.bind(this)
  }

  shorten(string) {
    if (typeof(string) == 'undefined') {
      return ''
    }
    return string.slice(0,10)
  }

  render() {
    return (
      <Card className="bg-dark">
      <CardImg top src={require('../assets/' + this.props.name + '.jpg')} alt="Card image cap" />
      <CardBody>
        <CardTitle className="cardTitleText">
        <span className="rainbow">
        {this.props.name}
        </span>
        </CardTitle>
        <CardSubtitle className="cardSubtitleText">
        {this.shorten(this.props.currentOwner)}
        <br />
        {this.props.price} ETH
        </CardSubtitle>
        <hr />
          <span className="redFont">2% of all sales, explosions and steals!</span>
          <br />
          <span className="blueFont">10% of pool funds when game ends</span>
        <hr />
        <BuyButton
        paused={this.props.paused}
        isOwner={this.props.currentOwner == this.props.account} 
        account={this.props.account}
        id={this.props.id} 
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