//**** APP COMPONENT ****//

import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Dashboard from './containers/Dashboard'
import Login from './containers/Login';
import './App.scss'

const App = () => {
    return (
        <Switch>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/dashboard' component={Dashboard}/>
        </Switch>
    )
}

export default App;