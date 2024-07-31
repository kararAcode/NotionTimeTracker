const { autoUpdater } = require('electron-updater');
const log = require('electron-log');

class AutoUpdater {
  constructor(mainWindow) {
    this.mainWindow = mainWindow;

    // Set up logging
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.logger.transports.file.level = 'info';

    // Configure autoUpdater
    autoUpdater.autoDownload = false;
    autoUpdater.autoInstallOnAppQuit = true;

    // Attach event listeners
    this.attachEventListeners();
  }

  attachEventListeners() {
    autoUpdater.on('checking-for-update', () => {
      log.info('Checking for updates...');
      this.sendToWindow('message', 'Checking for updates...');
    });

    autoUpdater.on('update-available', (info) => {
      log.info('Update available:', info);
      this.sendToWindow('message', `Update available. Current version ${this.getAppVersion()}`);
      autoUpdater.downloadUpdate().then((downloadPath) => {
        log.info(`Update downloaded to ${downloadPath}`);
        this.sendToWindow('message', `Update downloaded to ${downloadPath}`);
      });
    });

    autoUpdater.on('update-not-available', (info) => {
      log.info('No update available:', info);
      this.sendToWindow('message', `No update available. Current version ${this.getAppVersion()}`);
    });

    autoUpdater.on('error', (error) => {
      log.error('Error in auto-updater:', error);
      this.sendToWindow('message', `Error in auto-updater: ${error}`);
    });

    autoUpdater.on('download-progress', (progressObj) => {
      let log_message = `Download speed: ${progressObj.bytesPerSecond}`;
      log_message = `${log_message} - Downloaded ${progressObj.percent}% (${progressObj.transferred}/${progressObj.total})`;
      log.info(log_message);
      this.sendToWindow('message', log_message);
    });

    autoUpdater.on('update-downloaded', (info) => {
      log.info('Update downloaded:', info);
      this.sendToWindow('message', `Update downloaded. Current version ${this.getAppVersion()}`);
      autoUpdater.quitAndInstall();
    });
  }

  checkForUpdates() {
    log.info('App is ready, checking for updates...');
    autoUpdater.checkForUpdates();
    this.sendToWindow('message', `Checking for updates. Current version ${this.getAppVersion()}`);
  }

  getAppVersion() {
    return require('electron').app.getVersion();
  }

  sendToWindow(channel, message) {
    if (this.mainWindow) {
      this.mainWindow.webContents.send(channel, message);
    }
  }
}

module.exports = AutoUpdater;
