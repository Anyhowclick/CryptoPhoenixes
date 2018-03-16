import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap';
import { CONTRACT_LINK, RIGHT_NETWORK_ID } from './Constants'
import Discord from '../assets/Discord.png'
import Banner from '../assets/Banner.png'

export default class NavigationBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: true,
    };

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.getAddress = this.getAddress.bind(this);
    this.isWrongNetwork = this.isWrongNetwork.bind(this);
  }

  shouldComponentUpdate(nextProps,nextState) {
    return (
      (
        (this.props.account != nextProps.account) || 
        (this.props.network != nextProps.network) ||
        (this.state.collapsed != nextState.collapsed)
      )
    )
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  getAddress() {
    if(this.props.network === -1) {
      return null
    } else if (this.props.network === 0) {
      return (
        <Button color="danger" href="/getMetamask">Metamask Undetected</Button>
      ) 
    } else if (!this.props.account) {
      return (
        <Button color="warning" href="/unlockMetamask">Metamask Locked</Button>
      )
    } else {
      return (
        <Button color="success" disabled>{this.props.account}</Button>
      )
    }
  }

  isWrongNetwork() {
    if((this.props.network === RIGHT_NETWORK_ID) || (!this.props.network) || (this.props.network === -1)) {
      return null
    }
    return (
      <Navbar className="wrongNetworkBar">
        <Nav navbar>
        <NavItem>
          Wrong Network Detected. Kindly switch to Ropsten.
        </NavItem>
        </Nav>
      </Navbar>
    )
  }

  render() {
    return (
      <div>
        <Navbar color="faded" light className="navbar-expand-lg">
        
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <NavbarBrand href="/"><img className="banner" src={Banner} /></NavbarBrand>
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="/faq">FAQ</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/marketplace">Marketplace</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://etherscan.io/address/0xfd640dbe512bfcee682898869c2ffb2d13e55dca#code" target="blank">Mainnet Contract</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://discord.gg/YMxXeqW" target="blank">
                <img className="discordIcon" src={Discord} />
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>

          <Nav navbar>
          <NavItem>
            {this.getAddress()}
          </NavItem>
          </Nav>
        </Navbar>
        {this.isWrongNetwork()}
      </div>
    );
  }
}