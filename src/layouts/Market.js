import React, { Component } from 'react'
import { Jumbotron, Container } from 'reactstrap'
import getWeb3 from '../util/web3/getWeb3'
import Phoenixes from './Phoenixes'
import { CryptoPhoenixesABI, CRYPTOPHOENIXES_CONTRACT_ADDR } from './Constants'
import ReactAnimatedEllipsis from 'react-animated-ellipsis'

export default class Market extends Component {
  constructor(props) {
    super(props)
    this.state = {
      web3: '',
      CryptoPhoenixes: ''
    }
  }

  async componentDidMount() {
    setInterval(
      () => this.updateWeb3Status(), 1000
    )
  }

  async updateWeb3Status() {
    let results = await getWeb3;
    if (results.web3) {

      let CryptoPhoenixesContract = results.web3.eth.contract(CryptoPhoenixesABI),
      CryptoPhoenixes = CryptoPhoenixesContract.at(CRYPTOPHOENIXES_CONTRACT_ADDR)

      this.setState({ 
        web3: results.web3,
        CryptoPhoenixes: CryptoPhoenixes
      })
    }
  }

  render() {
    if (!this.state.web3) {
      return (
        <div id="loadingContainer">
        <Container>
        <h1>Loading</h1>
        <ReactAnimatedEllipsis fontSize="20rem"/>
        </Container>
        </div>
      )
    } else {
      return (
      <div>
      <Phoenixes web3={this.state.web3} CryptoPhoenixes={this.state.CryptoPhoenixes} network={this.state.web3.version.network}/>
      {this.props.children}
      </div>
      )
    }
  }
}