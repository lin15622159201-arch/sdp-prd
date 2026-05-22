import type { App } from 'vue';

import CustomFormComponent from './package/index.vue';
import CustomFormClass from './package/Form';
import { SFCWithInstall } from '@/types/utils';

export * from './hooks/use-dict';
export * from './hooks/use-fuzzy';
export * from './hooks/use-uploader-format';
export * from './package/Form';

const CustomForm = CustomFormComponent as SFCWithInstall<typeof CustomFormComponent>;

CustomForm.install = (app: App): void => {
  app.component(CustomForm.name!, CustomForm);
};

export {
  CustomForm,
  // eslint-disable-next-line no-restricted-exports
  CustomFormClass as default,
};

/*
  version 1.0.0
  time 2021.9.11
*/
