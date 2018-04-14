import React, { Component } from 'react'
import { Jumbotron } from 'reactstrap'
import MetamaskLock from '../assets/MetamaskLock.jpg'

export default class MetamaskLocked extends Component {

  render() {
    return (
      <div>
          <Jumbotron>
          <h1 className="homeDescription">Kindly unlock metamask</h1>
          <hr />
          <img src={MetamaskLock} />
          <hr />
        </Jumbotron>
      </div>
      )
    }
}