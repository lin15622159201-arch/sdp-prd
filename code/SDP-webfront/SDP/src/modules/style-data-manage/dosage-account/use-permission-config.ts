import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

export const usePermissionConfig = () => {
  const codeMap = {
    /** 分单 */
    'SDP-KSZLGL-YLHS-FD': 'SDP-KSZLGL-YLHS-FD',
    /** 撤回 */
    'SDP-KSZLGL-YLHS-CH': 'SDP-KSZLGL-YLHS-CH',
    /** 编辑 */
    'SDP-KSZLGL-YLHS-BJ': 'SDP-KSZLGL-YLHS-BJ',
    /** 查看详情 */
    'SDP-KSZLGL-YLHS-CKXQ': 'SDP-KSZLGL-YLHS-CKXQ',
    /** 下载纸样 */
    'SDP-KSZLGL-YLHS-XZZY': 'SDP-KSZLGL-YLHS-XZZY',
  };
  return {
    /*
    * 分单
    * 控制:款式资料管理-用量核算-分单
    * 跳转路由名称:
    * */
    FD: computed(() => has(codeMap['SDP-KSZLGL-YLHS-FD'])),
    /*
    * 撤回
    * 控制:款式资料管理-用量核算-撤回
    * 跳转路由名称:
    * */
    CH: computed(() => has(codeMap['SDP-KSZLGL-YLHS-CH'])),
    /*
    * 下载纸样
    * 控制:款式资料管理-用量核算-下载纸样
    * 跳转路由名称:
    * */
    XZZY: computed(() => has(codeMap['SDP-KSZLGL-YLHS-XZZY'])),
    /*
    * 编辑
    * 控制:款式资料管理-用量核算-编辑
    * 跳转路由名称:StyleDataManageDosageAccountUpdate
    * */
    BJ: computed(() => has(codeMap['SDP-KSZLGL-YLHS-BJ'])),
    /*
    * 查看详情
    * 控制:款式资料管理-用量核算-查看详情
    * 跳转路由名称:StyleDataManageDosageAccountDetail
    * */
    CKXQ: computed(() => has(codeMap['SDP-KSZLGL-YLHS-CKXQ'])),
  };
};
