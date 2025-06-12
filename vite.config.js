import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
   plugins: [react()],
   //base: '/Credixpress_Odontoamiga_Front/',
   //base: 'credixpress_odontoamiga'
})

