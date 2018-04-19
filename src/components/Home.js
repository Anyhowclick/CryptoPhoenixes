import React, { Component } from 'react'
import { Jumbotron, Button } from 'reactstrap'
import Title from '../assets/Title.png'
import TitleCaption from '../assets/TitleCaption.png'

export default class Home extends Component {
  render() {
    return (
      <Jumbotron>
        <div>
        <img src={Title} />
        </div>
        <div>
        <Button color="danger" id="getStartedButton" href="/battlefield">Get Started</Button>
        </div>
        <img src={TitleCaption} />
      </Jumbotron>
    )
  }
}
