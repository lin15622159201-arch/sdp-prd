/** 基础配置-ai品类映射 */

import { has } from '@/core/plugins/filter';
import { computed } from 'vue';

const usePermissionConfig = () => {
  return {
    /* 新增 */
    XZ: computed(() => has('SDP-JCPZ-AIPLYS-XZ')),
    /* 编辑 */
    BJ: computed(() => has('SDP-JCPZ-AIPLYS-BJ')),
    /* 删除 */
    SC: computed(() => has('SDP-JCPZ-AIPLYS-SC')),
  };
};

export default usePermissionConfig;
