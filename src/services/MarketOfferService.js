"use strict";

import HttpService from './HttpService';
import UserService from './UserService';

export default class MarketOfferService {

    constructor(){
    }

    static baseURL() {return 'http://localhost:3000/marketOffers' }

    static getMarketOffers(){
       return new Promise((resolve, reject) => {
           HttpService.get(this.baseURL(), function(data) {
               resolve(data);
           }, function(textStatus) {
               reject(textStatus);
           });
       });
    }

    static getMarketOffer(id) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${MarketOfferService.baseURL()}/${id}`, function(data) {
                if(data != undefined || Object.keys(data).length !== 0) {
                    resolve(data);
                }
                else {
                    reject('Error while retrieving market offer');
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static deleteMarketOffer(id) {
        return new Promise((resolve, reject) => {
            HttpService.remove(`${MarketOfferService.baseURL()}/${id}`, function(data) {
                if(data.message != undefined) {
                    resolve(data.message);
                }
                else {
                    reject('Error while deleting');
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static updateMarketOffer(marketOffer) {
        return new Promise((resolve, reject) => {
            HttpService.put(`${this.baseURL()}/${marketOffer._id}`, marketOffer, function(data) {
                resolve(data);
            }, function(textStatus) {
               reject(textStatus);
            });
        });
    }

    static createMarketOffer(marketOffer) {
        //marketOffer.id = Math.floor((Math.random() * 100000000) + 1).toString(); //TODO generate UUID???

        if(!UserService.isAuthenticated())
            return;
        marketOffer.creator = UserService.getCurrentUser().id;

        return new Promise((resolve, reject) => {
            HttpService.post(MarketOfferService.baseURL(), marketOffer, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }
}