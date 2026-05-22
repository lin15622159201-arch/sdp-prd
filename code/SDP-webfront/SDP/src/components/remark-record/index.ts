import type { App } from 'vue';

import RemarkRecord from './packages/index.vue';
import { SFCWithInstall } from '@/types/utils';

RemarkRecord.install = (app: App) => {
  app.component(RemarkRecord.name!, RemarkRecord);
};

export default RemarkRecord as SFCWithInstall<typeof RemarkRecord>;
