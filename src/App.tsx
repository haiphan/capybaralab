import React, { useState } from 'react';
import './App.css';

const DEFAULT_INITIAL_COUNT = 0;
const initialCount = process.env.REACT_APP_INITIAL_COUNT
    ? parseInt(process.env.REACT_APP_INITIAL_COUNT, 10)
    : DEFAULT_INITIAL_COUNT;

function App() {
  const [count, setCount] = useState(initialCount);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Counter: {count}</p>
        <button onClick={increment}>Increment</button>
      </header>
    </div>
  );
}

export default App;
