import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

export const usePermissionConfig = () => {
  const codeMap = {
    /** 任务分配 */
    'SDP-SJZX-LGRWFP-FWFP': 'SDP-SJZX-LGRWFP-FWFP',
    /** 分配变更 */
    'SDP-SJZX-LGRWFP-FPBG': 'SDP-SJZX-LGRWFP-FPBG',
    /** 淘汰 */
    'SDP-SJZX-LGRWFP-TT': 'SDP-SJZX-LGRWFP-TT',
    /** 查看详情 */
    'SDP-SJZX-LGRWFP-CKXQ': 'SDP-SJZX-LGRWFP-CKXQ',
    /** 款式标记 */
    'SDP-SJZX-LGRWFP-KSBJ': 'SDP-SJZX-LGRWFP-KSBJ',
  };
  return {
    /*
    * 任务分配
    * 控制:设计中心-灵感任务分配-任务分配
    * 跳转路由名称：
    * */
    RWFP: computed(() => has(codeMap['SDP-SJZX-LGRWFP-FWFP'])),
    /*
    * 分配变更
    * 控制:设计中心-灵感任务分配-分配变更
    * 跳转路由名称：
    * */
    FPBG: computed(() => has(codeMap['SDP-SJZX-LGRWFP-FPBG'])),
    /*
    * 淘汰
    * 控制:设计中心-灵感任务分配-淘汰
    * 跳转路由名称：
    * */
    TT: computed(() => has(codeMap['SDP-SJZX-LGRWFP-TT'])),
    /*
    * 查看详情
    * 控制:设计中心-灵感任务分配-查看详情
    * 跳转路由名称：
    * */
    CKXQ: computed(() => has(codeMap['SDP-SJZX-LGRWFP-CKXQ'])),
    /*
    * 款式标记
    * 控制:设计中心-灵感任务分配-款式标记
    * 跳转路由名称：
    * */
    KSBJ: computed(() => has(codeMap['SDP-SJZX-LGRWFP-KSBJ'])),
  };
};
