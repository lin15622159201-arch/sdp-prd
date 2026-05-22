import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

export const usePermissionConfig = () => {
  return {
    /**
     * 财务管理-付款单管理-付款
     */
    FK: computed(() => has('SDP-CWGL-FKDGL-FK')),
    /**
     * 财务管理-付款单管理-查看
     */
    XQ: computed(() => has('SDP-CWGL-FKDGL-XQ')),
  };
};
