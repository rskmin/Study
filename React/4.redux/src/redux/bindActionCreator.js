function bindActionCreator(actionCreator, dispatch) {
  return function (...args) {
    dispatch(actionCreator(...args));
  }
}
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }
  const bondedActionCreators = {};
  for (const key in actionCreators) {
    const actionCreator = actionCreators[key];
    bondedActionCreators[key] = bindActionCreators(actionCreator, dispatch);
  }
  return bondedActionCreators;
}

export default bindActionCreators;