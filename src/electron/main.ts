import { app, BrowserWindow, ipcMain } from "electron";
import Websocket from "ws";
import { debug } from "../util/debug";

let windows: BrowserWindow[] = [];

const createWebsocketServer = () => {
  debug("Creating websocket server");
  const port = Number(process.env.port || 7700);
  const socket = new Websocket.Server({ port });

  socket.on("connection", (ws) => {
    debug("WebSocket connection established");

    // Forward messages from the extension to the exchange
    ipcMain.on("message", (event, message) => {
      debug("Extension message:", message);
      ws.send(JSON.stringify(message));
    });

    // Forward messages from the exchange to the extension
    ws.on("message", (data) => {
      if (typeof data !== "string") {
        console.warn("Unsupported webSocket message:", data);
        return;
      }

      debug("WebSocket message:", JSON.parse(data));
      try {
        windows.forEach((w) => w.webContents.send("message", JSON.parse(data)));
      } catch (err) {}
    });

    ws.on("close", () => {
      windows.forEach((w) =>
        w.webContents.send("message", {
          type: "connection-disconnect",
          source: "exchange",
        })
      );
    });
  });
};

const createWindow = () => {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
  });
  windows = [...windows, win];

  // and load the index.html of the app.
  win.loadFile(`./shell/panel.html`);
  process.env.NODE_ENV !== "production" && win.webContents.openDevTools();
};

app.allowRendererProcessReuse = true;
app.whenReady().then(() => {
  createWebsocketServer();
  createWindow();
});
