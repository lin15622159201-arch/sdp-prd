import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

export const usePermissionConfig = () => {
  return {
    /**
     * 权限控制 【服装工程中心—二次工艺-工艺补充】
     */
    GYBC: computed(() => has('SDP-FZGCZX-ECGYHZ-GYBC')),
  };
};
