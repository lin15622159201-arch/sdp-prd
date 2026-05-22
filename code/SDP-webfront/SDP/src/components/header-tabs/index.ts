import type { App } from 'vue';

import HeaderTabs from './package/index.vue';
import { SFCWithInstall } from '@/types/utils';

HeaderTabs.install = (app: App): void => {
  app.component(HeaderTabs.name!, HeaderTabs);
};

export { default as useHeaderTabs } from './hooks';
export default HeaderTabs as SFCWithInstall<typeof HeaderTabs>;
