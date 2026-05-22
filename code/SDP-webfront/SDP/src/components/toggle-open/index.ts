import type { App } from 'vue';

import ToggleOpen from './package/index.vue';
import { SFCWithInstall } from '@/types/utils';

ToggleOpen.install = (app: App): void => {
  app.component(ToggleOpen.name!, ToggleOpen);
};

export default ToggleOpen as SFCWithInstall<typeof ToggleOpen>;
