function connectRouter(history) {
  let initialState = {
    action: history.action,
    location: history.location,
  }
  return function (state = initialState, action) {
    if (action.type === 'LOCATION/CHANGE') {
      return {...state, ...action.payload};
    } else {
      return state;
    }
  }
}

export default connectRouter;