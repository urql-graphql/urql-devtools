import { app, BrowserWindow } from "electron";
import Websocket from "ws";
import { debug } from "../util/debug";

const port = Number(process.env.port || 7700);
const socket = new Websocket.Server({ port });

socket.on("connection", (ws) => {
  debug("WebSocket connection established");
  ws.on("message", (data) => {
    debug("WebSocket message:", data);
  });
});

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  win.loadFile(`./shell/panel.html`);
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);
