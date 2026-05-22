import { App } from 'vue';
import type { SFCWithInstall } from '@/types/utils';
import HeaderArea from './package/index.vue';

HeaderArea.install = (app: App): void => {
  app.component(HeaderArea.name!, HeaderArea);
};

const _HeaderArea = HeaderArea as SFCWithInstall<typeof HeaderArea>;

export default _HeaderArea;
