import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/

export default defineConfig((props) => {
  const env = loadEnv(props.mode, process.cwd(), 'VITE');
  const envWithProcessPrefix = {
    'process.env': `${JSON.stringify(env)}`,
  };

  return {
    plugins: [react(), svgr()],
    define: envWithProcessPrefix,
  };
});
