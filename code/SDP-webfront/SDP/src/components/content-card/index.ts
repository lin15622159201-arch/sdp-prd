import type { App } from 'vue';
import ContentCard from './packages/index.vue';
import { SFCWithInstall } from '@/types/utils';

ContentCard.install = (app: App): void => {
  app.component(ContentCard.name!, ContentCard);
};

export default ContentCard as SFCWithInstall<typeof ContentCard>;
