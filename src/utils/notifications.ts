// Minimal notifications helper: requests permission and registers a basic service worker (if available).
export async function registerNotifications(){
  if(typeof window === 'undefined') return
  // Desktop (Electron) should not register a web service worker.
  if((window as any).wsDeviceStorage || window.location?.protocol === 'file:') return
  if('serviceWorker' in navigator){
    try{
      const baseUrl = (import.meta as any).env?.BASE_URL || '/'
      const swUrl = `${baseUrl}${baseUrl.endsWith('/') ? '' : '/'}sw.js`
      await navigator.serviceWorker.register(swUrl)
      console.log('Service worker registered')
    }catch(e){
      console.warn('Service worker registration failed', e)
    }
  }

  if('Notification' in window && Notification.permission !== 'granted'){
    try{
      await Notification.requestPermission()
    }catch(e){
      // ignore
    }
  }
}

export function showNotification(title:string, options?: NotificationOptions){
  if('Notification' in window && Notification.permission === 'granted'){
    if(navigator.serviceWorker && (navigator.serviceWorker.controller || navigator.serviceWorker.getRegistration)){
      navigator.serviceWorker.getRegistration().then(reg => {
        if(reg && reg.showNotification) reg.showNotification(title, options)
        else new Notification(title, options)
      })
    }else{
      new Notification(title, options)
    }
  }
}
