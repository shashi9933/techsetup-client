import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    define: {
        'process.env.VITE_API_URL': JSON.stringify(process.env.NODE_ENV === 'production'
            ? 'https://appar-server.onrender.com'
            : 'http://localhost:5000'
        ),
        'process.env.VITE_CLIENT_URL': JSON.stringify(process.env.NODE_ENV === 'production'
            ? 'https://appar-client.vercel.app'
            : 'http://localhost:3000'
        )
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                secure: false,
            }
        },
        port: 3000
    }
});
