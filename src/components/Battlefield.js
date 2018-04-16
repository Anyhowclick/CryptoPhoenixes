import React, { Component } from 'react'
import ReactGA from 'react-ga'
import { connect } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import { Jumbotron, Container } from 'reactstrap'
import { fetchGame, updatePools, updateUserFunds, fetchPhoenix } from '../actions/gameActions'
import Phoenixes from './Phoenixes'
import GameStats from './GameStats'
import Loadable from 'react-loading-overlay'

const mapStateToProps = (state) => ({
  web3: state.web3Status.web3,
  currNetwork: state.web3Status.currNetwork,
  currAccount: state.web3Status.currAccount,
  contract: state.contract.contract,
  gameInProgress: state.game.gameInProgress,
  gameEnd: state.game.gameEnd,
  POOLS: state.game.POOLS,
  SCORES: state.game.SCORES,
  userFunds: state.game.userFunds,
  gameFetched: state.game.gameFetched,
  phoenixesFetched: state.game.phoenixesFetched
  })

class Battlefield extends Component {
  constructor(props) {
    super(props)

    this.state = { 
      blockNumber: 0
    }

    this.gameEndNotif = this.gameEndNotif.bind(this)
    this.gameStartNotif = this.gameStartNotif.bind(this)
  }
  
  componentDidMount() {
    ReactGA.initialize('UA-117401803-1')
    ReactGA.pageview(window.location.pathname + window.location.search)
  }

  componentWillUpdate(nextProps) {
    if(nextProps.web3 != this.props.web3) {
      this.props.dispatch(fetchGame(nextProps.contract))
      let self = this,
      GameStartEvent = nextProps.contract.GameStarted(),
      GameEndEvent = nextProps.contract.GameEnded()

      GameStartEvent.watch(function(err,res) {
        if (!err) {
          if(res.blockNumber > self.state.blockNumber) {
            self.setState({ blockNumber: res.blockNumber })
            self.props.dispatch(fetchGame())
            self.fetchAllPhoenixes()
            self.gameStartNotif()
          }
        } else {
          console.log(err)
        }
      })

      GameEndEvent.watch(function(err,res) {
        if (!err) {
          if(res.blockNumber > self.state.blockNumber) {
            self.setState({ blockNumber: res.blockNumber })
            //Update pools and user funds for changes
            self.props.dispatch(updatePools(self.props.contract))
            self.props.dispatch(updateUserFunds(self.props.contract,self.props.currAccount))
            self.gameEndNotif()
          }
        } else {
          console.log(err)
        }
      })
    }
  }

  fetchAllPhoenixes() {
    this.props.dispatch({type:"PHOENIXES_FETCHING"})
    for (var i=0;i<19;i++) {
      this.props.dispatch(fetchPhoenix(this.props.contract,i))
    }
    this.props.dispatch({type: "PHOENIXES_FETCHED"})
  }

  gameStartNotif = () => toast("Game Started!", {position: toast.POSITION.TOP_CENTER})
  gameEndNotif = () => toast("Game has ended and payouts have been distributed!", {position: toast.POSITION.TOP_CENTER})

  render() {
    return (
      <div>
        <ToastContainer autoClose={5000} />
        <Loadable className="loadingScreen"
        active={!this.props.gameFetched}
        spinner={true}
        spinnerSize="4rem"
        color="#de00ff"
        text="Loading"
        >
          <GameStats 
          gameInProgress={this.props.gameInProgress}
          gameEnd={this.props.gameEnd}
          POOLS={this.props.POOLS}
          SCORES={this.props.SCORES}
          web3={this.props.web3}
          contract={this.props.contract}
          userFunds={this.props.userFunds}
          />
        </Loadable>
        
        <Loadable className="loadingScreen"
        active={!this.props.phoenixesFetched}
        spinner={true}
        spinnerSize="4rem"
        color="#de00ff"
        text="Loading"
        >
        <Phoenixes/>
        </Loadable>  
      </div>
    )
  }
}

export default connect(mapStateToProps)(Battlefield)