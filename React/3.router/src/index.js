import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from './react-router-dom';

import Home from './components/Home';
import Profile from './components/Profile';
import User from './components/User';

ReactDOM.render(
  <Router>
    <>
      <Route path="/" component={Home} exact />
      <Route path="/user" component={User} />
      <Route path="/profile" component={Profile} />
    </>
  </Router>,
  document.getElementById('root')
);
