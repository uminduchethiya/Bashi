import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { mailPlugin } from './server/mailPlugin.ts'

export default defineConfig(({ mode }) => ({
  plugins: [react(), mailPlugin(mode)],
}))
