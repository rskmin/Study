import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from './react-router-dom';

import Home from './components/Home';
import Profile from './components/Profile';
import User from './components/User';
import Post from './components/Post';

ReactDOM.render(
  <Router>
    <>
      <ul>
        <li><Link to="/">Home Page</Link></li>
        <li><Link to="/user">User Management</Link></li>
        <li><Link to="/profile">Personal Center</Link></li>
        <li><Link to={{ pathname: '/post/1', state: { title: 'post1-title' } }}>post 1</Link></li>
      </ul>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/user" component={User} />
        <Route path="/profile" component={Profile} />
        <Route path="/post/:id" component={Post} />
      </Switch>
    </>
  </Router>,
  document.getElementById('root')
);
