const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const TrayGenerator = require('./TrayGenerator');
const notion = require('./notion');

/** s
 * @var win: BrowserWindow | null = null;
 */
let win;

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


}

app.whenReady().then(() => {
  createWindow();
  const Tray = new TrayGenerator(win);
  Tray.createTray();

  ipcMain.on('time-stopped', (event, arg) => {
    notion.setTaskTime(arg.task.id, arg.time);

  });
  
  ipcMain.on('time-paused', (event, arg) => {
    notion.setTaskTime(arg.task.id, arg.time);
  });


  ipcMain.on('fetch-tasks', async (event, arg) => {
    console.log("Fetch Tasks"); 
    const tasks = await notion.listAllItemsInDatabase(process.env.NOTION_DATABASE_ID);
    event.sender.send('fetch-tasks-reply', { tasks });
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
