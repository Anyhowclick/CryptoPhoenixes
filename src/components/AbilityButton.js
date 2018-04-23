import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container } from 'reactstrap'
import { HIGHER_PERCENTAGE_CUTOFF, HIGHER_PRICE_RESET_PERCENTAGE, LOWER_PRICE_RESET_PERCENTAGE, BASE_PRICE, CRYPTOPHOENIXES_CONTRACT_ADDR, DENOMINATOR } from './Constants'
export default class AbilityButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      isOwnerAbilityReadyText: 'Explode Now!',
      notOwnerAbilityReadyText: 'Explosion Ready!',
      team: (this.props.team == 'redTeamBG') ? 'danger' : 'info',
      pool: (this.props.team == 'redTeamBG') ? 'RED' : 'BLUE',
      gameEnded: false
    }

    this.toggle = this.toggle.bind(this)
    this.useAbility = this.useAbility.bind(this)
    this.calculatePriceDrop = this.calculatePriceDrop.bind(this)
    this.getTexts = this.getTexts.bind(this)
  }

  componentDidMount() {
    this.getTexts()
    if(this.props.gameEnd != -1) {
      let time = new Date().getTime()
      time = Math.max(0,parseInt(this.props.gameEnd*1000)-parseInt(time))
      setTimeout(() => {
        this.setState({ gameEnded: true})
      }, time)
    }
  }

  toggle() {
    this.setState({
        modal: !this.state.modal,
    });
  }

  componentWillUpdate(nextProps) {
    if (nextProps.gameEnd != this.props.gameEnd) {
      let time = new Date().getTime()
      time = Math.max(0,parseInt(nextProps.gameEnd*1000)-parseInt(time))
      setTimeout(() => {
        this.setState({ gameEnded: true})
      }, time)
    }
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

  async useAbility() {
    this.setState({ modal: !this.state.modal})
    let self = this
    let data = this.props.contract.useAbility.getData(this.props.id)
    await this.props.web3.eth.sendTransaction({
      data: data,
      from: this.props.account,
      to: CRYPTOPHOENIXES_CONTRACT_ADDR,
    }, 
    (err,res) => {
      if(!err) {
        console.log("Transaction Sent!","success")
      } else {
        console.log("Transaction rejected", "error")
      }
    })
  }
  
  getTexts() {
    if (this.props.id >= 15 || (this.props.id >= 7 && this.props.id <= 10)) {
      this.setState({ isOwnerAbilityReadyText: 'Steal Now!', notOwnerAbilityReadyText: 'Steal Ready!'})
    }

    if (this.props.id >= 11) {
      this.setState({ pool: 'BLUE'})
    }
  }

  render() {
    if (this.state.gameEnded) {
      return null
    } else if (this.props.powerDrop > this.props.currentPower) {
      return  <Button color={this.state.team} disabled block className="explosionText">Insufficient power</Button>
    } else if (this.props.isOwner) {
      return (
        <div>
        <Button color={this.state.team} block size="lg" className="explosionText" onClick={this.toggle}>{this.state.isOwnerAbilityReadyText}</Button>
        <Modal className="modal-dialog modal-lg" isOpen={this.state.modal} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>Caution</ModalHeader>
        <ModalBody>
          <Container className="explosionBenefits">
            You are claiming <strong className="boldModalText">{(this.props.currentPower/DENOMINATOR*100).toFixed(2)}%</strong> from the {this.state.pool} pool.
            <br />
            You get <strong className="boldModalText">1%</strong> dividends from subsequent purchases of this phoenix until the next ability usage.
          </Container>
          <Container className="explosionCosts">
          This phoenix will drop in price to
          <strong className="boldModalText"> {this.calculatePriceDrop()} ETH</strong>
          <br />
          and a power decrease to <strong className="boldModalText">{this.props.lowerPower/DENOMINATOR*100}%!</strong>
          </Container>
          <Container className="explosionContinue">
          Do you wish to continue?
          </Container>
        </ModalBody>
        <ModalFooter>
        <Button color="danger" onClick={this.toggle}>No</Button>
        <Button color="success" onClick={this.useAbility}>Yes</Button>
        </ModalFooter>
        </Modal>
        </div>
      )
    }

    return (
      <Button color={this.state.team} disabled block className="explosionText">{this.state.notOwnerAbilityReadyText}</Button>
    )
  }
}