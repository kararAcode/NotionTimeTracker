import React, { useState, useEffect } from "react";
import ControlButton from "./ControlButton";
import SelectMenu from './SelectMenu';

const Timer = (props) => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setInterval(() => setTime(prevTime => prevTime + 1), 1000);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isRunning]);

   

    const handleTaskSelected = (task) => {
        setTime(task.time);
        setSelectedTask(task)
    };

    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
    };

    const handlePlayBack = () => {
        setIsRunning(!isRunning);
    }

    const handleUpload = () => {
      setSelectedTask((prevTask) => {
        const updatedTask = {...prevTask, time };

        props.onTaskUpload(updatedTask);

        return updatedTask;
      })
    };
    

    const formattedTime = () => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };


    return (
        <div className="flex flex-col items-center space-y-4 w-full max-w-md mt-4">
            <h1 className="text-4xl font-bold">
                {formattedTime()}
            </h1>
            <div className="flex space-x-4">
                <ControlButton disabled={!selectedTask || isRunning} text="Upload" onClick={handleUpload} />
                <ControlButton disabled={!selectedTask} text={isRunning ? "Pause": "Play"} onClick={handlePlayBack} />     
                <ControlButton disabled={!selectedTask} text="Reset" onClick={handleReset} />
            </div>
            <SelectMenu onTaskSelected={handleTaskSelected} disabled={isRunning} selectedTask={selectedTask} tasks={props.tasks}/>
        </div>
    );
}

export default Timer;
