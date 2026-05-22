import { App } from 'vue';
import type { SFCWithInstall } from '@/types/utils';
import LeftMenuTree from './index.vue';

LeftMenuTree.install = (app: App): void => {
  app.component(LeftMenuTree.name!, LeftMenuTree);
};

export default LeftMenuTree as SFCWithInstall<typeof LeftMenuTree>;
