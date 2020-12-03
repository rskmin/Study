import React, { useMemo, useReducer, useLayoutEffect } from 'react'
import ReactReduxContext from './ReactReduxContext';
import { bindActionCreators } from '../redux';

function connect(mapStateToProps, mapDispatchToProps) {
  return function (OldComponent) {
    return function (props) {
      const { store } = React.useContext(ReactReduxContext);
      const { getState, dispatch, subscribe } = store;
      const prevState = getState();
      const stateProps = useMemo(() => mapStateToProps(prevState), [prevState]);
      const dispatchProps = useMemo(() => {
        let dispatchProps;
        if (typeof mapDispatchToProps == 'object') {
          dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
        } else if (typeof mapDispatchToProps === 'function') {
          dispatchProps = mapDispatchToProps(dispatch, props);
        } else {
          dispatchProps = { dispatch };
        }
        return dispatchProps;
      }, [dispatch, props]);
      const [, forceUpdate] = useReducer(x => x+1, 0);
      useLayoutEffect(() => {
        return subscribe(() => forceUpdate(x => x + 1));
      }, [subscribe]);
      return <OldComponent {...props} {...stateProps} {...dispatchProps} />
    }
  }
}

export default connect;