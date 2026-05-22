import { App } from 'vue';
import type { SFCWithInstall } from '@/types/utils';
import SearchArea from './package';

export * from './package/types';

SearchArea.install = (app: App): void => {
  app.component(SearchArea.name!, SearchArea);
};

const _SearchArea = SearchArea as SFCWithInstall<typeof SearchArea>;

export default _SearchArea;
