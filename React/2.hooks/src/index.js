import React from 'react';
import ReactDOM from 'react-dom';


let hookStates = [];
let hookIndex = 0;

function useRef() {
  console.log(hookIndex)
  hookStates[hookIndex] = hookStates[hookIndex] || {current: null};
  return hookStates[hookIndex++];
}

function Counter() {
  let [number, setNumber] = React.useState(0);
  const lastNumberRef = useRef();
  let alertNumber = () => {
    setTimeout(() => {
      alert(lastNumberRef.current)
    }, 3000);
  };
  React.useEffect(() => {
    lastNumberRef.current = number;
  });
  return (
    <div>
      <p>{number}</p>
      <button onClick={() => {
        setNumber(number => number + 1)
      }
      }>+</button>
      <button onClick={alertNumber}>alert</button>
    </div>
  )
}

function render() {
  hookIndex = 0;
  ReactDOM.render(
    <Counter />,
    document.getElementById('root')
  );
}

render();