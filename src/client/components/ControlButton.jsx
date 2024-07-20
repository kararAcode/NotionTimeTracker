import React from "react";
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

const ControlButton = (props) => {
    return (
        <button 
        onClick={props.onClick} 
        type="button" 
        className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none 
            ${props.disabled 
            ? 'bg-gray-400 cursor-not-allowed btn-disabled' 
            : 'bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800'}`}
        disabled={props.disabled}
        >
        {props.text}
        </button>


    );
}

export default ControlButton;
