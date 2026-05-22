import type { App } from 'vue';

import ColorCascader from './package/index.vue';
import { SFCWithInstall } from '@/types/utils';

ColorCascader.install = (app: App): void => {
  app.component(ColorCascader.name!, ColorCascader);
};

export default ColorCascader as SFCWithInstall<typeof ColorCascader>;
