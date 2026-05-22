import type { App } from 'vue';

import DatePicker from './packages/main.vue';
import { SFCWithInstall } from '@/types/utils';

DatePicker.install = (app: App): void => {
  app.component(DatePicker.name!, DatePicker);
};

export default DatePicker as SFCWithInstall<typeof DatePicker>;
