import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dotenv from "dotenv";
dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: process.env.PROXY_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        timeout:6000
      },
    },
  },
});
