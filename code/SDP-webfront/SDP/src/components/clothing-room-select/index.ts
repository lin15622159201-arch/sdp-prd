import type { App } from 'vue';
import ClothingRoomSelect from './packages/main.vue';
import type { SFCWithInstall } from '@/types/utils';

ClothingRoomSelect.install = (app: App): void => {
  app.component(ClothingRoomSelect.name!, ClothingRoomSelect);
};

export default ClothingRoomSelect as SFCWithInstall<typeof ClothingRoomSelect>;
