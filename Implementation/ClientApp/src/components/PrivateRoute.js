import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { authenticationService } from '../services';

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = authenticationService.currentUserValue;
        
        if (currentUser === null) {
            // role not authorised so redirect to home page
            return <Redirect to={{ pathname: '/'}} />
        }
        
        // check if route is restricted by role
        if (roles && roles.indexOf(currentUser.tipKorisnika) === -1) {
            // role not authorised so redirect to home page
            return <Redirect to={{ pathname: '/'}} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)