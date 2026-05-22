import type { App } from 'vue';

import TagsEnum from './packages/index.vue';
import { SFCWithInstall } from '@/types/utils';

TagsEnum.install = (app: App): void => {
  app.component(TagsEnum.name!, TagsEnum);
};

export * from './constant';
export default TagsEnum as SFCWithInstall<typeof TagsEnum>;
