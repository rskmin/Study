function createThunkMiddleware(extraArgument: any) {
  return (middlewareAPI: any) => (next: any) => (action: any) => {
    if (typeof action === 'function') {
      return action(middlewareAPI.dispatch, middlewareAPI.getState, extraArgument);
    }
    return next(action);
  };
}

const thunk: any = createThunkMiddleware(null);
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;