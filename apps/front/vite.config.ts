import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  console.log("env", env);
  
  return{
	define: {
      __APP_ENV__: env.APP_ENV
    },
	server: {
		host: '0.0.0.0',
    port: parseInt(process.env.PORT, 10) || 3000,
    },
  preview: {
		host: '0.0.0.0',
    port: parseInt(process.env.PORT, 10) || 3000,
    },
	plugins: [react()],
}});

