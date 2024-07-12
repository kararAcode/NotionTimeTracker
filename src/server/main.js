const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const TrayGenerator = require('./TrayGenerator');

/** s
 * @var win: BrowserWindow | null = null;
 */
let win;

function createWindow() {
  win = new BrowserWindow({
    width: 400,
    height: 100,
    frame: false,
    resizable: false,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      
    },
    
  });

  win.loadURL('http://localhost:5173'); // React app URL
  win.webContents.openDevTools({ mode: 'detach' });


}

ipcMain.on('time-stopped', (event, arg) => {
  console.log('Time stopped:', arg);
});

ipcMain.on('time-paused', (event, arg) => {
  console.log('Time paused:', arg);
});

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
