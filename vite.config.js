// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 3000,
    proxy:{
      '/api': {
        target: 'http://127.0.0.1:5000', // Ganti dengan URL backend Anda, misalnya ,  // URL backend Anda
        changeOrigin: true,               // Menyesuaikan header Host
        secure: false,                    // Nonaktifkan ini jika backend menggunakan self-signed HTTPS
    } 
  }
}});
