import { useState } from 'react';

const DEFAULT_INITIAL_COUNT = 0;
const initialCount = process.env.REACT_APP_INITIAL_COUNT
    ? parseInt(process.env.REACT_APP_INITIAL_COUNT, 10)
    : DEFAULT_INITIAL_COUNT;

function Counter() {
    const [count, setCount] = useState(initialCount);
    const increment = () => {
        setCount(count + 1);
    };
    return (
        <div>
            <p>Counter: {count}</p>
            <button onClick={increment}>Increment</button>
        </div>
    );
}

export default Counter;