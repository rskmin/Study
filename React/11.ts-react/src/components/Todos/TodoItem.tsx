import React from 'react';
import { ITodo } from '@/models';

interface IProps {
  todo: ITodo;
}

const todoItemStyle = {
  color: 'red',
  background: 'green',
};

const TodoItem: React.FC<IProps> = (props) => (<li style={todoItemStyle}>{props.todo.text}</li>);

TodoItem.defaultProps = {};
export default TodoItem;