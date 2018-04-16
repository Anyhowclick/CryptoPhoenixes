import React, { Component } from 'react'
import { Button, InputGroup, Input } from 'reactstrap'
import { CRYPTOPHOENIXES_CONTRACT_ADDR, RIGHT_NETWORK_ID } from './Constants'
import { toast } from 'react-toastify'
import PauseButton from './PauseButton'

export default class BuyButton extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      price: this.props.price,
      userPrice: this.props.price,
      team: (this.props.team == 'redTeamBG') ? 'danger' : 'info',
      account: this.props.account,
      gameEnded: false
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.buyPhoenix = this.buyPhoenix.bind(this);
  }

  componentWillMount() {
    if(this.props.gameEnd != -1) {
      let time = new Date().getTime()
      time = Math.max(0,parseInt(this.props.gameEnd*1000)-parseInt(time))
      setTimeout(() => {
        this.setState({ gameEnded: true})
      }, time)
    }
  }

  componentWillUpdate(nextProps) {
    if ((nextProps.price != this.state.price) || (this.state.price == -1 && nextProps.price != -1)) {
      this.setState({price: nextProps.price, userPrice: nextProps.price})
    }

    if (nextProps.account != this.state.account) {
      this.setState({ account: nextProps.account })
    }

    if (nextProps.gameEnd != this.props.gameEnd) {
      let time = new Date().getTime()
      time = Math.max(0,parseInt(nextProps.gameEnd*1000)-parseInt(time))
      this.timeout = setTimeout(() => {
        this.setState({ gameEnded: true})
      }, time)
      this.setState({ account: nextProps.account }) //force re-render
    }
  }

  componentWillUnmount() {
    if(this.timeout) {
      clearTimeout(this.timeout)
    }
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  async buyPhoenix() {
    let self = this
    let data = this.props.contract.purchasePhoenix.getData(this.props.id)
    await this.props.web3.eth.sendTransaction({
      data: data,
      from: this.state.account,
      to: CRYPTOPHOENIXES_CONTRACT_ADDR,
      value: this.props.web3.toWei(this.state.userPrice)
    }, 
    (err,res) => {
        if(!err) {
          toast.warning("Transaction sent!", {position: toast.POSITION.BOTTOM_RIGHT})
        } else {
          console.log("Transaction rejected", "error")
      }
    })
  }

  render() {
    if (this.props.paused) {
      return <PauseButton className={this.props.team}/>
    } else if (!this.state.account) {
      return null
    } else if (this.state.gameEnded) {
      return <Button className="explosionText" color={this.state.team} block disabled>Game ended</Button>
    } else if (this.props.network != RIGHT_NETWORK_ID) {
      return <Button color={this.state.team} block disabled>Wrong network</Button>
    }
    
    if (this.props.isOwner) {
      return (
        <Button color="warning" size="sm" block disabled>You own this!</Button>
      )
    }
    return (
      <InputGroup>
        <Input className="buyButton" name="userPrice" value={this.state.userPrice} onChange={this.handleChange}/>
        <Button color={this.state.team} size="sm" onClick={this.buyPhoenix}>Buy</Button>
      </InputGroup>
    )
  }
}