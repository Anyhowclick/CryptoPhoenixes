import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { CRYPTOPHOENIXES_CONTRACT_ADDR } from './Constants'

export default class UserFundButton extends Component {
  constructor(props) {
    super(props)
    this.withdrawFunds = this.withdrawFunds.bind(this);
  }

  async withdrawFunds() {
    let self = this
    let data = this.props.CryptoPhoenixes.withdrawFunds.getData()
    await this.props.web3.eth.sendTransaction({
      data: data,
      from: this.props.web3.eth.accounts[0],
      to: CRYPTOPHOENIXES_CONTRACT_ADDR,
    }, 
    (err,res) => {
      if(!err) {
        console.log("Transaction Sent!")
      } else {
        console.log("Transaction rejected")
      }
    })
  }

  render() {
    if(!this.props.web3) { return null }
    if (this.props.userFunds == -1) {
      return (<Button color="warning" size="lg" className="claimFundButton" href="/unlockMetamask">Unlock Metamask</Button>)
    } else {
      return (
        <Button color="success" size="lg" className="claimFundButton" onClick={this.withdrawFunds}>Collect Funds: {this.props.userFunds} ETH</Button>
        )
    }
  }
}