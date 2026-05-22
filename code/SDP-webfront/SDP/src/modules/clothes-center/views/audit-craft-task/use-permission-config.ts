import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

export const usePermissionConfig = () => {
  return {
    /*
     * 权限控制【审版工艺单-编辑】
     * */
    BJ: computed(() => has('SDP-FZGCZX-SBGYD-BJ')),
    /**
     * 权限控制【审版工艺单-详情】
     */
    XQ: computed(() => has('SDP-FZGCZX-SBGYD-XQ')),
    /**
     * 权限控制【审版工艺单-任务指派】
     */
    RWZP: computed(() => has('SDP-FZGCZX-SBGYD-RWZP')),
  };
};
