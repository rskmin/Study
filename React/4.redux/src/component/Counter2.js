import React from 'react';
import * as actionTypes from '../store/action-types';
import { useSelector, useDispatch } from '../react-redux'

function Counter2(props) {
  let state = useSelector(state => state.counter2);
  let dispatch = useDispatch();
  return (
    <div>
      <p>{state.number}</p>
      <button onClick={() => dispatch({ type: actionTypes.ADD2 })}>+</button>
      <button onClick={ () => dispatch({ type: actionTypes.MINUS2 }) }>-</button>
    </div>
  )
}

// export class Counter2 extends Component {
//   render() {
//     return (
//       <div>
//         <p>{}</p>
//         <button onClick={}>+</button>
//         <button onClick={}>-</button>
//       </div>
//     )
//   }
// }

export default Counter2;
