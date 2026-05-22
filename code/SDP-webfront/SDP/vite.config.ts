import { defineConfig } from '@toy/service';
import { resolve } from 'path';
import { createHtmlPlugin } from 'vite-plugin-html';
import svgLoader from 'vite-svg-loader';

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';
  return {
    jsx: true,
    typeCheck: true,
    vueTypeCheck: true,
    eslint: true,
    vueCompilerOptions: {
      isCustomElement: tag => /^micro-app/.test(tag),
    },
    // 线上环境注入
    plugins: [
      createHtmlPlugin({
        inject: {
          data: {
            injectScript: isDev ? '' : '<script src="/config/frontend-common.js"></script>',
          },
        },
      }),
      svgLoader(),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "sass:math";
            @use "@/styles/reset/element-var";
            @use "@/styles/theme/default.scss" as *;
          `,
          charset: false,
        },
      },
    },
    resolve: {
      alias: {
        '@root': resolve(process.cwd(), './')
      },
    },
  };
});
