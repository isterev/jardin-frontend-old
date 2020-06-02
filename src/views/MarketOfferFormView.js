"use strict";

import React from 'react';

import MarketOfferForm from './../components/MarketOfferForm';

import MarketOfferService from '../services/MarketOfferService';


export class MarketOfferFormView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(){
        if(this.props.history.location.pathname == '/add') {
            this.setState({
                loading: false,
                marketOffer: undefined,
                error: undefined
            });
        }
        else if(this.props.location.state != undefined && this.props.location.state.marketOffer != undefined) {
            this.setState({
                loading: false,
                marketOffer: this.props.location.state.marketOffer,
                error: undefined
            });
        }
        else {
            this.setState({
                loading: true,
                error: undefined
            });

            let id = this.props.match.params.id;

            MarketOfferService.getMarketOffer(id).then((data) => {
                this.setState({
                    marketOffer: data,
                    loading: false,
                    error: undefined
                });
            }).catch((e) => {
                console.error(e);
            });
        }
    }

    async updateMarketOffer(marketOffer) {
        if(this.state.marketOffer == undefined) {
            try {
                let ret = await MarketOfferService.createMarketOffer(marketOffer);
                this.props.history.push('/');
            } catch(err) {
                console.error(err);
                this.setState(Object.assign({}, this.state, {error: 'Error while creating marketOffer'}));
            }
        } else {
            try {
                let ret = await MarketOfferService.updateMarketOffer(marketOffer);
                this.props.history.goBack();
            } catch(err) {
                console.error(err);
                this.setState(Object.assign({}, this.state, {error: 'Error while creating marketOffer'}));
            }
        }
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (<MarketOfferForm marketOffer={this.state.marketOffer} onSubmit={(marketOffer) => this.updateMarketOffer(marketOffer)} error={this.state.error} />);
    }
}
