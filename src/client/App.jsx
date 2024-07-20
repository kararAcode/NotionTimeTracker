import { useState, useEffect } from 'react';
import './App.css';
import Timer from './components/Timer';

const App = () => {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     window.electron.sendMessage("fetch-tasks");
     
     window.electron.onMessage("fetch-tasks-reply", (event) => {
      setTasks(event.tasks);
      setLoading(false);
     });
  }, []);
  
  const timeStoppedHandler = (data) => {
    window.electron.sendMessage("time-stopped", data);
    console.log('Time stopped');
  };

  const timePauseHandler = (data) => {
    window.electron.sendMessage("time-paused", data);
    console.log('Time paused');
  };

  if (loading) return <div>Loading...</div>

  return (
    <div className="App flex justify-center">
      <Timer tasks={tasks} onTimeStopped={timeStoppedHandler} onTimePaused={timePauseHandler} />
    </div>
  );
};

export default App;
