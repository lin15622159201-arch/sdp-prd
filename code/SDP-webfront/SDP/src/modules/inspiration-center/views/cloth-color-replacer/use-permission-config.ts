import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

export const usePermissionConfig = () => {
  return {
    /** 灵感中心-服装换色-中止 */
    ZZ: computed(() => has('SDP-LGZX-FZHS-ZZ')),
    /** 灵感中心-服装换色-复制 */
    FZ: computed(() => has('SDP-LGZX-FZHS-FZ')),
    /** 灵感中心-服装换色-删除 */
    SC: computed(() => has('SDP-LGZX-FZHS-SC')),
    /** 灵感中心-服装换色-新增 */
    XZ: computed(() => has('SDP-LGZX-FZHS-XZ')),
    /** 灵感中心-服装换色-重试 */
    CS: computed(() => has('SDP-LGZX-FZHS-CS'))
  };
};
