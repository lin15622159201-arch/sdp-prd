import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

export const usePermissionConfig = () => {
  const codeMap = {
    /** 取消物料 */
    'SDP-WLJDGL-WLJDGJ-QXWL': 'SDP-WLJDGL-WLJDGJ-QXWL',
  };
  return {
    /*
    * 取消物料
    * 控制:物料进度管理-物料采购跟进-取消物料
    * 跳转路由名称:
    * */
    QXWL: computed(() => has(codeMap['SDP-WLJDGL-WLJDGJ-QXWL'])),
  };
};
