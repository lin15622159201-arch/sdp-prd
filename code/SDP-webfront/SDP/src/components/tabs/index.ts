import { App } from 'vue';
import type { SFCWithInstall } from '@/types/utils';
import Component from './index.vue';

Component.install = (app: App): void => {
  app.component(Component.name!, Component);
};

const _Component = Component as SFCWithInstall<typeof Component>;

export default _Component;
