// **** CONTEXT-PROVIDER COMPONENT ****//

import React, {useReducer} from "react";
import Context from './Context';
import {RESET, FETCH_DATA, DELETE} from '../constants';

const initialState = {appData: []};

const reducer = (state, action) => {

    switch (action.type) {
        case RESET :
            return initialState;
        case FETCH_DATA :
            return {...state, appData: state.appData.concat(action.payload)};
        case DELETE :
            return {...state, appData: state.appData.filter(e => !action.payload.includes(e.userName))};    
        default :
            return state
    }
}

function ContextProvider(props) {

    const [state, dispatch] = useReducer(reducer, initialState);
    const value = {state, dispatch};

    return <Context.Provider value={value}>{props.children}</Context.Provider>;
}

export default ContextProvider;