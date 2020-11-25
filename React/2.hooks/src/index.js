import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function useAnimation(baseClassName) {
  let [className, setClassName] = useState(baseClassName);
  function start() {
    if (className === baseClassName) {
      setClassName(`${baseClassName}-bigger`);
    } else {
      setClassName(baseClassName);
    }
  }
  return [className, start];
}

function App() {
  const [className, start] = useAnimation('circle');
  return (
    <div>
      <button onClick={start}>begin bigger</button>
      <div className={className}></div>
    </div>
  );
}

function render() {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
}

render();