import type { App } from 'vue';
import UserSelect from './packages/main.vue';
import { SFCWithInstall } from '@/types/utils';

UserSelect.install = (app: App): void => {
  app.component(UserSelect.name!, UserSelect);
};

export default UserSelect as SFCWithInstall<typeof UserSelect>;
