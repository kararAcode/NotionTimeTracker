import { useState , useEffect} from 'react'

import './App.css'
import Timer from './components/Timer';

const App = () => {
  

  const timeStoppedHandler = (time) => {

    // eventually will send msg to server the time to upload to notion
    window.electron.sendMessage("time-stopped", {time})
    console.log('Time stopped');
  };


  const timePauseHandler = (time) => {

    // eventually will send msg to server the time to upload to notion
    window.electron.sendMessage("time-paused", {time})
    console.log('Time paused');
  };

  return (
    <div className="App">
      <Timer onTimeStopped={timeStoppedHandler} onTimePaused={timePauseHandler}/>
    </div>
  );
};

export default App;
