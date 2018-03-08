import React, { Component } from 'react'
import { Container, ListGroup, ListGroupItem, Table } from 'reactstrap'

class About extends Component {
  render() {
    return (
    <div>
        <h1 className="faqTitle">Frequently Asked Questions</h1>
        <Container>
        <ListGroup>
            <ListGroupItem active>Where does my ETH go when I purchase a phoenix?</ListGroupItem>
            <ListGroupItem>
                The money is split 4 ways, with varying percentages depending on the price of the phoenix at the point of purchase.
                <Table hover>
                    <thead>
                        <tr>
                            <th>Price</th>
                            <th>Price Increase</th>
                            <th>Previous Owner</th>
                            <th>Dividends Pool</th>
                            <th>Owner prior to explosion</th>
                            <th>Phoenix Pool</th>
                            <th>Dev Fee</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <th scope="row">Less than 0.25 ETH</th>
                            <td>1.4x</td>
                            <td>83%</td>
                            <td>2.5%</td>
                            <td>0.5%</td>
                            <td>12%</td>
                            <td>2%</td>
                        </tr>
                        
                        <tr>
                        	<th scope="row">Less than 1 ETH</th>
                            <td>1.3x</td>
                            <td>84%</td>
                            <td>2.5%</td>
                            <td>0.5%</td>
                            <td>11%</td>
                            <td>2%</td>
                       </tr>
                       
                        <tr>
                        	<th scope="row">More than 1 ETH</th>
                            <td>1.25x</td>
                            <td>85%</td>
                            <td>2.5%</td>
                            <td>0.5%</td>
                            <td>10%</td>
                            <td>2%</td>
                       </tr>
                    </tbody>
                    </Table>
            </ListGroupItem>
            <ListGroupItem active>Is this a get rich quick scheme?</ListGroupItem>
            <ListGroupItem>
            No. The game has been designed with price sustainability in mind. Price increases are relatively smaller compared to other games. 
            Coupled with the relatively low payout to the previous owner of 83-85%, this means that those looking for a quick flip 
            will find better returns elsewhere. To give an example, having paid 0.36 ETH for a phoenix, one will only receive 0.39 ETH
            in return for the next purchase.
            </ListGroupItem>
            <ListGroupItem active>What is the Phoenix pool for? What happens when a phoenix explodes?</ListGroupItem>
            <ListGroupItem>
                9-13% of all transactions made contribute to the Phoenix pool. When the owner of a phoenix decides to explode it, 
                he will get a portion of the accumulated funds in this pool. How much he gets is determined by the phoenix's explosive power. Note that 
                the phoenix's price goes down by 80% or 90% (depending on its price) after each explosion to make the phoenix 
                cheaper for others to snatch and to generate more funds for the pool. Also note that each phoenix has a <strong>cooldown </strong> 
                after every explosion, meaning, the owner has to wait a period of time before being able to claim from the pool again.
            </ListGroupItem>

            <ListGroupItem active>What are the incentives for exploding a phoenix?</ListGroupItem>
            <ListGroupItem>
                <ol>
                <li>Getting a portion of the Phoenix pool.</li>
                <li>The current price of the phoenix is too high, leaving you stuck with bag hodling. Better to get something than nothing right?</li>
                <li>You get 0.5% dividends from all subsequent transactions made for that phoenix until the next explosion.</li>
                </ol>
            </ListGroupItem>

            <ListGroupItem active>What are the disincentives for exploding a phoenix?</ListGroupItem>
            <ListGroupItem>
                <ol>
                <li>The price of your phoenix <strong>drops by 80 or 90%, depending on the current price</strong></li>
                <li>As the current owner, you get a percentage from the dividend pool.</li>
                <li>Wait for the phoenix pool to grow to a desirable amount.</li>
                <li>Someone snatches the phoenix from you for a higher price, and you get majority of the proceeds from that sale.</li>
                </ol>
            </ListGroupItem>
            <ListGroupItem active>How much exactly is the price drop of a phoenix after it explodes?</ListGroupItem>
            <ListGroupItem>
                If its price is more than 1 ETH, 80%. Otherwise, 90%. It will however never go below the base price of 0.0025 ETH.
                < br/>
                <strong>Disclaimer: These parameters are subject to tweaks in the beta period.</strong>
            </ListGroupItem>
            
            <ListGroupItem active>Phoenix attributes</ListGroupItem>
            <ListGroupItem>
                Cooldown: Time needed between each explosion<br />
                Explosive Power: Percentage of phoenix pool obtained upon explosion<br />
                Dividends: Percentage of dividends received from the dividend pool<br /><br />
                In general, the faster the cooldown rate of the phoenix, the less powerful it is. That isn't necessarily a bad thing though,
                since it is able to claim more frequently from the phoenix pool.
                < br/>
                <strong>Disclaimer: The attribute values of a phoenix are subject to changes in the beta period.</strong>
            </ListGroupItem>

            <ListGroupItem active>Why is the developer allowed to change the attributes of the phoenixes?</ListGroupItem>
            <ListGroupItem>
                The beta period is set to be 6 months (exactly 180 days from contract creation). This is to allow me to fine-tune
                the game. After the 6 month period, anyone can call the closeBeta() function of the smart contract to prevent any further 
                tweaking.
            </ListGroupItem>

        </ListGroup>
        </Container>
    </div>
    )
  }
}

export default About
