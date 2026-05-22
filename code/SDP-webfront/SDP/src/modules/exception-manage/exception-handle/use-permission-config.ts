/** 异常管理-异常处理 */

import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

export const usePermissionConfig = () => {
  return {
    // button
    /* 待处理-驳回 */
    BH: computed(() => has('SDP-YCGL-YCCL-BH')),
    /* 待处理-开始处理 */
    KSCL: computed(() => has('SDP-YCGL-YCCL-KSCL')),
    /* 处理中-申请结案 */
    SQJA: computed(() => has('SDP-YCGL-YCCL-SQJA')),

    /* 驳回待审核-同意驳回 */
    TYBH: computed(() => has('SDP-YCGL-YCCL-TYBH')),
    /* 驳回待审核-拒绝驳回 */
    JJBH: computed(() => has('SDP-YCGL-YCCL-JJBH')),

    /* 结案待审核-同意结案 */
    TYJA: computed(() => has('SDP-YCGL-YCCL-TYJA')),
    /* 结案待审核-拒绝结案 */
    JJJA: computed(() => has('SDP-YCGL-YCCL-JJJA')),
  };
};
