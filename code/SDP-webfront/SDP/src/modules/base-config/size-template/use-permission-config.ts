import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

/**
 * 基础配置-尺码表模板-权限配置 Hook
 */
export const usePermissionConfig = () => {
  return {
    /**
     * 新增模板
     */
    XZMB: computed(() => has('SDP-JCPZ-CMBLB-XZMB')),
    /**
     * 编辑模板
     */
    BJMB: computed(() => has('SDP-JCPZ-CMBLB-BJMB')),
    /*
     * 批量启用模板
     * */
    PLQYMB: computed(() => has('SDP-JCPZ-CMBLB-PLQYMB')),
    /*
     * 批量停用模板
     * */
    PLTYMB: computed(() => has('SDP-JCPZ-CMBLB-PLTYMB')),
  };
};
