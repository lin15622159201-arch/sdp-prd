import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

export const usePermissionConfig = () => {
  return {
    /**
     * 【服装工程中心-异常发起】
     */
    YCFQ: computed(() => has('SDP-FZGCZX-ZYRW-YCFQ')),
    /**
     * 【服装工程中心-纸样分单列表-分单】
     */
    FD: computed(() => has('SDP-FZGCZX-ZYFD-FD')),
    /**
     * 【服装工程中心-纸样分单列表-撤回】
     */
    CH: computed(() => has('SDP-FZGCZX-ZYFD-CH')),
    /**
     * 【服装工程中心-内部纸样列表-任务转交】
     */
    RWZJ: computed(() => has('SDP-FZGCZX-ZYFD-RWZJ')),
    /**
     * 【服装工程中心—内部纸样列表-查询详情】
     */
    NBXQ: computed(() => has('SDP-FZGCZX-ZYFD-NBXQ')),
    /*
     * 【服装工程中心-内部纸样列表-编辑】
     * */
    NBBJ: computed(() => has('SDP-FZGCZX-ZYFD-NBBJ')),
    /**
     * 【服装工程中心—外部纸样列表-查询详情】
     */
    WBXQ: computed(() => has('SDP-FZGCZX-ZYFD-WBXQ')),
    /**
     * 【服装工程中心-外部纸样列表-编辑】
     */
    WBBJ: computed(() => has('SDP-FZGCZX-ZYFD-WBBJ')),
  };
};
