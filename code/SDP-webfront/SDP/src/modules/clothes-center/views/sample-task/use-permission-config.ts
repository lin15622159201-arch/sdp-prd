import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

export const usePermissionConfig = () => {
  return {
    /**
     * 【服装工程中心-异常发起】
     */
    YCFQ: computed(() => has('SDP-FZGCZX-DBRW-YCFQ')),
    /**
     * 【服装工程中心-3D分单列表-撤回】
     */
    CH: computed(() => has('SDP-FZGCZX-DBRW-CH')),
    /**
     * 【服装工程中心-3D分单列表-分单】
     */
    FD: computed(() => has('SDP-FZGCZX-DBRW-FD')),
    /**
     * 【服装工程中心-3D列表-任务转交】
     */
    RWZJ: computed(() => has('SDP-FZGCZX-DBRW-RWZJ')),
    /**
     * 【服装工程中心-内部3D列表-编辑】
     */
    NBBJ: computed(() => has('SDP-FZGCZX-DBRW-NBBJ')),
    /**
     * 【服装工程中心—内部3D列表-查询详情】
     */
    NBXQ: computed(() => has('SDP-FZGCZX-DBRW-NBXQ')),
    /**
     * 【服装工程中心—外部3D列表-查询详情】
     */
    WBXQ: computed(() => has('SDP-FZGCZX-DBRW-WBXQ')),
    /**
     * 【服装工程中心-外部3D列表-编辑】
     */
    WBBJ: computed(() => has('SDP-FZGCZX-DBRW-WBBJ')),
  };
};
