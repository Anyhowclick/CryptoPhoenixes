import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import { Jumbotron, Container, Button, Row, Col } from 'reactstrap'
import { InfuraCryptoPhoenixes, RIGHT_NETWORK_ID } from './Constants'
import { getGameDuration, fetchPhoenix } from '../actions/gameActions'
import RainbowPhoenix from './RainbowPhoenix'
import Captain from './Captain'
import Phoenix from './Phoenix'
import Loadable from 'react-loading-overlay'

const mapStateToProps = (state) => ({
  web3: state.web3Status.web3,
  currNetwork: state.web3Status.currNetwork,
  currAccount: state.web3Status.currAccount,
  contract: state.contract.contract,
  PHOENIXES: state.game.PHOENIXES,
  gameEnd: state.game.gameEnd,
  phoenixesFetched: state.game.phoenixesFetched
  })

class MyPhoenixes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      paused: InfuraCryptoPhoenixes.paused(),
      blockNumber: 0,
      trxHash: []
    }
  
    this.getPauseStatus = this.getPauseStatus.bind(this)
    this.updatePhoenix = this.updatePhoenix.bind(this)
    this.renderMyPhoenixes = this.renderMyPhoenixes.bind(this)
    this.unpauseNotif = this.unpauseNotif.bind(this)
    this.captAbilityNotif = this.captAbilityNotif.bind(this)
    this.abilityNotif = this.abilityNotif.bind(this)
    this.pauseNotif = this.pauseNotif.bind(this)
    this.purchaseNotif = this.purchaseNotif.bind(this)
  }
  
  componentDidMount() {
    this.getPauseStatus()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.contract != nextProps.contract) {
      this.props.dispatch(getGameDuration())
      this.fetchAllPhoenixes(nextProps.contract)
      let self = this,
      PurchaseEvent = nextProps.contract.PhoenixPurchased({fromBlock:'latest'}),
      CaptainAbilityEvent = nextProps.contract.CaptainAbilityUsed({fromBlock:'latest'}),
      NormalAbilityEvent = nextProps.contract.PhoenixAbilityUsed({fromBlock:'latest'}),
      PauseEvent = nextProps.contract.Pause({fromBlock:'latest'}),
      UnpauseEvent = nextProps.contract.Unpause({fromBlock:'latest'})
      
      PurchaseEvent.watch(function(err,res) {
        if (!err) {
          let phoenixID = res.args.phoenixID.toNumber(),
          owner = res.args.newOwner,
          price = self.props.web3.fromWei(res.args.price,'ether').toNumber(),
          nextPrice = self.props.web3.fromWei(res.args.nextPrice,'ether').toNumber(),
          currentPower = res.args.currentPower.toNumber(),
          abilityAvailTime = res.args.abilityAvailTime.toNumber()

          if (res.blockNumber > self.state.blockNumber || !self.state.trxHash.includes(res.transactionHash)) {
            let trxHash = [res.transactionHash]
            if (!self.state.trxHash.includes(res.transactionHash)) {
              trxHash = self.state.trxHash
              trxHash.push(res.transactionHash)
            }

            self.updatePhoenix(phoenixID)
            self.purchaseNotif(phoenixID,owner,price)
            self.setState({ blockNumber: res.blockNumber, trxHash: trxHash})
          }
          
        } else {
          console.log(err)
        }
      })
    
      CaptainAbilityEvent.watch(function(err,res) {
        if (!err) {
          let captainID = res.args.captainID.toNumber()
          if (res.blockNumber > self.state.blockNumber || !self.state.trxHash.includes(res.transactionHash)) {
            let trxHash = [res.transactionHash]
            if (!self.state.trxHash.includes(res.transactionHash)) {
              trxHash = self.state.trxHash
              trxHash.push(res.transactionHash)
            }

            self.updatePhoenix(captainID)
            self.updateTeam(captainID)
            self.captAbilityNotif(captainID)
            self.setState({ blockNumber: res.blockNumber, trxHash: trxHash})
          }
        } else {
          console.log(err)
        }
      })

      NormalAbilityEvent.watch(function(err,res) {
        if (!err) {
          let phoenixID = res.args.phoenixID.toNumber()
          if (res.blockNumber > self.state.blockNumber || !self.state.trxHash.includes(res.transactionHash)) {
            let trxHash = [res.transactionHash]
            if (!self.state.trxHash.includes(res.transactionHash)) {
              trxHash = self.state.trxHash
              trxHash.push(res.transactionHash)
            }
          
            self.updatePhoenix(phoenixID)
            self.abilityNotif(phoenixID)
            self.setState({ blockNumber: res.blockNumber, trxHash: trxHash})
          }
        } else {
          console.log(err)
        }
      })

      PauseEvent.watch(function(err,res) {
        if (!err) {
          if(res.blockNumber != self.state.blockNumber) {
            self.setState({ paused: true, blockNumber: res.blockNumber})
            self.pauseNotif()
          }
        } else {
          console.log(err)
        }
      })

      UnpauseEvent.watch(function(err,res) {
        if (!err) {
          if(res.blockNumber != self.state.blockNumber) {
            self.setState({ paused: false, blockNumber: res.blockNumber})
            self.unpauseNotif()
          }
        } else {
          console.log(err)
        }
      })
    }
  }

  fetchAllPhoenixes(contract) {
    this.props.dispatch({type:"PHOENIXES_FETCHING"})
    for (var i=0;i<19;i++) {
      this.props.dispatch(fetchPhoenix(contract,i))
    }
    this.props.dispatch({type: "PHOENIXES_FETCHED"})
  }

  updatePhoenix(phoenixID) {
    this.props.dispatch(fetchPhoenix(this.props.contract,phoenixID))
  }

  updateTeam(captainID) {
    let startIdx, endIdx
    if(captainID == 1) {
      startIdx = 3
      endIdx = 11
    } else {
      startIdx = 11
      endIdx = 19
    }
    for (var i=startIdx; i<endIdx;i++) {
      this.props.dispatch(fetchPhoenix(this.props.contract,i))
    }
  }

  pauseNotif = () => toast("Contract Paused!", {position: toast.POSITION.TOP_CENTER})
  unpauseNotif = () => toast("Contract Unpaused!", {position: toast.POSITION.TOP_CENTER})
  
  purchaseNotif(phoenixID,owner,price) {
    let name = this.props.PHOENIXES[phoenixID].name
    if (owner == this.props.currAccount) {
      var text = "You successfully bought " + name + " for " + price + " ETH!"
      toast.success(text, {position:toast.POSITION.TOP_RIGHT})
    } else {
      owner = owner.slice(0,10)
      text = owner + " bought " + name + " for " + price + " ETH!"
      toast(text, {position:toast.POSITION.TOP_RIGHT})
    }
  }

  captAbilityNotif(captainID) {
    if (captainID == 1) {
      toast.error("Team Magma has been powered up!", {position:toast.POSITION.TOP_LEFT})
    } else {
      toast.info("Team Aqua has been powered up!",{position: toast.POSITION.TOP_LEFT})
    }
  }

  abilityNotif(phoenixID) {
    let name = this.props.PHOENIXES[phoenixID].name
    if (phoenixID < 11) {
      toast.error(name + "'s ability was used!", {position:toast.POSITION.TOP_LEFT})
    } else {
      toast.info(name + "'s ability was used!", {position:toast.POSITION.TOP_LEFT})
    }
  }

  getPauseStatus() {
    let pausedStatus = InfuraCryptoPhoenixes.paused()
    this.setState({ paused: pausedStatus})
  }

  renderMyPhoenixes() {
    let phoenixes = this.props.PHOENIXES.filter(phoenix => (phoenix.currentOwner == this.props.currAccount))
    return phoenixes.map((phoenix,key) => {
      if (phoenix.id == 0) {
        return (
          <Col xs="6" lg="3">
          <RainbowPhoenix
              account={this.props.currAccount}
              price={phoenix.price}
              name={phoenix.name}
              currentOwner={phoenix.currentOwner}
              paused={this.state.paused}
              web3={this.props.web3}
              network={this.props.currNetwork}
              contract={this.props.contract}
              gameEnd={this.props.gameEnd}
              key={key}
            />
          </Col>
        )
      }  else if (phoenix.id <= 2) {
        return (
          <Col xs="6" lg="3">
          <Captain
          paused={this.state.paused}
          name={phoenix.name}
          price={phoenix.price}
          currentOwner={phoenix.currentOwner}
          team={phoenix.id == 1 ? 'redTeamBG' : 'blueTeamBG'} 
          abilityAvailTime={phoenix.abilityAvailTime}
          payoutPercentage={phoenix.payoutPercentage}
          cooldown={phoenix.cooldown}
          key={key}
          id={phoenix.id}
          web3={this.props.web3}
          network={this.props.currNetwork}
          account={this.props.currAccount}
          contract={this.props.contract}
          gameEnd={this.props.gameEnd}
          />
          </Col>
        )
      } else {
        return (
        <Col xs="6" lg="3">
          <Phoenix
          paused={this.state.paused}
          name={phoenix.name}
          price={phoenix.price}
          currentOwner={phoenix.currentOwner}
          team={(phoenix.id <= 10) ? 'redTeamBG' : 'blueTeamBG'} 
          abilityAvailTime={phoenix.abilityAvailTime}
          payoutPercentage={phoenix.payoutPercentage}
          cooldown={phoenix.cooldown}
          cooldownDecreaseAmt={phoenix.cooldownDecreaseAmt}
          basePower={phoenix.basePower}
          currentPower={phoenix.currentPower}
          powerIncreaseAmt={phoenix.powerIncreaseAmt}
          powerDrop={phoenix.powerDrop}
          powerCap={phoenix.powerCap}
          key={key}
          id={phoenix.id}
          web3={this.props.web3}
          network={this.props.currNetwork}
          account={this.props.currAccount}
          contract={this.props.contract}
          gameEnd={this.props.gameEnd}
          />
          </Col>
          ) 
        }      
      }
    ) 
  }

  render() {
    return (
      <div>
        <ToastContainer autoClose={5000} />
        <Loadable className="loadingScreen"
        active={!this.props.phoenixesFetched}
        spinner={true}
        spinnerSize="4rem"
        color="#de00ff"
        text="Loading"
        >
        <Container className="phoenixesContainer">
          <Row>
            {this.renderMyPhoenixes()}
          </Row>
        </Container>
        </Loadable>  
      </div>
    )
  }
}

export default connect(mapStateToProps)(MyPhoenixes)
