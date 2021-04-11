//**** REACT-DOM-RENDER ****/

import React from 'react';
import ReactDOM from 'react-dom';

import ContextProvider from './context/ContextProvider'
// IMPORT ROUTER TO APP
import {BrowserRouter} from 'react-router-dom';


// IMPORT BOOTSTRAP TO ALL APP
import 'bootstrap/dist/css/bootstrap.css';
import './index.scss';


import App from './App';


ReactDOM.render(
    <ContextProvider>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </ContextProvider>, document.getElementById('root'));
