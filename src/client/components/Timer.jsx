import React from "react";
import { useState, useEffect } from "react";

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
        <div>
            <h1>{formattedTime()}</h1>
            <button onClick={handleStart}>{isRunning ? "Stop": "Start"}</button>
            <button onClick={handlePause}>{isRunning ? "Pause": "Play"}</button>
            <button onClick={handleReset}>Reset</button>
        </div>
    );

}

export default Timer;