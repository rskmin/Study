import React from 'react';
import ReactDOM from 'react-dom';
import Todos from './components/Todos';
import { Provider } from 'react-redux';
import store from './store';
import Counter from './components/Counter';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import history from './history';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <>
        <ul>
          <li><Link to="/counter/counterName">counter</Link></li>
          <li><Link to={{ pathname: '/todos', state: { name: 'todosName' } }}>todos</Link></li>
        </ul>
        <Route path="/counter/:name" component={Counter} />
        <Route path="/todos" component={Todos} />
      </>
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root'));