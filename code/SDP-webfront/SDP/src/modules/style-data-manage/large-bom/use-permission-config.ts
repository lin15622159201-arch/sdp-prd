import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

export const usePermissionConfig = () => {
  const codeMap = {
    /** 查看详情 */
    'SDP-KSZLGL-DHBOM-CKXQ': 'SDP-KSZLGL-DHBOM-CKXQ',
  };
  return {
    /*
    * 查看详情
    * 控制:款式资料管理-大货BOM-查看详情
    * 跳转路由名称:StyleDataManageLargeBomDetail
    * */
    CKXQ: computed(() => has(codeMap['SDP-KSZLGL-DHBOM-CKXQ'])),
  };
};
