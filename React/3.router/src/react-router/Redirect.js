import React from 'react'
import Lifecycle from './Lifecycle';
import RouterContext from './RouterContext';

function Redirect({ to }) {
  return (
    <RouterContext.Consumer>
      {
        contextValue => {
          const { history } = contextValue;
          return (
            <Lifecycle
              onMount={() => history.push(to)}
            />
          );
        }
      }
    </RouterContext.Consumer>
  );
}

export default Redirect;