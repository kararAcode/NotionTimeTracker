import { useState } from 'react'

import './App.css'
import Timer from './components/Timer';

const App = () => {
    const timeStoppedHandler = () => {

      // eventually will send msg to server the time to upload to notion
      console.log('Time stopped');
    };


    const timePauseHandler = () => {

      // eventually will send msg to server the time to upload to notion
      console.log('Time paused');
    };

  return (
    <div className="App">
      <Timer onTimeStopped={timeStoppedHandler} onTimePaused={timePauseHandler}/>
    </div>
  );
};

export default App;
