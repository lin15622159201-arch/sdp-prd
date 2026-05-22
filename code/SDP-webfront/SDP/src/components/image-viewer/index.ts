import type { App } from 'vue';
import type { SFCWithInstall } from '@/types/utils';

import ImageViewer from './package/index.vue';

ImageViewer.install = (app: App): void => {
  app.component(ImageViewer.name!, ImageViewer);
};

export interface IScope {
  view(index?: number): void;
}

export default ImageViewer as SFCWithInstall<typeof ImageViewer>;
