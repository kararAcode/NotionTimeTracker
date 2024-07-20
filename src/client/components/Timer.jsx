import React, { useState, useEffect } from "react";
import ControlButton from "./ControlButton";
import SelectMenu from './SelectMenu';

const Timer = (props) => {
    const [time, setTime] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const [selectedTask, setSelectedTask] = useState(null);
    useEffect(() => {
        let timer;
        if (isStarted &&!isPaused) {
            timer = setInterval(() => setTime(prevTime => prevTime + 1), 1000);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isStarted, isPaused]);

    const handleStartStop = () => {
        if (isStarted) {
            setTime(0);
            props.onTimeStopped({ time, task: selectedTask  });
        }
        setIsStarted(!isStarted);
        
    };

    const handlePausePlay = () => {
        if (!isPaused) {
            props.onTimePaused({ time, task: selectedTask  });
        }

        setIsPaused(!isPaused);
    };

    const handleReset = () => {
        setIsStarted(false);
        setIsPaused(false);
        setTime(0);
    };

    const handleTaskSelected = (task) => {

        setTime(task.time);
        setSelectedTask(task)
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
                <ControlButton disabled={!selectedTask} text={isStarted ? "Stop": "Start"} onClick={handleStartStop} />
                <ControlButton disabled={!isStarted} text={isPaused ? "Play": "Pause"} onClick={handlePausePlay} />     
                <ControlButton disabled={!isStarted} text="Reset" onClick={handleReset} />
            </div>
            <SelectMenu onTaskSelected={handleTaskSelected} disabled={isStarted} selectedTask={selectedTask} tasks={props.tasks}/>
        </div>
    );
}

export default Timer;
