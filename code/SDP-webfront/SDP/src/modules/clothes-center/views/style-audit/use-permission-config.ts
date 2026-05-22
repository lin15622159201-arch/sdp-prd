import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

export const usePermissionConfig = () => {
  return {
    /**
   * 【服装工程中心-异常发起】
   */
    YCFQ: computed(() => has('SDP-FZGCZX-KSSB-YCFQ')),
    /**
     * 权限控制【服装工程中心—样衣质检-查询详情】
     */
    XQ: computed(() => has('SDP-FZGCZX-KSSB-XQ')),
    /*
     * 权限控制【服装工程中心-样衣审版-审版】
     * */
    SB: computed(() => has('SDP-FZGCZX-KSSB-SB')),
  };
};
