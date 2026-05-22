import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

export const usePermissionConfig = () => {
  const codeMap = {
    /** 失败款重推 */
    'SDP-SJZX-SMYHK-SBKCT': 'SDP-SJZX-SMYHK-SBKCT',
    /** 查看详情 */
    'SDP-SJZX-SMYHK-CKXQ': 'SDP-SJZX-SMYHK-CKXQ',
  };
  return {
    /*
    * 失败款重推
    * 控制:设计中心-数码印花款-失败款重推
    * 跳转路由名称：
    * */
    SBKCT: computed(() => has(codeMap['SDP-SJZX-SMYHK-SBKCT'])),
    /*
    * 查看详情
    * 控制:设计中心-数码印花款-查看详情
    * 跳转路由名称：
    * */
    CKXQ: computed(() => has(codeMap['SDP-SJZX-SMYHK-CKXQ'])),
  };
};
