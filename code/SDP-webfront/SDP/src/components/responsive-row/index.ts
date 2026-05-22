import type { App } from 'vue';

import ResponsiveRow from './index.vue';
import { SFCWithInstall } from '@/types/utils';

ResponsiveRow.install = (app: App): void => {
  app.component(ResponsiveRow.name!, ResponsiveRow);
};

const _ResponsiveRow = ResponsiveRow as SFCWithInstall<typeof ResponsiveRow>;

export default _ResponsiveRow;
