import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { CRYPTOPHOENIXES_CONTRACT_ADDR } from './Constants'

export default class UserFundButton extends Component {
  constructor(props) {
    super(props)
    this.withdrawDividends = this.withdrawDividends.bind(this);
  }

  async withdrawDividends() {
    let self = this
    let data = this.props.CryptoPhoenixes.withdrawDividends.getData()
    await this.props.web3.eth.sendTransaction({
      data: data,
      from: this.props.web3.eth.accounts[0],
      to: CRYPTOPHOENIXES_CONTRACT_ADDR,
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
    return (
      <Button color="success" size="lg" className="claimFundButton" onClick={this.withdrawDividends}>Collect Funds: {this.props.userFunds} ETH</Button>
      )
  }
}