import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { HIGHER_PERCENTAGE_CUTOFF, HIGHER_PRICE_RESET_PERCENTAGE, LOWER_PRICE_RESET_PERCENTAGE, BASE_PRICE, CRYPTOPHOENIXES_CONTRACT_ADDR } from './Constants'
export default class ExplosionButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
    }

    this.toggle = this.toggle.bind(this)
    this.explodePhoenix = this.explodePhoenix.bind(this);
    this.calculatePriceDrop = this.calculatePriceDrop.bind(this);
  }

  toggle() {
    this.setState({
        modal: !this.state.modal
    });
  }

  calculatePriceDrop() {
    if (this.props.price >= HIGHER_PERCENTAGE_CUTOFF) {
      let res = (this.props.price * HIGHER_PRICE_RESET_PERCENTAGE / 100).toFixed(5)
      return res
    } else {
      let res = (this.props.price * LOWER_PRICE_RESET_PERCENTAGE / 100).toFixed(7)
      if (res < BASE_PRICE) { return BASE_PRICE }
      return res
    }
  }

  async explodePhoenix() {
    this.setState({ modal: !this.state.modal})
    let self = this
    let data = this.props.CryptoPhoenixes.explodePhoenix.getData(this.props.id)
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
    if (this.props.isOwner) {
      return (
        <div>
        <Button color="warning" block size="lg" className="explosionText" onClick={this.toggle}>Explode Now!</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>Caution</ModalHeader>
        <ModalBody>
        This phoenix will drop in price from <strong>{this.props.price}</strong> ETH to <strong>{this.calculatePriceDrop()} ETH!</strong>
        <br />
        Do you wish to continue?
        </ModalBody>
        <ModalFooter>
        <Button color="danger" onClick={this.toggle}>No</Button>
        <Button color="success" onClick={this.explodePhoenix}>Yes</Button>
        </ModalFooter>
        </Modal>
        </div>
      )
    }

    return (
      <Button color="warning" disabled block size="lg" className="explosionText">Explosion Ready!</Button>
    )
  }
}