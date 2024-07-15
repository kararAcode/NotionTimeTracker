import React, { useState, useEffect } from "react";
import ControlButton from "./ControlButton";
import SelectMenu from './SelectMenu';

const Timer = (props) => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setInterval(() => setTime(prevTime => prevTime + 1), 1000);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isRunning]);

    const handleStart = () => {
        if (isRunning) {
            props.onTimeStopped(time);
            setTime(0);
        }
        setIsRunning(!isRunning);
    };

    const handlePause = () => {
        if (isRunning) {
            props.onTimePaused(time);
        }
        setIsRunning(!isRunning);    
    };

    const handleReset = () => {
        setTime(0);
        setIsRunning(false);
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
                <ControlButton text={isRunning ? "Stop": "Start"} onClick={handleStart} />
                <ControlButton text={isRunning ? "Pause": "Play"} onClick={handlePause} />     
                <ControlButton text="Reset" onClick={handleReset} />
            </div>
            <SelectMenu />
        </div>
    );
}

export default Timer;
