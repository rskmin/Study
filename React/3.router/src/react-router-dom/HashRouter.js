import React from 'react'
import { Router } from '../react-router';
import { createHashHistory } from '../history';

class BrowserRouter extends React.Component {
  history = createHashHistory();
  render() {
    return (
      <Router history={this.history}>
        {this.props.children}
      </Router>
    )
  }
}

export default BrowserRouter;