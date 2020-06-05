"use strict";

import React from 'react';

import { MarketOfferDetail_old } from '../components/MarketOfferDetail';

import MarketOfferService from '../services/MarketOfferService';


export class MarketOfferDetailView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(props){
        this.setState({
            loading: true
        });

        let id = this.props.match.params.id;

        (async () => {
            try {
                let marketOffer = await MarketOfferService.getMarketOffer(id);
                this.setState({
                    marketOffer: marketOffer,
                    loading: false
                });
            } catch(err) {
                console.error(err);
            }
        })();
    }

    async deleteMarketOffer(id) {
        try {
            let ret = await MarketOfferService.deleteMarketOffer(id);
            this.props.history.push('/');
        } catch(err) {
            console.error(err);
        }
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (
            <MarketOfferDetail_old marketOffer={this.state.marketOffer} onDelete={(id) => this.deleteMarketOffer(id)}/>
        );
    }
}
