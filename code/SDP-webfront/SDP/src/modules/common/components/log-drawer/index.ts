import type { App } from 'vue';

import LogDrawer from './package/index.vue';
import { SFCWithInstall } from '@/types/utils';

LogDrawer.install = (app: App): void => {
  app.component(LogDrawer.name!, LogDrawer);
};

export default LogDrawer as SFCWithInstall<typeof LogDrawer>;
