"use strict";

import React from 'react';
import { Link } from 'react-router-dom'
import { Card, CardTitle, CardText, Media, MediaOverlay, Grid, Cell, Button, FontIcon } from 'react-md';

import Page from './Page';

import UserService from '../services/UserService';

const style = { maxWidth: 500 };

export class MarketOfferDetail_old extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Page>
                <Card style={style} className="md-block-centered">
                    <Grid className="grid-example" >
                        {/*<Cell size={3}>
                            <Media aspectRatio="1-1">
                                <img src={this.props.marketOffer.productImage} alt={this.props.marketOffer.title} />
                            </Media>
                        </Cell>*/}
                        <Cell size={7}/>
                        <Cell size={1}>
                            {UserService.isAuthenticated() ?
                                <Link to={{pathname: `/edit/${this.props.marketOffer._id}`, state : {marketOffer : this.props.marketOffer}}}><Button icon>mode_edit</Button></Link>
                                : <Link to={'/login'}><Button icon>mode_edit</Button></Link>
                            }
                        </Cell>
                        <Cell size={1}>
                            {UserService.isAuthenticated() ?
                                <Button onClick={() => this.props.onDelete(this.props.marketOffer._id)} icon>delete</Button>
                                :   <Link to={'/login'}><Button icon>delete</Button></Link>
                            }
                        </Cell>
                    </Grid>

                    <CardTitle title={this.props.marketOffer.title} subtitle={this.props.marketOffer.category} />

                    <CardText>
                        <p>
                            {this.props.marketOffer.denomination}
                        </p>
                        <p>
                            {this.props.marketOffer.pricePerUnit}
                        </p>
                        <p>
                            {this.props.marketOffer.description}
                        </p>
                    </CardText>
                </Card>
            </Page>
        );
    }
}