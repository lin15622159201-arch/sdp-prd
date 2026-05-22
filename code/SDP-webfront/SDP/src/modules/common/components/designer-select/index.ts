import type { App } from 'vue';

import DesignerSelect from './packages/main.vue';
import { SFCWithInstall } from '@/types/utils';

DesignerSelect.install = (app: App): void => {
  app.component(DesignerSelect.name!, DesignerSelect);
};

export default DesignerSelect as SFCWithInstall<typeof DesignerSelect>;
