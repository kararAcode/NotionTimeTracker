const { app, BrowserWindow } = require('electron');
const path = require('path');
const TrayGenerator = require('./TrayGenerator');


let win;
function createWindow() {
  win = new BrowserWindow({
    width: 400,
    height: 100,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadURL('http://localhost:5173'); // React app URL
}

app.whenReady().then(() => {
  createWindow();
  const Tray = new TrayGenerator(win);
  Tray.createTray();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
      Tray.createTray();

    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
