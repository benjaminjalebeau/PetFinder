import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        breedlist: resolve(__dirname, "src/breedsPage/index.html"),
        breedInfo: resolve(__dirname, "src/InfoPage/index.html")
      },
    },
  },
});
