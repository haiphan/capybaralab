import { useState } from 'react';
import './App.css';
import Counter from './components/Counter';
import Wordle from './components/Wordle';

const [COUNTER, WORDLE] = [0, 1];

function App() {
  const [page, setpage] = useState<number>(COUNTER);
  const pageComponent = [<Counter/>, <Wordle/>][page];
  return (
    <div className="App">
      <div className="App-header">
        <button onClick={() => setpage(COUNTER)} >Counter App</button>
        <button onClick={() => setpage(WORDLE)}>Wordle</button>
        {pageComponent}
      </div>
    </div>
  );
}

export default App;
