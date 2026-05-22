import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

export const usePermissionConfig = () => {
  return {
    /**
     * 权限控制【款式生产资料—预估核价-编辑】
     */
    BJ: computed(() => has('SDP-KSZLGL-YGHJ-BJ')),
    /*
     * 权限控制【款式生产资料—预估核价-查询详情】
     * */
    XQ: computed(() => has('SDP-KSZLGL-YGHJ-XQ')),
  };
};
