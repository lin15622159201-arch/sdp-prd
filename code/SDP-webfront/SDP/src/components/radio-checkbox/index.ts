import type { App } from 'vue';

import RadioCheckbox from './package/index.vue';
import { SFCWithInstall } from '@/types/utils';

RadioCheckbox.install = (app: App): void => {
  app.component(RadioCheckbox.name!, RadioCheckbox);
};

export default RadioCheckbox as SFCWithInstall<typeof RadioCheckbox>;
