import React, { Component } from 'react';
import { connect } from '../react-redux';
import actions from '../store/actions/counter1';

export class Counter1 extends Component {
  render() {
    const { number, add, minus, promiseAdd, thunkAdd } = this.props;
    return (
      <div>
        <p>{number}</p>
        <button onClick={add}>+</button>
        <button onClick={promiseAdd}>+</button>
        <button onClick={thunkAdd}>+</button>
        <button onClick={minus}>-</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state.counter1;
}

export default connect(
  mapStateToProps,
  actions,
)(Counter1);
