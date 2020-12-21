import React from 'react';
import { connect } from 'react-redux';
import actions from '../store/actions/counter';

class Counter extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.number}</p>
        <button onClick={this.props.asyncAdd}>+</button>
        <button onClick={this.props.minus}>-</button>
        <button onClick={this.props.stop}>stop</button>
      </div>
    )
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, actions)(Counter);