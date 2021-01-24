import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ICombinedState, ICounterState } from '@/store/reducers';
import * as actions from '@/store/actions/counter';
import { RouteComponentProps } from 'react-router-dom';
import { LocationDescriptorObject } from 'history';
import { ILocationState } from './Todos';

interface IParams {
  name: string;
}

type IProps = ICounterState & typeof actions & RouteComponentProps<IParams>;

class Counter extends Component<IProps> {
  render() {
    const {
      count,
      add,
      minus,
      match: { params },
      go,
      asyncAdd
    } = this.props;
    const path: LocationDescriptorObject<ILocationState> = {
      pathname: '/todos',
      state: { name: 'todosName' },
    };
    return (
      <div>
        <p>{params.name}</p>
        <p>{count}</p>
        <button onClick={add}>+</button>
        <button onClick={asyncAdd}>async+</button>
        <button onClick={minus}>-</button>
        <button onClick={() => go(path)}>/todos</button>
      </div>
    );
  }
}

const mapStateToProps = (state: ICombinedState): ICounterState => state.counter;

export default connect(mapStateToProps, actions)(Counter);
