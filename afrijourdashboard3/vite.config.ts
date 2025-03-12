
// import path from 'path';
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react-swc';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src'),
//     },
//   },
//   server: {
//     proxy: {
//       '/journal_api': {
//         target: 'http://198.211.110.243',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/journal_api/, ''),
//       },
//     },
//   },
//   build: {
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           vendor: ['react', 'react-dom'],
//         },
//       },
//     },
//     chunkSizeWarningLimit: 1000,
//     sourcemap: true,
//   },
// });



import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true, // Allow access from the local network (0.0.0.0)
    port: 5173, // Force Vite to use port 5173
    strictPort: true, // Prevent Vite from switching to another port if 5173 is in use
    // proxy: {
    //   '/journal_api': {
    //     target: 'http://198.211.110.243',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/journal_api/, ''),
    //   },
    // },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: true,
  },
});


