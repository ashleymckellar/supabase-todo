import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    define: {
      'process.env': {
        SUPABASE_URL: JSON.stringify(env.VITE_SUPABASE_URL),
        SUPABASE_ANON_KEY: JSON.stringify(env.VITE_SUPABASE_ANON_KEY)
      }
    },
    plugins: [react()],
  }
});
