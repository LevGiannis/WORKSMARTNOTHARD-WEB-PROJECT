import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import fs from 'fs/promises'

type StorageFile = Record<string, string>

const STORAGE_FILE_NAME = 'worksmart-device-storage.json'

async function readStorageFile(): Promise<StorageFile> {
  const filePath = path.join(app.getPath('userData'), STORAGE_FILE_NAME)
  try {
    const raw = await fs.readFile(filePath, 'utf-8')
    const parsed = JSON.parse(raw) as unknown
    if (parsed && typeof parsed === 'object') return parsed as StorageFile
    return {}
  } catch {
    return {}
  }
}

async function writeStorageFile(next: StorageFile): Promise<void> {
  const filePath = path.join(app.getPath('userData'), STORAGE_FILE_NAME)
  await fs.mkdir(path.dirname(filePath), { recursive: true })
  await fs.writeFile(filePath, JSON.stringify(next), 'utf-8')
}

async function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  const devUrl = process.env.VITE_DEV_SERVER_URL
  if (devUrl) {
    await win.loadURL(devUrl)
    win.webContents.openDevTools({ mode: 'detach' })
  } else {
    await win.loadFile(path.join(app.getAppPath(), 'dist', 'index.html'))
  }
}

function registerIpcStorageHandlers() {
  ipcMain.handle('ws-storage:getItem', async (_event, key: string) => {
    const data = await readStorageFile()
    return Object.prototype.hasOwnProperty.call(data, key) ? data[key] : null
  })

  ipcMain.handle('ws-storage:setItem', async (_event, key: string, value: string) => {
    const data = await readStorageFile()
    data[key] = value
    await writeStorageFile(data)
    return true
  })

  ipcMain.handle('ws-storage:removeItem', async (_event, key: string) => {
    const data = await readStorageFile()
    delete data[key]
    await writeStorageFile(data)
    return true
  })

  ipcMain.handle('ws-storage:clear', async () => {
    await writeStorageFile({})
    return true
  })
}

app.whenReady().then(() => {
  registerIpcStorageHandlers()
  return createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    void createWindow()
  }
})
