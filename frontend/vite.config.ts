import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": path.resolve("./src/assets"),
      "@services": path.resolve("./src/services"),
      "@components": path.resolve("./src/components"),
      "@pages": path.resolve("./src/pages"),
      "@contexts": path.resolve("./src/contexts"),
      "@models": path.resolve("./src/models"),
    },
  },
})
