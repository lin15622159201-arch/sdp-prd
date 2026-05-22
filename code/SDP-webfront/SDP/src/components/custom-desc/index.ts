import type { App } from 'vue';

import CustomDesc from './package/index.vue';
import { SFCWithInstall } from '@/types/utils';

CustomDesc.install = (app: App): void => {
  app.component(CustomDesc.name!, CustomDesc);
};

export default CustomDesc as SFCWithInstall<typeof CustomDesc>;
