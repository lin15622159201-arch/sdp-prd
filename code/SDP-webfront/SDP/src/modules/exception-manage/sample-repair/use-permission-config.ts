/** 异常管理-样衣返修 */

import { has } from '@/core/plugins/filter';
import { computed } from 'vue';

const usePermissionConfig = () => {
  return {
    // common
    /* 样衣返修-发起异常 */
    FQYC: computed(() => has('SDP-YCGL-YYFX-FQYC')),

    // button
    /* 返修分单-开始分单 */
    KSFD: computed(() => has('SDP-YCGL-YYFX-KSFD')),
    /* 返修分单-撤回 */
    CH: computed(() => has('SDP-YCGL-YYFX-CH')),
    /* 内部返修-开始返修 */
    KSFX: computed(() => has('SDP-YCGL-YYFX-KSFX')),
    /* 内部返修-排单变更 */
    PDBG: computed(() => has('SDP-YCGL-YYFX-PDBG')),
    /* 内部返修-返修完成 */
    FXWC: computed(() => has('SDP-YCGL-YYFX-FXWC')),
    /* 外部返修-确认收货 */
    QRSH: computed(() => has('SDP-YCGL-YYFX-QRSH')),
    /**
     * 外部返修-确认耗时
     * 列表按钮操作
     */
    QRHS: computed(() => has('SDP-YCGL-YYFX-QRHS')),
  };
};

export default usePermissionConfig;
