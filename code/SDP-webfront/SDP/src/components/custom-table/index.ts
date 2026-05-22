import type { App } from 'vue';

import CustomTable from './packages/table.vue';
import type { IColumnProp } from './types';
import { SFCWithInstall } from '@/types/utils';

function defineColumns<T = any>(columns: IColumnProp<T>[]) {
  return columns;
}

CustomTable.install = (app: App): void => {
  app.component(CustomTable.name!, CustomTable);
};

export default CustomTable as SFCWithInstall<typeof CustomTable>;

export {
  defineColumns,
};
