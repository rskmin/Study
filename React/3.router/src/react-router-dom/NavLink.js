import React from 'react';
import { __RouterContext as RouterContext, Route } from '../react-router';
import { Link } from '../react-router-dom';

function NavLink(props) {
  return (
    <Route path={typeof props.to === 'object' ? props.to.pathname : props.to} children={(routeProps) => {
      let style = {};
      if (routeProps.match) {
        style.backgroundColor = 'red';
        style.color = 'green';
      }
      return <Link {...props} {...routeProps} style={style}>{props.children}</Link>;
    }} />
  )
}

export default NavLink;
