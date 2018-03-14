import React, { Component } from 'react'
import Notifications from 'react-notify-toast'
import NavigationBar from './layouts/NavigationBar'
import Footer from './layouts/Footer'
import getWeb3 from './util/web3/getWeb3'

// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'
import "./css/odometerCar.css"

class App extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      currNetwork: -1,
      currAccount: ''
    }
  }

  async componentDidMount() {
    setInterval(
      () => this.updateWeb3Status(), 1500
    )
  }

  async updateWeb3Status() {
    let results = await getWeb3;

    if (results.web3) {
      if ((this.state.currNetwork !== results.web3.version.network) && results.web3.version.network) {
        this.setState({ currNetwork: results.web3.version.network })
      }

      if (results.web3.eth.accounts[0]) {
        let account = results.web3.eth.accounts[0].slice(0,10)
        this.setState({ currAccount: account })
      } else {
        this.setState({ currAccount: '' })
      } 
    } else {
      this.setState({ currNetwork: 0})
    }
  }

  render() {
    return (
      <div className="App">
        
        {this.props.children}
        <hr />
        <Footer />
      </div>
    );
  }
}

export default App
