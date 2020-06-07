"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import WebFontLoader from 'webfontloader';
import 'react-md/dist/react-md.green-light_green.min.css'
// alternatives here: 
// https://unpkg.com/browse/react-md@1.16.1/dist/
// import 'react-md/dist/react-md.green-lime.min.css'

WebFontLoader.load({
    google: {
        families: ['Roboto:300,400,500,700', 'Material Icons'],
    },
});

ReactDOM.render(<App />, document.getElementById('app'));
