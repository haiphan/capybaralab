import { useState } from 'react';
import './App.css';
import Counter from './components/Counter';
import Wordle from './components/Wordle';
import Electricity from './components/Electricity';
import Temperature from './components/Temperature';

const [COUNTER, WORDLE, ELECTRICITY, TEMP] = [0, 1, 2, 3];

function App() {
  const [page, setpage] = useState<number>(COUNTER);
  const pageComponent = [<Counter/>, <Wordle/>, <Electricity/>, <Temperature />][page];
  return (
    <div className="App">
      <div className="App-header">
        <button onClick={() => setpage(COUNTER)} >Counter App</button>
        <button onClick={() => setpage(WORDLE)}>Wordle</button>
        <button onClick={() => setpage(ELECTRICITY)}>Electrity</button>
        <button onClick={() => setpage(TEMP)}>Temperature</button>
        {pageComponent}
      </div>
    </div>
  );
}

export default App;
