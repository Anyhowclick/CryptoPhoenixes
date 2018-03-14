import React, { Component } from 'react'
import { Jumbotron, Container, Col, Row, Button,
  Card, CardImg, CardBody, CardTitle, CardSubtitle, Progress } from 'reactstrap'
import {MAX_COOLDOWN, MAX_POWER, MAX_DIVIDENDS} from './Constants.js'

export default class Home extends Component {
  render() {
    return (
      <div>
      <Jumbotron className="homeTitle">
        <h1>CryptoPhoenixes</h1>
        <p>A strategic collectibles game</p>
      </Jumbotron>
        
        <Jumbotron className="homeDescription">
        <Container>
        <Row>
        <Col xs="12" sm="6" lg="4">
        <Card className="displayCard">
        <CardImg top width="100%" src={require("../assets/Everflame.jpg")} alt="Card image cap" />
        <CardBody>
        <CardTitle className="cardTitleText">Everflame</CardTitle>
        <CardSubtitle className="cardSubtitleText">
        Owner: 0x12345
        <br />
        Price: 0.0025
        </CardSubtitle>
        <hr />
        <span>Dividend: 8%</span>
        <Progress striped color="success" value={8} max={MAX_DIVIDENDS}/> 
        <span>Power: 65%</span>
        <Progress striped color="warning" value={65} max={MAX_POWER} />
        <span>Cooldown: 1 day</span>
        <Progress striped color="danger" value={1} max={MAX_COOLDOWN}/>
        <hr />
        <Button color="warning" block size="lg" className="explosionText">Explode Now!</Button>
        <Button color="primary" size="sm" block disabled>You own this!</Button>
        </CardBody>
        </Card>
        </Col>

        <Col xs="12" sm="6" lg="8" className="attributesDescription">
        <h2 id="dividendTitle">Dividends</h2>
        <p>
          The proportion of dividends received from the dividends pool.
        </p>
        <hr />
        <h2 id="powerTitle">Exploding Power</h2>
        <p>
          The percentage claimable out of the Phoenix pool. Trigger this
          claim by exploding the phoenix. Be wary though, as this will cause the price of the phoenix to
          <strong className="boldText"> drop significantly!</strong>
        </p>
        <hr />
        <h2 id="cooldownTitle">Cooldown</h2>
        <p>
          After each explosion, the phoenix will rise from its ashes and grow again. This attribute determines how long it takes before it is
          ready for the next explosion.
        </p>
        </Col>
        </Row>
        </Container>
      </Jumbotron>
      </div>
    )
  }
}
