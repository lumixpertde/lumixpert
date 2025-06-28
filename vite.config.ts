import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Optimize JSX runtime
      jsxRuntime: 'automatic'
    })
  ],
  
  // Performance optimizations
  build: {
    // Use terser for better minification
    minify: 'terser',
    terserOptions: {
      compress: {
        // Remove console logs in production
        drop_console: true,
        drop_debugger: true,
        // Remove unused code
        dead_code: true,
        // Optimize comparisons
        comparisons: true,
        // Optimize conditionals
        conditionals: true,
        // Evaluate constant expressions
        evaluate: true,
        // Optimize boolean expressions
        booleans: true,
        // Optimize loops
        loops: true,
        // Remove unused variables
        unused: true,
        // Hoist function declarations
        hoist_funs: true,
        // Hoist variable declarations
        hoist_vars: true,
        // Optimize if-return and if-continue
        if_return: true,
        // Join consecutive variable declarations
        join_vars: true,
        // Optimize sequences
        sequences: true,
        // Remove unreachable code
        side_effects: false
      },
      mangle: {
        // Mangle variable names for smaller size
        toplevel: true,
        eval: true,
        keep_fnames: false,
        reserved: ['$']
      },
      format: {
        // Remove comments
        comments: false
      }
    },
    
    // Advanced rollup optimizations
    rollupOptions: {
      output: {
        // Aggressive code splitting for optimal caching
        manualChunks: {
          // React core
          'react-vendor': ['react', 'react-dom'],
          
          // Routing
          'router': ['react-router-dom'],
          
          // Animations (heavy library)
          'animations': ['framer-motion'],
          
          // Icons
          'icons': ['lucide-react'],
          
          // SEO and meta
          'seo': ['react-helmet-async']
        },
        
        // Optimize chunk names for better caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        
        // Optimize asset names
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.');
          const ext = info?.[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext ?? '')) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/css/i.test(ext ?? '')) {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[ext]/[name]-[hash][extname]`;
        },
        
        // Entry file naming
        entryFileNames: 'assets/js/[name]-[hash].js'
      }
    },
    
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 500, // Smaller chunks for better loading
    
    // Disable source maps in production for smaller files
    sourcemap: false,
    
    // Target modern browsers for smaller bundle sizes
    target: ['es2020', 'chrome80', 'firefox78', 'safari14', 'edge88'],
    
    // Enable CSS code splitting
    cssCodeSplit: true,
    
    // Optimize CSS
    cssMinify: true,
    
    // Optimize assets
    assetsInlineLimit: 4096, // Inline small assets as base64
    
    // Output directory optimization
    outDir: 'dist',
    emptyOutDir: true
  },
  
  // Development server optimizations
  server: {
    headers: {
      'Cache-Control': 'max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    },
    
    // Optimize HMR
    hmr: {
      overlay: false, // Disable error overlay for better performance
      port: 5175
    }
  },
  
  // Preview server optimizations
  preview: {
    headers: {
      'Cache-Control': 'max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    }
  },
  
  // Optimize dependencies
  optimizeDeps: {
    // Include dependencies that should be pre-bundled
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react',
      'react-helmet-async'
    ],
    
    // ESBuild options for dependency optimization
    esbuildOptions: {
      target: 'es2020'
    }
  },
  
  // Define global constants for tree shaking
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
    __PROD__: JSON.stringify(process.env.NODE_ENV === 'production')
  },
  
  // ESBuild optimizations
  esbuild: {
    // Drop console and debugger in production
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
    
    // Optimize for modern browsers
    target: 'es2020',
    
    // Enable legal comments removal
    legalComments: 'none'
  }
})
