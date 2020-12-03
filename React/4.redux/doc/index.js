import { createStore } from '../src/redux';

const ADD = 'ADD';
const MINUS = 'MINUS';
function reducer(state = { number: 0 }, action) {
  switch (action.type) {
    case ADD:
    return { number: state.number + 1 };
    case MINUS:
    return { number: state.number - 1 };
    default:
      return state;
  }
}
const store = createStore(reducer);

const counter = document.getElementById('counter');
const addBtn = document.getElementById('add');
const minusBtn = document.getElementById('minus');
addBtn.addEventListener('click', () => {
  store.dispatch({ type: ADD });
});
minusBtn.addEventListener('click', () => {
  store.dispatch({ type: MINUS });
});

function render() {
  counter.innerHTML = store.getState().number;
}

let unsubscribe = store.subscribe(render);

render();