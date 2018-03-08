import React, { Component } from 'react'
import { Jumbotron, Container, Col, Row, Button,
  Card, CardImg, CardBody, CardTitle, CardSubtitle, Progress } from 'reactstrap'
import {MAX_COOLDOWN, MAX_POWER } from './Constants.js'

export default class Home extends Component {
  render() {
    return (
      <div>
      <Jumbotron>
        <h1>Crypto Phoenixes</h1>
        <p>A strategic collectibles game</p>
      </Jumbotron>
        
        <Jumbotron>
        <Container>
        <Row>
        <Col xs="12" sm="6" lg="4">
        <Card>
        <CardImg top width="100%" src={require("../assets/Iron Man.jpg")} alt="Card image cap" />
        <CardBody>
        <CardTitle className="cardTitleText">Iron Man</CardTitle>
        <CardSubtitle>Owner: 0x12345</CardSubtitle>
        <hr />
        <span>Dividend: 8%</span>
        <Progress striped color="success" value={8} max={MAX_POWER}/> 
        <span>Power: 65%</span>
        <Progress striped color="warning" value={65} max={100} />
        <span>Cooldown: 1 day</span>
        <Progress striped color="danger" value={1} max={MAX_COOLDOWN}/>
        <hr />
        <Button color="warning" block size="lg" className="explosionText">Explode Now!</Button>
        <Button color="primary" size="sm" block disabled>You own this!</Button>
        </CardBody>
        </Card>
        </Col>

        <Col xs="12" sm="6" lg="8">
        <h2>Dividends</h2>
        <p>
          2.5% of each phoenix sale goes to the dividends pool, which is distributed to all other phoenix card owners. This attribute determines
          the proportion of dividends received. 0.5% goes to the owner who caused the phoenix to explode in the previous round.
        </p>
        <hr />
        <h2>Exploding Power</h2>
        <p>
          10-12% of each phoenix sale goes to the Phoenix pool. This attribute determines the percentage claimable out of this pool. Trigger this
          claim by exploding the phoenix. Be wary though, as this will cause the price of the phoenix to
          <strong> drop significantly!</strong>
        </p>
        <hr />
        <h2>Cooldown</h2>
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
