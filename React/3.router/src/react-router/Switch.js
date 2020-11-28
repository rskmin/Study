import React, { Component } from 'react'
import RouterContext from './RouterContext';
import matchPath from './matchPath';

export class Switch extends Component {
  static contextType = RouterContext
  render() {
    const { location } = this.context;
    let { children } = this.props;
    children = Array.isArray(children) ? children : [children];
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (React.isValidElement(child)) {
        let match = matchPath(location.pathname, child.props);
        if (match) return React.cloneElement(child, {
          ...child.props,
          computedMatch: match,
        });
      }
    }
    return null;
  }
}

export default Switch;
