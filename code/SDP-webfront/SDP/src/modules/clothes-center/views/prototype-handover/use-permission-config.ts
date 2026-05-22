import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

export const usePermissionConfig = () => {
  return {
    /*
     * 权限控制【服装工程中心-异常发起】：
     * */
    YCFQ: computed(() => has('SDP-FZGCZX-BDJJ-YCFQ')),
    /*
     * 权限控制【版单交接-版单交接】（版单交接、扫码交接）
     * */
    BDJJ: computed(() => has('SDP-FZGCZX-BDJJ-BDJJ')),
  };
};
