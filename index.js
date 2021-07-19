// eslint-disable-next-line @typescript-eslint/no-var-requires
const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.removeMenu();
  win.loadURL("https://getbootstrap.com/docs/4.0/examples/checkout/");
}

app.whenReady().then(() => {
  createWindow();
});
