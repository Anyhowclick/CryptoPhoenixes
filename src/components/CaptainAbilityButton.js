import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container } from 'reactstrap'
import { CRYPTOPHOENIXES_CONTRACT_ADDR } from './Constants'

export default class CaptainAbilityButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      team: (this.props.team == 'redTeamBG') ? 'danger' : 'info',
      gameEnded: false
    }

    this.toggle = this.toggle.bind(this)
    this.useAbility = this.useAbility.bind(this)
  }

  toggle() {
    this.setState({
        modal: !this.state.modal,
    });
  }

  async useAbility() {
    this.setState({ modal: !this.state.modal})
    let self = this
    let data = this.props.contract.useCaptainAbility.getData(this.props.id)
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

  componentDidMount() {
    if(this.props.gameEnd != -1) {
      let time = new Date().getTime()
      time = Math.max(0,parseInt(this.props.gameEnd*1000)-parseInt(time))
      setTimeout(() => {
        this.setState({ gameEnded: true})
      }, time)
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.gameEnd != this.props.gameEnd) {
      this.setState({ gameEnded: false })
      let time = new Date().getTime()
      time = Math.max(0,parseInt(nextProps.gameEnd*1000)-parseInt(time))
      setTimeout(() => {
        this.setState({ gameEnded: true})
      }, time)
    }
  }

  render() {
    if (this.state.gameEnded) {
      return null
    } else if (this.props.isOwner) {
      return (
        <div>
        <Button color={this.state.team} block className="explosionText" onClick={this.toggle}>Boost Team!</Button>
        <Modal className="modal-dialog modal-lg" isOpen={this.state.modal} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>Caution</ModalHeader>
        <ModalBody>
          <Container className="explosionBenefits">
            Your team's phoenixes powers will increase <strong className="boldModalText">1.5x!</strong>
          </Container>
          <Container className="explosionCosts">
          <strong className="boldModalTextLight">This ability can only be used once!</strong>
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
      <Button color={this.state.team} disabled block className="explosionText">Team boost ready!</Button>
    )
  }
}