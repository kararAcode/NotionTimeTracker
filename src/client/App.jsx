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
    <div className="App text-center p-5">
      <Timer onTimeStopped={timeStoppedHandler} onTimePaused={timePauseHandler} />
      <SelectMenu />
    </div>
  );
};

export default App;
