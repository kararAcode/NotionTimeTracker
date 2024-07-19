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
    console.log('Time stopped:', arg);
  });
  
  ipcMain.on('time-paused', (event, arg) => {
    console.log('Time paused:', arg);
  });
  
  ipcMain.on('fetch-tasks', (event, arg) => {
    console.log("Fetch Tasks"); 
    const tasks = [

      {
        id: 1,
        name: 'Design Meeting',
        description: 'Discuss the new project design',
        icon: 'https://super.so/icon/dark/activity.svg',
      },
      {
        id: 2,
        name: 'Code Review',
        description: 'Review the latest code changes',
        icon: 'https://super.so/icon/dark/activity.svg',
      },
      {
        id: 3,
        name: 'Write Documentation',
        description: 'Document the new API endpoints',
        icon: 'https://super.so/icon/dark/activity.svg',
      },
      {
        id: 4,
        name: 'Team Standup',
        description: 'Daily team standup meeting',
        icon: 'https://super.so/icon/dark/activity.svg',
      },
      {
        id: 5,
        name: 'Client Call',
        description: 'Call with the client to discuss requirements',
        icon: 'https://super.so/icon/dark/activity.svg',
      },
      {
        id: 6,
        name: 'Bug Fixing',
        description: 'Fix bugs reported by the QA team',
        icon: 'https://super.so/icon/dark/activity.svg',
      },
      {
        id: 7,
        name: 'Feature Implementation',
        description: 'Implement the new feature for the project',
        icon: 'https://super.so/icon/dark/activity.svg',
      },
      {
        id: 8,
        name: 'Deployment',
        description: 'Deploy the latest build to production',
        icon: 'https://super.so/icon/dark/activity.svg',
      },
      {
        id: 9,
        name: 'Code Refactoring',
        description: 'Refactor the existing codebase for better performance',
        icon: 'https://super.so/icon/dark/activity.svg',
      },
      {
        id: 10,
        name: 'Performance Testing',
        description: 'Test the application for performance issues',
        icon: 'https://super.so/icon/dark/activity.svg',
      },
    ];
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
