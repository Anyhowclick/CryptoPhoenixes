import React, { Component } from 'react'
import { Container, ListGroup, ListGroupItem, Table } from 'reactstrap'
import rules from '../assets/Rules.jpg'
import individualPayout from '../assets/IndividualPayout.png'
import abilityPayout from '../assets/AbilityPayout.png'
import teamPayout from '../assets/TeamPayout.png'
import gamePayout from '../assets/GamePayout.png'
export default class FAQ extends Component {
  render() {
    return (
    <div>
        <h1 className="faqTitle">Frequently Asked Questions</h1>
        <Container>
        <ListGroup>
            <ListGroupItem active>How does this game work?</ListGroupItem>
            <ListGroupItem>
                <img src={rules} />
            </ListGroupItem>
            <ListGroupItem active>Where does my ETH go when I purchase a phoenix?</ListGroupItem>
            <ListGroupItem>
                <img src={individualPayout} />
            </ListGroupItem>
            <ListGroupItem active>If I am purchasing a team captain or the rainbow phoenix, what happens to the captain cut and rainbow phoenix cut?</ListGroupItem>
            <ListGroupItem>
            They will be given to the previous owner.
            </ListGroupItem>
            <ListGroupItem active>The rainbow phoenix does not belong to either team. What happens to the pool cut?</ListGroupItem>
            <ListGroupItem>
                It will be split evenly among the 2 team pools.
            </ListGroupItem>
            <ListGroupItem active>When I use the steal or explode ability, do I get all of the funds?</ListGroupItem>
            <ListGroupItem>
                Unlike the previous version, you don't, but you do get most of it. The distribution is shown below.
                <img src={abilityPayout} />
            </ListGroupItem>
            <ListGroupItem active>What is the team fund distribution?</ListGroupItem>
            <ListGroupItem>
                <img src={teamPayout} />
            </ListGroupItem>
            <ListGroupItem active>What happens when a game ends?</ListGroupItem>
            <ListGroupItem>
                Whatever funds remain in both pools will be combined and given out proportionally as shown below.
                <img src={gamePayout} />
                <br />
                <strong className="boldText">Take note that the prices of ALL phoenixes will reset for the next round.</strong>
            </ListGroupItem>
            <ListGroupItem active>Am I allowed to overbid for a phoenix?</ListGroupItem>
            <ListGroupItem>
                Yes you are, but with a caveat. <strong className="boldText">5% of excess funds goes to the respective team pools. </strong>
                For the rainbow phoenix, the 5% cut will be split evenly among the 2 team pools.
            </ListGroupItem>

            <ListGroupItem active>How much exactly is the price drop of a phoenix after its ability is used?</ListGroupItem>
            <ListGroupItem>
                If its price is more than 0.75 ETH, 80%. Otherwise, 90%. It will however never go below the base price of 0.0025 ETH.
            </ListGroupItem>
        </ListGroup>
        </Container>
    </div>
    )
  }
}
