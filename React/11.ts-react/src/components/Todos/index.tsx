import React, { Component } from 'react';
import { ITodo } from '@/models';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import { connect } from 'react-redux';
import { ICombinedState, ITodosState } from '@/store/reducers';
import * as actions from '@/store/actions/todos';
import { RouteComponentProps } from 'react-router-dom';
import { StaticContext } from 'react-router';

interface IParams {}
export interface ILocationState {
  name: string;
}

type IProps = ITodosState & typeof actions & RouteComponentProps<IParams, StaticContext, ILocationState>;

class Todos extends Component<IProps> {
  render() {
    const { list, addTodo, location } = this.props;
    return (
      <div>
        <p>{location.state.name}</p>
        <TodoInput
          addTodo={addTodo}
        />
        <ul>
          {
            list.map(todo => (
              <TodoItem todo={todo} key={todo.id} />
            ))
          }
        </ul>
      </div>
    )
  }
}


const mapStateToProps = (state: ICombinedState): ITodosState => state.todos

export default connect(
  mapStateToProps,
  actions,
)(Todos);