'use strict'

import Store from "electron-store";
import {app, protocol, BrowserWindow, ipcMain} from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
import { initDown } from '@/utils/download'
import path from "path";

Store.initRenderer()

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

let win;
let resizeEvent;
async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    show: true,
    frame: false,
    backgroundColor: '#00000000',
    fullscreen: false,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  win.setIcon(path.join(__dirname, '../public/icon/icon.png'))

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  initDown(win)

  win.on('resize', () => {
    resizeEvent.send('windows-resize', win.isMaximized())
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

ipcMain.on('electron-store-get-data', (e, v) => {
})

ipcMain.on('windows-resize-event', (event)=>{
  resizeEvent = event.sender
})

ipcMain.on('windows-min', () => win.minimize())

ipcMain.on('windows-close', () => app.exit())

ipcMain.on('windows-middle', ()=>{
  if (win.isMaximized()){
    win.unmaximize()
  } else {
    win.maximize()
  }
})


ipcMain.on('login', (event) => {
  const loginWin = new BrowserWindow({
    width: 800,
    height: 800,
    resizable: false,
    minimizable: false,
    maximizable: false,
    webPreferences: {
      devTools: false
    }
  })

  loginWin.setMenu(null)
  loginWin.loadURL('https://natapp.cn/login')
  const content = loginWin.webContents
  content.session.clearStorageData().then(() => {})
  const cookies = []

  content.on('did-stop-loading', () => {
    if (content.getURL() === 'https://natapp.cn/login') {
      content.executeJavaScript(`document.getElementById('login').value = '15755574393';document.getElementById('password').value = '19980727lyh';document.getElementsByClassName('checkbox')[0].getElementsByTagName('input')[0].value = 'on';document.getElementsByClassName('btn btn-success btn-lg btn-block')[0].click()`, false, (e,r,b) => {
        console.log(e,r,b)
      })
    }
    if (content.getURL() === 'https://natapp.cn/member/dashborad') {
      const cookies_list = []
      content.session.cookies.get({url: 'https://natapp.cn'}).then(cookies => {
        cookies.forEach(item => {
          cookies_list.push(item.name + '=' + item.value)
        })
        console.log(cookies_list.join(';'))
        event.sender.send('afterLogin', cookies_list)
        loginWin.destroy()
      })
    }
  })
})

ipcMain.on('changeAddress', (event, cookies_my) => {
  const loginWin = new BrowserWindow({
    width: 800,
    height: 800,
    resizable: false,
    minimizable: false,
    maximizable: false,
    webPreferences: {
      devTools: false
    }
  })

  loginWin.setMenu(null)
  console.log('cookie: ' + cookies_my + '\n')
  loginWin.loadURL('https://natapp.cn/tunnel/edit/x16wonqzpl', {
    extraHeaders: 'cookie: ' + cookies_my + '\n'
  })
  const content = loginWin.webContents
  content.session.clearStorageData().then(() => {})

  content.on('did-stop-loading', () => {
    // content.executeJavaScript(`document.getElementById('login').value = '15755574393';document.getElementById('password').value = '19980727lyh';document.getElementsByClassName('checkbox')[0].getElementsByTagName('input')[0].value = 'on';document.getElementsByClassName('btn btn-success btn-lg btn-block')[0].click()`, false, (e,r,b) => {
    //   console.log(e,r,b)
    // })
  })
})
