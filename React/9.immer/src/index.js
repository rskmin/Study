import { render } from '@testing-library/react';
import { useImmerState } from './immer';
import React from 'react';
import ReactDOM from 'react-dom'


let id = 1;
function Todos() {
  const [todos, setTodos] = useImmerState({
    list: []
  });
  const addTodo = () => {
    setTodos(draft => {
      draft.list.push(id++);
    })
  }
  return (
    <>
      <button onClick={addTodo}>增加</button>
      <ul>
        {
          todos.list.map((item, index) => (<li key={index}>{item}</li>))
        }
      </ul>
    </>
  )
}

ReactDOM.render(<Todos/>,
  document.getElementById('root'));