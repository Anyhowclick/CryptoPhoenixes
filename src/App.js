import React, { Component } from 'react'
import { connect } from 'react-redux'
import Notifications from 'react-notify-toast'
import NavigationBar from './components/NavigationBar'
import Footer from './components/Footer'
import { fetchWeb3 } from './actions/web3Actions'

// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import 'react-progress-bar-plus/lib/progress-bar.css'
import './App.css'

const mapStateToProps = (state) => ({
  web3: state.web3Status.web3,
  currNetwork: state.web3Status.currNetwork,
  currAccount: state.web3Status.currAccount,
  truncatedAccount: state.web3Status.truncatedAccount
  })

class App extends Component {
  constructor(props) {
    super(props)
    this.fetchWeb3 = this.fetchWeb3.bind(this)
  }

  componentDidMount() {
    setInterval(
      () => this.fetchWeb3(), 3000
    )
  }

  fetchWeb3() {
    this.props.dispatch(fetchWeb3(this.props))
  }

  render() {
    return (
      <div className="App">
        <Notifications />
        <NavigationBar network={this.props.currNetwork} account={this.props.truncatedAccount}/>
        {this.props.children}
        <hr />
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps)(App)
