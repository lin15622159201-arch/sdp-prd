import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

/**
 * 品类管理-权限配置
 */
export const usePermissionConfig = () => {
  return {
    /*
     * 关联平台品类
     * */
    GLPTPL: computed(() => has('SDP-JCPZ-PTPLGL-GLPTPL')),
    /*
     * 删除关联品类
     * */
    SCGLPL: computed(() => has('SDP-JCPZ-PTPLGL-SCGLPL')),
  };
};
