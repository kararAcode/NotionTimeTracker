import { useState, useEffect } from 'react';
import './App.css';
import Timer from './components/Timer';
import SelectMenu from './components/SelectMenu';

const App = () => {
  
  const timeStoppedHandler = (time) => {
    window.electron.sendMessage("time-stopped", {time});
    console.log('Time stopped');
  };

  const timePauseHandler = (time) => {
    window.electron.sendMessage("time-paused", {time});
    console.log('Time paused');
  };

  return (
    <div className="App">
      <Timer onTimeStopped={timeStoppedHandler} onTimePaused={timePauseHandler} />
    </div>
  );
};

export default App;
