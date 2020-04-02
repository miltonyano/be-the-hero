import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import NgoIncident from './pages/NgoIncident';
import NewIncident from './pages/NewIncident';

export default function Routers(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />

                <Route path="/ngo/incidents" exact component={NgoIncident} />
                <Route path="/ngo/incidents/new" component={NewIncident} />
            </Switch>
        </BrowserRouter>
    )
}