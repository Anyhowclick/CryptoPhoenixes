import React, { Component } from 'react'
import { Container } from 'reactstrap'
import MetamaskLock from '../assets/MetamaskLock.PNG'

export default class MetamaskLocked extends Component {

  render() {
    return (
      <div>
          <Container>
          <h1>Kindly unlock metamask</h1>
          <hr />
          <img src={MetamaskLock} />
          <hr />
        </Container>
      </div>
      )
    }
}