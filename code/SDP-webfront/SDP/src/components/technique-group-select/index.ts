import type { App } from 'vue';
import TechniqueGroupSelect from './package/main.vue';
import { SFCWithInstall } from '@/types/utils';

TechniqueGroupSelect.install = (app: App): void => {
  app.component(TechniqueGroupSelect.name!, TechniqueGroupSelect);
};

export default TechniqueGroupSelect as SFCWithInstall<typeof TechniqueGroupSelect>;
