import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    // Enable React Fast Refresh
    fastRefresh: true,
    // Optimize JSX runtime
    jsxRuntime: 'automatic'
  })],
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['lucide-react'],
  },
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
  },
  build: {
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
        passes: 2,
      },
      mangle: {
        safari10: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunk for core dependencies
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('lucide-react')) {
              return 'icons';
            }
            if (id.includes('contentful')) {
              return 'contentful';
            }
            return 'vendor';
          }
          // Separate chunk for components
          if (id.includes('src/components')) {
            return 'components';
          }
          // Separate chunk for services
          if (id.includes('src/services')) {
            return 'services';
          }
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    chunkSizeWarningLimit: 300,
    sourcemap: false,
    cssCodeSplit: true,
    assetsInlineLimit: 1024,
    reportCompressedSize: false,
  },
  server: {
    port: 3000,
  },
  esbuild: {
    // Remove unused imports
    treeShaking: true,
    // Optimize for production
    legalComments: 'none',
  },
});
