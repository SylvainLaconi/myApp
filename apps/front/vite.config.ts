import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  return{
	define: {
      "process.env": process.env,
    },
	server: {
		host: '0.0.0.0',
      port: parseInt(process.env.PORT, 10) || 3000,
    },
    preview: {
      port: parseInt(process.env.PORT, 10) || 3000,
    },
	plugins: [react()],
}});

