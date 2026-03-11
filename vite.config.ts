import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Critical CSS for above-fold hero rendering (inlined to avoid render-blocking)
const criticalCSS = `body{font-family:'Inter',system-ui,-apple-system,sans-serif;background-color:#fafaf9;color:#1c1917;margin:0;-webkit-font-smoothing:antialiased}.page-container{width:100%;max-width:1280px;margin:0 auto;padding-left:24px;padding-right:24px}@media(max-width:767px){.page-container{padding-left:12px;padding-right:12px}}.min-h-screen{min-height:100vh}.bg-background{background-color:#fafaf9}.fixed{position:fixed}.top-0{top:0}.left-0{left:0}.right-0{right:0}.z-50{z-index:50}.bg-transparent{background-color:transparent}.flex{display:flex}.items-center{align-items:center}.justify-between{justify-content:space-between}.gap-3{gap:0.75rem}.py-4{padding-top:1rem;padding-bottom:1rem}.relative{position:relative}.absolute{position:absolute}.inset-0{inset:0}.overflow-hidden{overflow:hidden}.w-full{width:100%}.h-full{height:100%}.object-cover{object-fit:cover}.text-white{color:#fff}.font-bold{font-weight:700}.text-4xl{font-size:2.25rem;line-height:2.5rem}#root{min-height:100vh}.animate-spin{animation:spin 1s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}`;

function optimizeHtmlPlugin(): Plugin {
  return {
    name: 'optimize-html',
    enforce: 'post',
    transformIndexHtml(html) {
      // Convert CSS to non-render-blocking low-priority load via media="print" trick
      html = html.replace(
        /<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/g,
        `<link rel="stylesheet" href="$1" media="print" onload="this.media='all'"><noscript><link rel="stylesheet" href="$1"></noscript>`
      );

      // 2. Remove ALL modulepreloads to reduce bandwidth contention with hero image
      html = html.replace(
        /<link rel="modulepreload" crossorigin href="\/assets\/[^"]*\.js">\s*/g, ''
      );

      // 3. Inject critical CSS in <head>
      html = html.replace('</head>', `<style>${criticalCSS}</style></head>`);

      // 4. Move script to end of body to let hero image paint first
      const scriptTags: string[] = [];
      html = html.replace(/<script type="module"[^>]*><\/script>\s*/g, (match) => {
        scriptTags.push(match.trim());
        return '';
      });
      if (scriptTags.length > 0) {
        html = html.replace('</body>', `${scriptTags.join('\n')}\n</body>`);
      }

      return html;
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), optimizeHtmlPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'framer-motion': ['framer-motion'],
          'react-router': ['react-router-dom'],
          'react-query': ['@tanstack/react-query'],
        },
      },
    },
  },
})
