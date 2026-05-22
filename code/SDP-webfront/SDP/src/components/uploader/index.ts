import type { App } from 'vue';
import type { SFCWithInstall } from '@/types/utils';

import Uploader from './packages/uploader.vue';

Uploader.install = (app: App): void => {
  app.component(Uploader.name as string, Uploader);
};

export default Uploader as SFCWithInstall<typeof Uploader>;
