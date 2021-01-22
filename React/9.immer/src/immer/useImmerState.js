import { useState, useRef } from 'react';
import { toProxy, INTERNAL } from './core';

function useImmerState(baseState) {
  const [state, setState] = useState(baseState);
  const proxy = toProxy(baseState, () => {
    const {draftState} = draftRef.current[INTERNAL];
    setState({...draftState});
  })
  const draftRef = useRef(proxy);
  const updateDraft = (producer) => producer(draftRef.current);
  return [state, updateDraft];
}

export default useImmerState;