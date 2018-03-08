import React, { Component } from 'react'
import { Button, InputGroup, Input } from 'reactstrap'
import { CRYPTOPHOENIXES_CONTRACT_ADDR } from './Constants'
import PauseButton from './PauseButton'

export default class BuyButton extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      price: 0
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.buyPhoenix = this.buyPhoenix.bind(this);
  }

  componentWillMount() {
    if (this.props.price) {
      this.setState({price: this.props.price})
    }
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  async buyPhoenix() {
    let self = this
    let data = this.props.CryptoPhoenixes.purchasePhoenix.getData(this.props.id)
    await this.props.web3.eth.sendTransaction({
      data: data,
      from: this.props.web3.eth.accounts[0],
      to: CRYPTOPHOENIXES_CONTRACT_ADDR,
      value: this.props.web3.toWei(this.state.price)
    }, 
    (err,res) => {
        if(!err) {
          self.props.showNotification("Transaction Sent!","success")
        } else {
          self.props.showNotification("Transaction rejected", "error")
      }
    })
  }

  render() {
    if (this.props.paused) {
      return <PauseButton color="info"/>
    }

    if (this.props.isOwner) {
      return (
        <Button color="primary" size="sm" block disabled>You own this!</Button>
      )
    }
    return (
      <InputGroup>
        <Input className="buyButton" name="price" value={this.state.price} onChange={this.handleChange}/>
        <Button color="info" size="sm" onClick={this.buyPhoenix}>Buy!</Button>
      </InputGroup>
    )
  }
}