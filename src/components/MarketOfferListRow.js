"use strict";

import React from 'react';
import { TableRow, TableColumn, FontIcon, Button } from 'react-md';
import { Link } from 'react-router-dom';
import {confirmAlert} from "react-confirm-alert";

import { SimpleLink } from './SimpleLink';
import UserService from '../services/UserService';

export class MarketOfferListRow extends React.Component {

    constructor(props) {
        super(props);
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
            <TableRow key={this.props.key}>
                <TableColumn><Link to={`/show/${this.props.marketOffer._id}`}><FontIcon>image</FontIcon></Link></TableColumn>
                <TableColumn><SimpleLink to={`/show/${this.props.marketOffer._id}`}>{this.props.marketOffer.title}</SimpleLink></TableColumn>
                {UserService.isAuthenticated() ?
                    <TableColumn><Link to={`/edit/${this.props.marketOffer._id}`}><FontIcon>mode_edit</FontIcon></Link></TableColumn>
                    : <TableColumn><Link to={'/login'}><FontIcon>mode_edit</FontIcon></Link></TableColumn>
                }
                {UserService.isAuthenticated() ?
                    <TableColumn><Button onClick={() => this.onDelete(this.props.marketOffer)} icon>delete</Button></TableColumn>
                    : <TableColumn><Link to={'/login'}><FontIcon>delete</FontIcon></Link></TableColumn>
                }

            </TableRow>
        );
    }
}