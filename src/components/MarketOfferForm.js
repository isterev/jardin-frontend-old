"use strict";

import {Card, Button} from 'react-md';
import {withRouter} from 'react-router-dom';
import React from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Form, Select, Input, Textarea} from 'react-formik-ui';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

import Page from './Page';

const style = {maxWidth: 500};


class MarketOfferForm extends React.Component {

    constructor(props) {
        super(props);
        this.isUpdate = false;

        if(this.props.marketOffer != undefined) {
            this.state = {
                category: props.marketOffer.category,
                title: props.marketOffer.title,
                description: props.marketOffer.description,
                denomination: props.marketOffer.denomination,
                pricePerUnit: props.marketOffer.pricePerUnit,
                //productImage: props.marketOffer.productImage //TODO
            };
            this.isUpdate = true;

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

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(values) {
        confirmAlert({
            title: 'Confirm',
            message: "Do you really want to " + (this.isUpdate? "update" : "create") + " this market offer?",
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.confirmOk(values)
                },
                {
                    label: 'No'
                }
            ]
        });

    }

    confirmOk(values) {

        let marketOffer = this.props.marketOffer;
        if(marketOffer == undefined) {
            marketOffer = {};
        }

        marketOffer.category = values.category;
        marketOffer.title = values.title;
        marketOffer.description = values.description;
        marketOffer.denomination = values.denomination;
        marketOffer.pricePerUnit = values.pricePerUnit;

        this.props.onSubmit(marketOffer);
    }


    // validation with yup
    getSchema() {
        return yup.object().shape({
            category: yup.string()
                .required('Category is required')
                .oneOf(
                    ['SEEDS_SMALL_PLANTS', 'FERTILISERS', 'MECHANICAL_EQUIPMENT', 'ELECTRONIC_EQUIPMENT', 'OTHERS'],
                    'Invalid category type'
                ),
            title: yup.string()
                .required('Title is required'),
            description: yup.string()
                .required('Description is required'),
            denomination: yup.string()
                .required('Denomination is required')
                .oneOf(
                    ['UNIT','PER_KG', 'PER_GRAM', 'PER_DAY'],
                    'Invalid Denomination type'
                ),
            pricePerUnit: yup.number()
                .required('Price per unit is required')
                .min(0, 'Must be non-negative')
                //.positive('Must be positive')
                .typeError("Price per unit is required")
        })
    };

    render() {
        return (

            <div class="scroll">
                <Page>
                    <br/>
                    <br/>
                    <br/>
                    <Card style={style} className="md-block-centered">
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
                                    <br/>

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
                                        // required
                                    />

                                    <Input
                                        name='title'
                                        label='Title'
                                        hint='Specify a title'
                                        // required
                                    />

                                    <Textarea
                                        name='description'
                                        label='Description'
                                        hint='Write a detailed description'
                                        style={{width: "90%", height: "150px"}}
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
                                        // required
                                    />

                                    <Input
                                        name='pricePerUnit'
                                        label='Price per unit'
                                        hint='Define the price per unit'
                                        // required
                                    />

                                    <Button type="submit" raised primary className="md-cell md-cell--2"
                                            onClick={(() => this.form.submit())}>
                                        Submit
                                    </Button>
                                    <Button type="reset" raised secondary className="md-cell md-cell--2"
                                            onClick={(() => history.go(-1))}>
                                        Cancel
                                    </Button>
                                </Form>


                            )}
                        />
                    </Card>
                </Page>

            </div>
        )
    }


}

export default withRouter(MarketOfferForm);