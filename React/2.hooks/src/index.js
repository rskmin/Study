import React from 'react';
import ReactDOM from 'react-dom';

let CounterContext = React.createContext();

let hookStates = [];
let hookIndex = 0;

function useReducer(reducer, initialState, init) {
  hookStates[hookIndex] = hookStates[hookIndex] || (init ? init(initialState) : initialState);
  let currentIndex = hookIndex;
  function dispatch(action) {
    hookStates[currentIndex] = reducer ? reducer(hookStates[currentIndex], action) : action;
    render();
  }
  return [hookStates[hookIndex++], dispatch];
}

function useState(initialState) {
  return useReducer(null, initialState)
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return {number: state.number+1};
    case 'MINUS':
      return {number: state.number-1}
    default:
      return state;
  }
}
function init(initialState) {
  return {number: initialState};
}

function useContext(context) {
  return context._currentValue;
}

function Counter() {
  let {state, dispatch} = useContext(CounterContext);
  return (
    <div>
      <p>number: {state.number}</p>
      <button onClick={() => dispatch({type: 'ADD'})}>+number</button>
    </div>
  );
}

function App() {
  let [state, dispatch] = useReducer(reducer, 0, init)
  let value = {state, dispatch};
  return (
    <CounterContext.Provider value={value}>
      <Counter />
    </CounterContext.Provider>
  )
}

function render() {
  hookIndex = 0;
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
}

render();