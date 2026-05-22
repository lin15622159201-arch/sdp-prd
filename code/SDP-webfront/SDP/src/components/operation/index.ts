import type { App } from 'vue';
import type { IFormConfig } from './types';
import { isFunction } from 'lodash-es';
import Operation from './package/main.vue';
import { SFCWithInstall } from '@/types/utils';

export { COMPONENT_TYPE } from './constant';
export * from './types';

Operation.install = (app: App): void => {
  app.component(Operation.name!, Operation);
};

export default Operation as SFCWithInstall<typeof Operation>;

export const defineOperationConfig = <T>(config: IFormConfig<T> | (() => IFormConfig<T>)) => {
  if (isFunction(config)) {
    return config();
  }
  return config;
};
