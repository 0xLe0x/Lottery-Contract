import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react'
import lotteryFactoryAt from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';

class LotteryIndex extends Component {
    static async getInitialProps() {
        let lotteryFactory = lotteryFactoryAt("0xcc528c8135ca6318149c2e6a247619187434ff63");
        const lotteries = await lotteryFactory.methods.getLotteries().call();
        return { lotteries };
    }

    renderLotteries() {
        const items = this.props.lotteries.map(address => {
            return {
                header: address,
                description: (
                    <Link route={ `/lotteries/${address}`}>
                        <a>View Lottery</a>
                    </Link>
                ),
                fluid: true
            };
        });
        return <Card.Group items={items} />;
    }
    

    render() {
        return (
            <Layout>
                <div>
                    <h3>Open lotteries</h3>
                    <Link route="/lotteries/new">
                        <a>
                            <Button 
                                floated="right" 
                                content="Deploy Lottery" 
                                icon="add" 
                                primary 
                            />
                        </a>
                    </Link>
                    {this.renderLotteries()}
                </div>
            </Layout>
        )
    }
}

export default LotteryIndex;