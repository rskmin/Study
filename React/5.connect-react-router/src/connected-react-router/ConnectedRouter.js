import React from 'react';
import { Router } from 'react-router';
import { ReactReduxContext } from 'react-redux';

class ConnectedRouter extends React.Component {
  static contextType = ReactReduxContext
  constructor(props) {
    super(props);

    this.unlisten = props.history.listen(() => {
      this.context.store.dispatch({
        type: 'LOCATION/CHANGE',
        payload: {
          location: props.history.location,
          action: props.history.action,
        },
      });
    })
  }
  componentWillUnmount() {
    this.unlisten();
  }
  render() {
    const { history, children } = this.props;
    return (
      <Router history={history}>
        {children}
      </Router>
    )
  }
}

export default ConnectedRouter;