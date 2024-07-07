const { Tray, Menu, BrowserWindow } = require("electron");
const path = require("path");

class TrayGenerator {
    /**
     * 
     * @param {BrowserWindow} win BrowserWindow created by electron
     */
    constructor(win) {
        this.tray = null;
        this.win = win;
    }

    getWindowPosition = () => {
        const windowBounds = this.win.getBounds();
        const trayBounds = this.tray.getBounds();
        const x = Math.round(
          trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2
        );
        const y = Math.round(trayBounds.y + trayBounds.height);
        return { x, y };
      };


    showWindow() {
        let position = this.getWindowPosition();

        this.win.setPosition(position.x, position.y, false);
        this.win.show();
        this.win.setVisibleOnAllWorkspaces(true);
        this.win.focus();
        this.win.setVisibleOnAllWorkspaces(false)

    }

    toggleWindow() {
        if (this.win.isVisible()) {
            this.win.hide();
        }

        else {
            this.showWindow();
        }
    }

   
    createTray() {
        this.tray = new Tray(path.join(__dirname, "../assets/timeIcon.png"));
        this.tray.setIgnoreDoubleClickEvents(true);
        this.tray.on("click", this.toggleWindow.bind(this));
    }
}

module.exports = TrayGenerator;