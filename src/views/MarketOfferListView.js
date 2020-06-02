"use strict";

import React from 'react';

import { MarketOfferList } from '../components/MarketOfferList';

import MarketOfferService from '../services/MarketOfferService';


export class MarketOfferListView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: []
        };
    }

    componentWillMount(){
        this.setState({
            loading: true
        });

        MarketOfferService.getMarketOffers().then((data) => {
            this.setState({
                data: [...data],
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });
    }

    async deleteMarketOffer(id) {
        this.setState({
            data: [...this.state.data],
            loading: true
        });

        try {
            let ret = await MarketOfferService.deleteMarketOffer(id);
            let marketOfferIndex = this.state.data.map(marketOffer => marketOffer['_id']).indexOf(id);
            let marketOffers = this.state.data;
            marketOffers.splice(marketOfferIndex, 1);
            this.setState({
                data: [...marketOffers],
                loading: false
            });
        } catch(err) {
            console.error(err);
        }
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (
            <MarketOfferList data={this.state.data} onDelete={(id) => this.deleteMarketOffer(id)}/>
        );
    }
}
