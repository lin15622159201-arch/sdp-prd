import microApp from '@micro-zoe/micro-app';
import { MICRO_APP_MAP } from './constant';
import getEventCenter from './event-center';

export * from './constant';
export * from './types';

export default function microAppInit() {
  const isDev = process.env.NODE_ENV === 'development';
  const { HOULIU_BOM_APP } = MICRO_APP_MAP;

  window.microAppEventCenter = getEventCenter();
  //
  window.CHILD_APP_CODE = HOULIU_BOM_APP.APP_CODE;

  microApp.start({
    plugins: {
      modules: {
        [HOULIU_BOM_APP.APP_CODE]: [
          {
            loader(code) {
              if (isDev) {
                // 这里 /basename/ 需要和子应用vite.config.js中base的配置保持一致
                code = code.replace(/(from|import|assets)(\s*['"])(\/child\/vite\/)/g, (all) => {
                  const { DEV_SERVER } = HOULIU_BOM_APP;
                  const { protocol, hostname } = window.location;

                  const devUrl = `${protocol}//${hostname}:${DEV_SERVER.port}${DEV_SERVER.base}`;

                  return all.replace(DEV_SERVER.base, devUrl);
                });
              }
              return code;
            },
          },
        ],
      },
    },
  });
}
