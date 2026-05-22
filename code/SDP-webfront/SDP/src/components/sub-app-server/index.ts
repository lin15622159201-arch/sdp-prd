import type { App } from 'vue';
import SubAppServer from './package/main.vue';
import { SFCWithInstall } from '@/types/utils';

SubAppServer.install = (app: App): void => {
  app.component(SubAppServer.name!, SubAppServer);
};

export default SubAppServer as SFCWithInstall<typeof SubAppServer>;
