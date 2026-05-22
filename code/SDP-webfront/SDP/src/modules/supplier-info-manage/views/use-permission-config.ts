import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

export const usePermissionConfig = () => {
  return {
    /**
     * 供应商信息管理-印花供应商-查看
     */
    XQ: computed(() => has('SDP-GYSXXGL-YHGYS-XQ')),
    /**
     * 供应商信息管理-印花供应商-编辑/保存
     */
    BJ: computed(() => has('SDP-GYSXXGL-YHGYS-BJ')),
    /**
     * 供应商信息管理-印花供应商-停用/启用
     */
    TYQY: computed(() => has('SDP-GYSXXGL-YHGYS-TYQY')),
  };
};
