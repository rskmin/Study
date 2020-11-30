import React from 'react'
import { Route } from '../react-router';
import Redirect from '../react-router/Redirect.js'

function Protected(props) {
  let { component: RouteComponent, path } = props;
  return (
    <Route path={path} render={
      routeProps => (
        localStorage.getItem('login') ? <RouteComponent {...routeProps} /> :
          <Redirect to={{ pathname: '/login', state: { from: path } }} />
      )
    } />
  );
};

export default Protected;