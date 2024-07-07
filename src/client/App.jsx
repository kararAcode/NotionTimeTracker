import { useState } from 'react'

import './App.css'
import Timer from './components/Timer';

const App = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  return (
    <div className="App">
      <Timer/>
    </div>
  );
};

export default App;
