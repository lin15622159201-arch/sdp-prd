import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

export const usePermissionConfig = () => {
  return {
    /*
    * 创建任务
    * */
    CJRW: computed(() => has('SDP-SJZX-KKRW-CJRW')),
    /*
    * 审款
    * */
    SK: computed(() => has('SDP-SJZX-KKRW-SK')),
    /*
    * 批量开款
    * */
    PLKK: computed(() => has('SDP-SJZX-KKRW-PLKK')),
    /*
    * 发送
    * */
    FS: computed(() => has('SDP-SJZX-KKRW-FS')),
    /*
    * 识别标签
    * */
    SBBQ: computed(() => has('SDP-SJZX-KKRW-SBBQ')),
    /*
    * 删除任务
    * */
    SCRW: computed(() => has('SDP-SJZX-KKRW-SCRW')),
    /*
    * 分组-全部
    * */
    QBFZ: computed(() => has('SDP-SJZX-KKRW-QBFZ')),
    /*
    * 分组-组内
    * */
    QBZN: computed(() => has('SDP-SJZX-KKRW-QBZN')),
    /*
    * 分组-我的
    * */
    QBWD: computed(() => has('SDP-SJZX-KKRW-QBWD')),
  };
};
