import React, { Component } from 'react'
import RouterContext from './RouterContext';
import matchPath from './matchPath';

class Route extends Component {
  static contextType = RouterContext;
  render() {
    const { history, location } = this.context;
    const { component: RouteComponent, render, children } = this.props;
    const match = matchPath(location.pathname, this.props);
    let routeProps = { history, location, match };
    if (match) {
      routeProps.match = match;
      if (children) {
        return children(routeProps);
      } else if (RouteComponent) {
        return <RouteComponent {...routeProps} />
      } else if (render) {
        return render(routeProps);
      } else {
        return null;
      }
    }
    if (children) return children(routeProps);
    return null;
  }
}

export default Route;