import React, { Component } from 'react'
import { Jumbotron, Button } from 'reactstrap'
import MetamaskInstall from '../assets/MetamaskInstall.png'

export default class MetamaskGet extends Component {

  render() {
    return (
      <div>
      <Jumbotron>
        <h1 className="homeDescription">Install Metamask</h1>
        <img src={MetamaskInstall} />
        <br />
        <Button className="metamaskButton" outline color="warning" href="https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn">
        For Chrome
        </Button>
        <br />
        <Button className="metamaskButton" outline color="danger" href="https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/">
        For Firefox
        </Button>
        <br />
        <Button className="metamaskButton" outline color="warning" href="https://addons.opera.com/en/extensions/details/metamask/">
        For Opera
        </Button>
        <br />
        <Button className="metamaskButton" outline color="danger" href="https://brave.com/">
        Get Brave browser
        </Button>
        <br />
      </Jumbotron>
      </div>
      )
  }
}