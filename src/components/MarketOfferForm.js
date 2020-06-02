"use strict";

import React from 'react';
import { Card, Button, FontIcon, TextField } from 'react-md';
import { withRouter } from 'react-router-dom'

import { AlertMessage } from './AlertMessage';
import Page from './Page';


const style = { maxWidth: 500 };


class MarketOfferForm extends React.Component {

    constructor(props) {
        super(props);

        if(this.props.marketOffer != undefined) {
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

        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeDenomination = this.handleChangeDenomination.bind(this);
        this.handleChangePricePerUnit = this.handleChangePricePerUnit.bind(this);
        // this.handleChangeProductImage = this.handleChangeProductImage.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeCategory(value) {
        this.setState(Object.assign({}, this.state, {category: value}));
    }

    handleChangeTitle(value) {
        this.setState(Object.assign({}, this.state, {title: value}));
    }

    handleChangeDescription(value) {
        this.setState(Object.assign({}, this.state, {description: value}));
    }

    handleChangeDenomination(value) {
        this.setState(Object.assign({}, this.state, {denomination: value}));
    }

    handleChangePricePerUnit(value) {
        this.setState(Object.assign({}, this.state, {pricePerUnit: value}));
    }

    //handleChangeProductImage(value) {
    //    this.setState(Object.assign({}, this.state, {productImage: value}));
    //}

    handleSubmit(event) {
        event.preventDefault();

        let marketOffer = this.props.marketOffer;
        if(marketOffer == undefined) {
            marketOffer = {};
        }

        marketOffer.category = this.state.category;
        marketOffer.title = this.state.title;
        marketOffer.description = this.state.description;
        marketOffer.denomination = this.state.denomination;
        marketOffer.pricePerUnit = this.state.pricePerUnit;

        this.props.onSubmit(marketOffer);
    }

    render() {
        return (
            <Page>
                <Card style={style} className="md-block-centered">
                    <form className="md-grid" onSubmit={this.handleSubmit} onReset={() => this.props.history.goBack()}>
                        <TextField
                            label="Category"
                            id="CategoryField"
                            type="text"
                            className="md-row"
                            required={true}
                            value={this.state.category}
                            onChange={this.handleChangeCategory}
                            errorText="Category is required"/>
                        <TextField
                            label="Title"
                            id="TitleField"
                            type="text"
                            className="md-row"
                            required={true}
                            value={this.state.title}
                            onChange={this.handleChangeTitle}
                            errorText="Title is required"/>
                        <TextField
                            label="Description"
                            id="DescriptionField"
                            type="text"
                            className="md-row"
                            required={false}
                            rows={5}
                            value={this.state.description}
                            onChange={this.handleChangeDescription}/>
                        <TextField
                            label="Denomination"
                            id="DenominationField"
                            type="text"
                            className="md-row"
                            required={true}
                            value={this.state.denomination}
                            onChange={this.handleChangeDenomination}/>
                        <TextField
                            label="Price per Unit"
                            id="PricePerUnitField"
                            type="number"
                            className="md-row"
                            required={true}
                            value={this.state.pricePerUnit}
                            onChange={this.handleChangePricePerUnit}
                            errorText="Price per unit is required"/>

                        <Button id="submit" type="submit"
                                disabled={this.state.category == undefined || this.state.category == '' || this.state.title == undefined ||
                                          this.state.title == '' || this.state.description == undefined || this.state.description == '' ||
                                          this.state.denomination == undefined || this.state.denomination == '' || this.state.pricePerUnit == undefined || this.state.pricePerUnit == ''}
                                raised primary className="md-cell md-cell--2">Save</Button>
                        <Button id="reset" type="reset" raised secondary className="md-cell md-cell--2">Dismiss</Button>
                        <AlertMessage className="md-row md-full-width" >{this.props.error ? `${this.props.error}` : ''}</AlertMessage>
                    </form>
                </Card>
            </Page>
        );
    }
}

export default withRouter(MarketOfferForm);