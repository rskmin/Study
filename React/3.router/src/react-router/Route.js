import React, { Component } from 'react'
import RouterContext from './RouterContext';

class Route extends Component {
  // static contextType = RouterContext;
  render() {
    return (
      <RouterContext.Consumer>
        {
          contextValue => {
            const { history, location } = contextValue;
            const { path, component } = this.props;
            const match = location.pathname === this.props.path;
            let routeProps = { history, location, match };
            if (match) {
              return React.createElement(component, routeProps);
            }
          }
        }
      </RouterContext.Consumer>
    )
  }
}

export default Route;