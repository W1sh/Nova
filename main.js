// Modules to control application life and create native browser window
// jshint esversion: 6
const {app, BrowserWindow, globalShortcut} = require('electron');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });
    // and load the index.html of the app.
    mainWindow.setMenu(null)
    mainWindow.webContents.openDevTools();
    mainWindow.loadFile('index.html');
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}
app.on('ready', () => {
    createWindow();
    // Register a 'CommandOrControl+Y' shortcut listener.
    globalShortcut.register('CommandOrControl+R', () => {
        //app.relaunch({args: process.argv.slice(1).concat(['--relaunch'])});
        app.relaunch();
        app.exit(0);
    });
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});