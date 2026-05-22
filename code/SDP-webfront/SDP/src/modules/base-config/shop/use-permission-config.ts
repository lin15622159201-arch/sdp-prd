import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

/**
 * 店铺管理权限配置
 */
export const usePermissionConfig = () => {
  return {
    /* 新增店铺 */
    XZDP: computed(() => has('SDP-DPGL-XZDP')),
    /* 编辑店铺 */
    BJDP: computed(() => has('SDP-DPGL-BJDP')),
    /* 启用/停用店铺 */
    QYDP: computed(() => has('SDP-DPGL-QYDP')),
  };
};
