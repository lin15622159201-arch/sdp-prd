import type { App } from 'vue';

import numberBase from './package/number-basis.vue';
import { SFCWithInstall } from '@/types/utils';

numberBase.install = (app: App): void => {
  app.component(numberBase.name!, numberBase);
};

const _numberBase = numberBase as SFCWithInstall<typeof numberBase>;

export default _numberBase;
