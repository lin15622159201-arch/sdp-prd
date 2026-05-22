import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

export const usePermissionConfig = () => {
  return {
    /*
    * 导出
    * */
    DC: computed(() => has('SDP-WLJDGL-3DCJRW-DC')),
  };
};
