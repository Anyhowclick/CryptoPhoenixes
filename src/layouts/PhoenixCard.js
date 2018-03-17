import React, { Component } from 'react'
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, Col, Progress, Button } from 'reactstrap'
import {MAX_COOLDOWN, MAX_POWER, MAX_DIVIDENDS, POWER_DENOMINATOR, DIVIDEND_DENOMINATOR} from './Constants.js'
import Countdown from 'react-countdown-now'
import ExplosionButton from './ExplosionButton'
import BuyButton from './BuyButton'
import PauseButton from './PauseButton'

const coundownRenderer = ({ isOwner, id, price, web3, CryptoPhoenixes, showNotification, explosivePower, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <ExplosionButton 
            isOwner={isOwner} 
            id={id}
            price={price}
            web3={web3}
            explosivePower={explosivePower}
            CryptoPhoenixes={CryptoPhoenixes}
            showNotification={showNotification}
            />
    } else {
    // Render a countdown
    return <Button color="secondary" disabled block size="lg" className="explosionText">{hours}:{minutes}:{seconds}</Button>;
  }
}

export default class PhoenixCard extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      account: this.props.web3.eth.accounts[0],
      price: this.props.price,
      currentOwner: this.props.currentOwner,
      nextExplosionTime: this.props.nextExplosionTime,
      paused: this.props.paused
    }

    this.getStatsBar = this.getStatsBar.bind(this);
    this.getCooldownValue = this.getCooldownValue.bind(this);
    this.getCooldownDisplay = this.getCooldownDisplay.bind(this);
    this.shorten = this.shorten.bind(this);
    this.getExplosionButton = this.getExplosionButton.bind(this);
    this.updatePriceDisplay = this.updatePriceDisplay.bind(this);
    this.updateOwnerDisplay = this.updateOwnerDisplay.bind(this);
    this.updateExplosionDisplay = this.updateExplosionDisplay.bind(this);
  }

  getStatsBar(type,amount) {
    switch (type) {
      case "POWER":
        return (
          <Progress striped color="warning" value={amount/POWER_DENOMINATOR} max={MAX_POWER}/>
        )

      case "DIVIDEND":
        return (
         <Progress striped color="success" value={amount/DIVIDEND_DENOMINATOR} max={MAX_DIVIDENDS}/> 
        )

      case "COOLDOWN":
        let cooldownValue = this.getCooldownValue(amount);
        return <Progress striped color="danger" value={cooldownValue} max={MAX_COOLDOWN}/>
    }
  }

  getCooldownValue(amount) {
    switch(amount) {
      case 15:
        return 8
      
      case 30:
        return 7

      case 60:
        return 6

      case 180:
        return 5

      case 360:
        return 4

      case 720:
        return 3
      
      case 1440:
        return 2

      default:
        return 1
    }
  }

  getCooldownDisplay(amount) {
    switch(amount) {
      case 15:
        return "15 mins"
      
      case 30:
        return "30 mins"

      case 60:
        return "1 hr"

      case 180:
        return "3 hrs"

      case 360:
        return "6 hrs"

      case 720:
        return "12 hrs"
      
      case 1440:
        return "1 day"

      default:
        return "2 days"
    }
  }

  shorten(string) {
    if (typeof(string) == 'undefined') {
      return ''
    }
    return string.slice(0,10)
  }

  getExplosionButton() {
    if (this.state.paused) {
      return <PauseButton color="warning"/>
    }

    let date = new Date(0)
    date.setUTCSeconds(this.state.nextExplosionTime)
    return (
    <Countdown 
    date={date}
    renderer={coundownRenderer} 
    isOwner={this.state.currentOwner == this.props.web3.eth.accounts[0]}
    id={this.props.id} 
    price={this.props.price}
    explosivePower={this.props.explosivePower/POWER_DENOMINATOR}
    web3={this.props.web3}
    CryptoPhoenixes={this.props.CryptoPhoenixes}
    showNotification={this.props.showNotification}
    />
  )
  }

  componentDidMount() {
    let self = this,
    PurchaseEvent = this.props.CryptoPhoenixes.PhoenixPurchased(),
    ExplodeEvent = this.props.CryptoPhoenixes.PhoenixExploded(),
    PauseEvent = this.props.CryptoPhoenixes.Pause(),
    UnpauseEvent = this.props.CryptoPhoenixes.Unpause()

    PurchaseEvent.watch(function(err,res) {
      if (!err) {
        if (res.args._phoenixId == self.props.id) {
          let price = self.props.web3.fromWei(res.args.price,'ether').toNumber()
          let newOwner = res.args.newOwner.slice(0,10)
          self.props.showNotification(newOwner + " bought " + self.props.name + " for " + price + " ETH","warning")
          let nextPrice = self.props.web3.fromWei(res.args.nextPrice,'ether').toNumber()
          self.updatePriceDisplay(nextPrice)
          self.updateOwnerDisplay(res.args.newOwner)
        }
      } else {
        console.log(err)
      }
    })

    ExplodeEvent.watch(function(err,res) {
      if (!err) {
        if (res.args.phoenixId == self.props.id) {
        //Update Phoenix Explosion Time
        let nextExplosionTime = res.args.nextExplosionTime.toNumber(),
        phoenixPrice = self.props.web3.fromWei(res.args.price,'ether').toNumber()

        self.updateExplosionDisplay(nextExplosionTime)
        self.updatePriceDisplay(phoenixPrice)
        }
      } else {
        console.log(err)
      }
    })

    PauseEvent.watch(function(err,res) {
      if (!err) {
        //Update buttons
        self.updateButtons(true)
      } else {
        console.log(err)
      }
    })

    UnpauseEvent.watch(function(err,res) {
      if (!err) {
        //Update buttons
        self.updateButtons(false)
      } else {
        console.log(err)
      }
    })
  }

  updatePriceDisplay(amount) {
    this.setState({price: amount})
  }

  updateOwnerDisplay(owner) {
    this.setState({currentOwner: owner})
  }

  updateExplosionDisplay(time) {
    this.setState({nextExplosionTime: time})
  }

  updateButtons(isPaused) {
    this.setState({ paused: isPaused})
  }

  render() {
    return (
      <Col xs="6" sm="4" lg="3">
      <Card>
      <CardImg top width="100%" src={require('../assets/' + this.props.name + '.jpg')} alt="Card image cap" />
      <CardBody>
        <CardTitle className="cardTitleText">{this.props.name}</CardTitle>
        <CardSubtitle className="cardSubtitleText">
        Owner: {this.shorten(this.state.currentOwner)}
        <br />
        Price: {this.state.price}
        </CardSubtitle>
        <hr />
          <span>Dividend: {this.props.dividendPayout/DIVIDEND_DENOMINATOR}%</span>
          {this.getStatsBar("DIVIDEND",this.props.dividendPayout)}
          <span>Power: {this.props.explosivePower/POWER_DENOMINATOR}%</span>
          {this.getStatsBar("POWER",this.props.explosivePower)}
          <span>Cooldown: {this.getCooldownDisplay(this.props.cooldown)}</span>
          {this.getStatsBar("COOLDOWN",this.props.cooldown)}
          <hr />
          {this.getExplosionButton()}
          <BuyButton
          paused={this.state.paused}
          isOwner={this.state.currentOwner == this.props.web3.eth.accounts[0]} 
          id={this.props.id} 
          price={this.state.price} 
          web3={this.props.web3}
          CryptoPhoenixes={this.props.CryptoPhoenixes}
          showNotification={this.props.showNotification}
          />
      </CardBody>
    </Card>
    
    </Col>
    )
  }
}