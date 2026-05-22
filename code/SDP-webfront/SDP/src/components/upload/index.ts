import { App } from 'vue';
import type { SFCWithInstall } from '@/types/utils';
import Upload from './package/index.vue';

Upload.install = (app: App): void => {
  app.component(Upload.name!, Upload);
};

const Component = Upload as SFCWithInstall<typeof Upload>;

export default Component;
