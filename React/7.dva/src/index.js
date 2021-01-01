import React from 'react';
import dva, { connect } from './dva';
import { Route, Link, routerRedux } from './dva/router';
let ConnectedRouter = routerRedux.ConnectedRouter;

const delay = ms => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

const app = dva();
app.model({
  namespace: 'counter1',
  state: { number: 0 },
  reducers: {
    add(state) {
      return { number: state.number + 1 };
    },
    minus(state) {
      return { number: state.number - 1 };
    },
  },
  effects: {
    *asyncAdd(action, { call, put }) {
      yield call(delay, 1000);
      yield put({ type: 'add' });
    },
    *asyncMinus(action, { call, put }) {
      yield call(delay, 1000);
      yield put({ type: 'minus' });
    },
    *goTo({ to }, { call, put }) {
      yield put(routerRedux.push(to));
    },
  },
});

app.model({
  namespace: 'counter2',
  state: { number: 0 },
  reducers: {
    add(state) {
      return { number: state.number + 1 };
    },
    minus(state) {
      return { number: state.number - 1 };
    }
  },
  effects: {
    *asyncAdd(action, { call, put }) {
      yield call(delay, 1000);
      yield put({ type: 'add' });
    },
    *asyncMinus(action, { call, put }) {
      yield call(delay, 1000);
      yield put({ type: 'minus' });
    },
  },
});

function Counter1(props) {
  return (
    <div>
      <p>{props.number}</p>
      <button onClick={() => props.dispatch({ type: 'counter1/add' })}>+</button>
      <button onClick={() => props.dispatch({ type: 'counter1/asyncAdd' })}>async+</button>
      <button onClick={() => props.dispatch({ type: 'counter1/asyncMinus' })}>async-</button>
      <button onClick={() => props.dispatch({ type: 'counter1/goTo', to: '/counter2' })}>goTo counter2</button>
    </div>
  )
}

function Counter2(props) {
  return (
    <div>
      <p>{props.number}</p>
      <button onClick={() => props.dispatch({ type: 'counter2/add' })}>+</button>
      <button onClick={() => props.dispatch({ type: 'counter2/asyncAdd' })}>async+</button>
      <button onClick={() => props.dispatch({ type: 'counter2/asyncMinus' })}>async-</button>
    </div>
  )
}

let ConnectedCounter1 = connect(
  state => state.counter1
)(Counter1);

let ConnectedCounter2 = connect(
  state => state.counter2
)(Counter2);

app.router((api) => (
    <ConnectedRouter history={api.history} >
      <>
        <ul>
          <li><Link to="/counter1">counter1</Link></li>
          <li><Link to="/counter2">counter2</Link></li>
        </ul>
        <Route path="/counter1" component={ConnectedCounter1} />
        <Route path="/counter2" component={ConnectedCounter2} />
      </>
    </ConnectedRouter>
));

app.start('#root');