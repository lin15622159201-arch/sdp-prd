/** 基础配置-尺寸表模板图 */

import { has } from '@/core/plugins/filter';
import { computed } from 'vue';

const usePermissionConfig = () => {
  return {
    /* 新增 */
    XZ: computed(() => has('SDP-JCPZ-CCBMBT-XZ')),
    /* 编辑 */
    BJ: computed(() => has('SDP-JCPZ-CCBMBT-BJ')),
    /* 删除 */
    SC: computed(() => has('SDP-JCPZ-CCBMBT-SC')),
  };
};

export default usePermissionConfig;
