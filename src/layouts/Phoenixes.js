import React, { Component } from 'react'
import { Jumbotron, Container, Row } from 'reactstrap'
import { InfuraCryptoPhoenixes, RIGHT_NETWORK_ID, TOTAL_PHOENIX_NUM } from './Constants'
import PhoenixCard from './PhoenixCard'
import UserFundButton from './UserFundButton'
import { notify } from 'react-notify-toast'
import Odometer from 'react-odometerjs';
import settings from '../phoenixes.json'

export default class Phoenixes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      paused: true,
      account: this.props.web3.eth.accounts[0],
      PHOENIX_POOL: 0,
      PHOENIXES: [],
      userFunds: -1
    }
  
    this.getPauseStatus = this.getPauseStatus.bind(this);
    this.getPhoenixes = this.getPhoenixes.bind(this);
    this.getPhoenixPool = this.getPhoenixPool.bind(this);
    this.getUserFunds = this.getUserFunds.bind(this);
    this.showNotification = notify.createShowQueue();
  }
  
  componentDidMount() {
    this.getPauseStatus()
    this.getPhoenixes()
    this.getPhoenixPool()
    this.getUserFunds()

    let self = this,
    PurchaseEvent = this.props.CryptoPhoenixes.PhoenixPurchased(),
    ExplodeEvent = this.props.CryptoPhoenixes.PhoenixExploded(),
    WithdrawFundsEvent = this.props.CryptoPhoenixes.WithdrewFunds(),
    PauseEvent = this.props.CryptoPhoenixes.Pause(),
    UnpauseEvent = this.props.CryptoPhoenixes.Unpause()

    PurchaseEvent.watch(function(err,res) {
      if (!err) {
        //Update Phoenix Pool and user funds for changes
        self.getPhoenixPool()
        self.getUserFunds()
      } else {
        console.log(err)
      }
    })
    
    ExplodeEvent.watch(function(err,res) {
      if (!err) {
        //Update Phoenix Pool price
        let payout = self.props.web3.fromWei(res.args.payout,'ether').toNumber(),
        owner = res.args.owner.slice(0,10)

        self.showNotification(owner + " claimed " + payout + " ETH from the pool!","warning")
        self.getPhoenixPool()
      } else {
        console.log(err)
      }
    })
  
    WithdrawFundsEvent.watch(function(err,res) {
      if (!err) {
        self.showNotification('Funds successfully withdrawn!',"success")
        //Update User funds price
        self.getUserFunds()
      } else {
        console.log(err)
      }
    })

    PauseEvent.watch(function(err,res) {
      if (!err) {
        self.showNotification('Contract has paused!',"error")
      } else {
        console.log(err)
      }
    })

    UnpauseEvent.watch(function(err,res) {
      if (!err) {
        self.showNotification('Contract has unpaused!',"success")
      } else {
        console.log(err)
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.account != nextProps.web3.eth.accounts[0]) {
      this.setState({ account: nextProps.web3.eth.accounts[0] })
    }
  }
  
  componentDidUpdate(prevProps,prevState) {
    if(prevState.account != this.state.account) {
      this.getUserFunds()
    }
  }

  getPauseStatus() {
    let pausedStatus = InfuraCryptoPhoenixes.paused.call()
    this.setState({ paused: pausedStatus})
  }

  getPhoenixes() {
    let self = this,
    phoenixes = []

    for (var i = 0; i < TOTAL_PHOENIX_NUM; i++) {
      let phoenix = InfuraCryptoPhoenixes.getPhoenix(i)
      phoenix = {
        id: i,
        price: self.props.web3.fromWei(phoenix[0],'ether').toNumber(),
        nextPrice: self.props.web3.fromWei(phoenix[1],'ether').toNumber(),
        dividendPayout: phoenix[2].toNumber(),
        effectivePayout: phoenix[3].toNumber(),
        explosivePower: phoenix[4].toNumber(),
        cooldown: phoenix[5].toNumber(),
        nextExplosionTime: phoenix[6].toNumber(),
        previousOwner: phoenix[7],
        currentOwner: phoenix[8]
      }
      phoenix.name = settings[phoenix.id].name
      phoenixes.push(phoenix)
    }
    this.setState({PHOENIXES: phoenixes})
  }
 
  getPhoenixPool() {
    let phoenixPool = InfuraCryptoPhoenixes.PHOENIX_POOL.call()
    phoenixPool = this.props.web3.fromWei(phoenixPool, 'ether').toNumber()
    this.setState({ PHOENIX_POOL: phoenixPool })
  }

  getUserFunds() {
    if (this.state.account) {
      let userFunds = InfuraCryptoPhoenixes.userFunds(this.state.account)
      userFunds = this.props.web3.fromWei(userFunds, 'ether').toNumber()
      this.setState({ userFunds: userFunds })
    } else {
      this.setState({ userFunds: -1})
    }
  }

  renderChildren(phoenixes) {
    return phoenixes.map((phoenix,key) => {
      return (
        <PhoenixCard
        paused={this.state.paused}
        name={phoenix.name}
        price={phoenix.price} 
        nextPrice={phoenix.nextPrice}
        dividendPayout={phoenix.dividendPayout}
        explosivePower={phoenix.explosivePower}
        cooldown={phoenix.cooldown}
        nextExplosionTime={phoenix.nextExplosionTime}
        previousOwner={phoenix.previousOwner}
        currentOwner={phoenix.currentOwner}
        key={phoenix.id}
        id={phoenix.id}
        web3={this.props.web3}
        CryptoPhoenixes={this.props.CryptoPhoenixes}
        showNotification={this.showNotification}
        />
        )
      }
    ) 
  }

  render() {
    if (this.props.network != RIGHT_NETWORK_ID) { return (<Jumbotron className="homeTitle"><h1>Wrong network</h1></Jumbotron>)}
    return (
      <div>
        <Jumbotron className="homeDescription">
        <h1 className>Phoenix Pool</h1> 
        <Odometer value={this.state.PHOENIX_POOL} duration={2000} format={'(,ddd).ddddddd'}/>
        <br />
        <UserFundButton 
        userFunds={this.state.userFunds} 
        showNotification={this.showNotification} 
        web3={this.props.web3}
        CryptoPhoenixes={this.props.CryptoPhoenixes} />
        </Jumbotron>
      <Container>
        <Row>
        {this.renderChildren(this.state.PHOENIXES)}
        </Row>
      </Container>
      </div>
    )
  }
}
