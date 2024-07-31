const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const TrayGenerator = require('./TrayGenerator');
const notion = require('./notion');
const AutoUpdater = require('./autoUpdater');

/** 
 * @var win: BrowserWindow | null = null;
 */
let win;
let updater;


function createWindow() {
  win = new BrowserWindow({
    width: 400,
    height: 400,
    frame: false,
    resizable: false,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      
    },
    
  });

  win.loadURL('http://localhost:5173'); // React app URL
  win.webContents.openDevTools({ mode: 'detach' });

  updater = new AutoUpdater(win);
  updater.checkForUpdates();
  
}

app.whenReady().then(() => {
  createWindow();
  const Tray = new TrayGenerator(win);
  Tray.createTray();

  

  ipcMain.on('fetch-tasks', async (event, arg) => {
    const tasks = await notion.listAllItemsInDatabase(process.env.NOTION_DATABASE_ID);
    event.sender.send('fetch-tasks-reply', { tasks });
  });

  ipcMain.on('upload-task', async (event, { task }) => {
    await notion.setTaskTime(task.id, task.time);
  });
  

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
