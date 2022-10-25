import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  return {
    plugins: [react(), tsconfigPaths()],
    define: {
      "process.env": process.env,
    },
	server: {
		host: '0.0.0.0',
    port: parseInt(env.PORT, 10) || 3000,
    },
  preview: {
		host: '0.0.0.0',
    port: parseInt(env.PORT, 10) || 3000,
    },
}});

