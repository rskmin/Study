import React, { Component } from 'react'
import RouterContext from './RouterContext';
import matchPath from './matchPath';

class Route extends Component {
  static contextType = RouterContext;
  render() {
      const { history, location } = this.context;
      const { component: Component } = this.props;
      const match = matchPath(location.pathname, this.props);
      console.log('match');
      let routeProps = { history, location, match };
      if (match) {
        return <Component {...routeProps} />
      }
      return null;
  }
}

export default Route;