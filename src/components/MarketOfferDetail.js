"use strict";

import React from 'react';
import {Link} from 'react-router-dom'
import {Card, CardTitle, CardText, Grid, Cell, Button, TableColumn, FontIcon} from 'react-md';
import {Form, Select, Input, Textarea} from "react-formik-ui";
import {Formik} from "formik";
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

import Page from './Page';
import UserService from '../services/UserService';

const style = {maxWidth: 500};

export class MarketOfferDetail extends React.Component {

    constructor(props) {
        super(props);

        this.userId = UserService.getCurrentUser().id;

        if(props.marketOffer != undefined) {
            this.state = {
                category: props.marketOffer.category,
                title: props.marketOffer.title,
                description: props.marketOffer.description,
                denomination: props.marketOffer.denomination,
                pricePerUnit: props.marketOffer.pricePerUnit,
                //productImage: props.marketOffer.productImage //TODO
            };
        } else {
            this.state = {
                category: '',
                title: '',
                description: '',
                denomination: '',
                pricePerUnit: 0,
                //productImage: null //TODO
            };
        }

    }

    onDelete(marketOffer) {
        confirmAlert({
            title: 'Confirm',
            message: "Do you really want to delete this market offer?",
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.props.onDelete(marketOffer._id)
                },
                {
                    label: 'No'
                }
            ]
        });
    }

    render() {
        return (
            <Page>
                <Card style={style} className="md-block-centered">

                    {UserService.isAuthenticated() && this.userId === this.props.marketOffer.creator ?

                        <Grid className="grid-example">
                            <Cell size={1}>
                                <Link to={{
                                    pathname: `/edit/${this.props.marketOffer._id}`,
                                    state: {marketOffer: this.props.marketOffer}
                                }}><Button icon>mode_edit</Button></Link>
                            </Cell>
                            <Cell size={1}>
                                <Button onClick={() => this.onDelete(this.props.marketOffer)} icon>delete</Button>
                            </Cell>
                        </Grid>

                        : ""
                    }

                    <CardTitle title={"Market Offer Details"}/>

                    <CardText>
                        <Formik
                            initialValues={{
                                category: this.state.category,
                                title: this.state.title,
                                description: this.state.description,
                                denomination: this.state.denomination,
                                pricePerUnit: this.state.pricePerUnit
                            }}
                            validationSchema={this.getSchema}
                            onSubmit={this.onSubmit}
                            render={() => (
                                <Form mode='structured'>

                                    <Select
                                        name='category'
                                        label='Category'
                                        placeholder='Select a category'
                                        options={[
                                            { value: 'SEEDS_SMALL_PLANTS', label: 'seeds and small plants' },
                                            { value: 'FERTILISERS', label: 'fertilisers' },
                                            { value: 'MECHANICAL_EQUIPMENT', label: 'mechanical equipment' },
                                            { value: 'ELECTRONIC_EQUIPMENT', label: 'electronic equipment' },
                                            { value: 'OTHERS', label: 'others' },
                                        ]}
                                        disabled
                                    />

                                    <Input
                                        name='title'
                                        label='Title'
                                        disabled
                                    />

                                    <Textarea
                                        name='description'
                                        label='Description'
                                        style={{width: "90%", height: "150px"}}
                                        disabled
                                    />

                                    <Select
                                        name='denomination'
                                        label='Denomination'
                                        placeholder='Select a denomination'
                                        options={[
                                            { value: 'UNIT', label: 'unit' },
                                            { value: 'PER_KG', label: 'per kg' },
                                            { value: 'PER_GRAM', label: 'per gram' },
                                            { value: 'PER_DAY', label: 'per day' },
                                        ]}
                                        disabled
                                    />

                                    <Input
                                        name='pricePerUnit'
                                        label='Price per unit'
                                        disabled
                                    />

                                    <Button type="reset" raised secondary className="md-cell md-cell--2"
                                            onClick={(() => history.go(-1))}>
                                        Back
                                    </Button>

                                </Form>


                            )}
                        />
                    </CardText>
                </Card>
            </Page>
        );
    }
}