import { App } from 'vue';
import type { SFCWithInstall } from '@/types/utils';
import InputNumber from './package/index.vue';

InputNumber.install = (app: App): void => {
  app.component(InputNumber.name!, InputNumber);
};

const _InputNumber = InputNumber as SFCWithInstall<typeof InputNumber>;

export default _InputNumber;
