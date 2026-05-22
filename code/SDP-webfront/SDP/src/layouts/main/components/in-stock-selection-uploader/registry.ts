/* eslint-disable vue/max-len */
import { defineAsyncComponent } from 'vue';

export const COMPONENT_REGISTRY = {
  InStockSelectionAction: defineAsyncComponent(() => import('@/modules/selection-manage/in-stock-selection/components/upload-result-action.vue')),
};
