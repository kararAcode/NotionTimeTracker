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

  const handleTaskUpload = (task) => {
    window.electron.sendMessage("upload-task", { task });
  }
 
  if (loading) return <div>Loading...</div>

  return (
    <div className="App flex justify-center">
      <Timer tasks={tasks} onTaskUpload={handleTaskUpload}/>
    </div>
  );
};

export default App;
