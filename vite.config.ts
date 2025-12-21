import { defineConfig } from 'vite'

const PAGES_BASE = '/worksmartnothard-web-project/'

export default defineConfig(({ command, mode }) => {
  // Use repo sub-path only for production build (GitHub Pages).
  // Keep dev/preview on '/'.
  const isBuild = command === 'build'
  const isPages = mode === 'production' || process.env.GITHUB_ACTIONS === 'true'
  const isElectron = process.env.ELECTRON === 'true'

  return {
    base: isBuild && isElectron ? './' : isBuild && isPages ? PAGES_BASE : '/',
  }
})
