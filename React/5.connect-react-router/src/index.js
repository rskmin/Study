import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link } from 'react-router-dom'
import Home from './components/Home.js';
import Counter from './components/Counter'
import { Provider } from 'react-redux';
import store from './store';
import { ConnectedRouter } from './connected-react-router';
import history from './history';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Link to="/">Home</Link>
      <Link to="counter">Counter</Link>
      <Route path="/" component={Home} exact />
      <Route path="/counter" component={Counter} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);