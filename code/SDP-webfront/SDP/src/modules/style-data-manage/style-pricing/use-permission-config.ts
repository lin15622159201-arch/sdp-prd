import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

export const usePermissionConfig = () => {
  return {
    /*
     * 权限控制【款式生产资料—款式核价-查询详情】
     * */
    XQ: computed(() => has('SDP-KSZLGL-KSHJ-XQ')),
    /*
     * 权限控制【款式生产资料—款式核价-编辑】
     * */
    BJ: computed(() => has('SDP-KSZLGL-KSHJ-BJ')),
    /**
     * 权限控制【款式生产资料—款式核价-导出】
     */
    DC: computed(() => has('SDP-KSZLGL-KSHJ-DC')),
    /**
     * 权限控制【款式生产资料—款式核价-详情-下载纸样】
     */
    XZZY: computed(() => has('SDP-KSZLGL-KSHJ-XZZY')),
  };
};
