import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

export const usePermissionConfig = () => {
  const codeMap = {
    /** 签收 */
    'SDP-WLJDGL-WLQTGJ-QS': 'SDP-WLJDGL-WLQTGJ-QS',
  };
  return {
    /*
    * 签收
    * 控制:物料进度管理-物料齐套跟进-签收
    * 跳转路由名称:MaterialSchedulePurchaseKittingSign
    * */
    QS: computed(() => has(codeMap['SDP-WLJDGL-WLQTGJ-QS'])),
  };
};
