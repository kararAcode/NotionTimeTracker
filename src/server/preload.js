const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    /**
     * Sends a message to the main process via a specified channel.
     * 
     * @param {string} channel - The channel through which the message is sent.
     * @param {*} data - The data to be sent to the main process.
     */
    sendMessage: (channel, data) => {
        ipcRenderer.send(channel, data);
    },
    /**
     * Listens for messages from the main process on a specified channel.
     * 
     * @param {string} channel - The channel to listen on for messages.
     * @param {function} func - The callback function to be called when a message is received. The function receives the message arguments.
     */
    onMessage: (channel, func) => {
        ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
});