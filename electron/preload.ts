import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('wsDeviceStorage', {
  getItem: (key: string): Promise<string | null> => ipcRenderer.invoke('ws-storage:getItem', key),
  setItem: (key: string, value: string): Promise<boolean> => ipcRenderer.invoke('ws-storage:setItem', key, value),
  removeItem: (key: string): Promise<boolean> => ipcRenderer.invoke('ws-storage:removeItem', key),
  clear: (): Promise<boolean> => ipcRenderer.invoke('ws-storage:clear'),
})

export {}
