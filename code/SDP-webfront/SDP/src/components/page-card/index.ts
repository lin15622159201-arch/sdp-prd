import type { App } from 'vue';

import PageCard from './package/index.vue';
import { SFCWithInstall } from '@/types/utils';

PageCard.install = (app: App): void => {
  app.component(PageCard.name!, PageCard);
};

export default PageCard as SFCWithInstall<typeof PageCard>;
