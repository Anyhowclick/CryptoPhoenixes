import React, { Component } from 'react'
import { Jumbotron, Container, Col, Row, Button,
  Card, CardImg, CardBody, CardTitle, CardSubtitle, Progress } from 'reactstrap'
import {MAX_COOLDOWN, MAX_POWER, MAX_DIVIDENDS} from './Constants.js'
import Countdown from 'react-countdown-now'
import Title from '../assets/Title.png'

export default class Home extends Component {
  render() {
    return (
      <Jumbotron className="homeTitle">
        <img src={Title} />
      </Jumbotron>
    )
  }
}
