import { useContext, useLayoutEffect, useReducer } from 'react';
import ReactReduxContext from '../ReactReduxContext';

const equalityFn = (a, b) => a === b;
function useSelectorWithStore(selector, equalityFn, store, subscription) {
  let [, forceRender] = useReducer(x => x + 1, 0);
  let storeState = store.getState();
  let selectedState = selector(storeState);
  useLayoutEffect(() => {
    subscription.subscribe(forceRender);
  });
  return selectedState;
}

function useSelector(selector) {
  const { store, subscription } = useContext(ReactReduxContext);
  const selectedState = useSelectorWithStore(
    selector, equalityFn, store, subscription
  );
  return selectedState;
}

export default useSelector;