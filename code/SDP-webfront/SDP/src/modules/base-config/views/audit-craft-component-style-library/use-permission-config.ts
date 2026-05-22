/** 基础配置-ai品类映射 */

import { has } from '@/core/plugins/filter';
import { computed } from 'vue';

const usePermissionConfig = () => {
  return {
    /* 新增 */
    XZ: computed(() => has('SDP-JCPZ-SBGYKSK-XZ')),
    /** 详情 */
    XQ: computed(() => has('SDP-JCPZ-SBGYKSK-XQ')),
    /* 编辑 */
    BJ: computed(() => has('SDP-JCPZ-SBGYKSK-BJ')),
    /* 启停用 */
    QTY: computed(() => has('SDP-JCPZ-SBGYKSK-QTY')),
    /**
     * @description 操作日志
     */
    CZRZ: computed(() => has('SDP-JCPZ-SBGYKSK-CZRZ')),
  };
};

export default usePermissionConfig;
