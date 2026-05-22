import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

export const usePermissionConfig = () => {
  return {
    /** 设计中心-图片更新管理-创建任务 */
    CJRW: computed(() => has('SDP-SJZX-TPGX-CJRW')),
    /** 设计中心-图片更新管理-取消任务 */
    QXRW: computed(() => has('SDP-SJZX-TPGX-QXRW')),
    /** 设计中心-图片更新管理-审核任务 */
    SHRW: computed(() => has('SDP-SJZX-TPGX-SHRW')),
    /** 设计中心-图片更新管理-编辑任务 */
    BJRW: computed(() => has('SDP-SJZX-TPGX-BJRW')),
    /** 设计中心-图片更新管理-上传图片 */
    SCTP: computed(() => has('SDP-SJZX-TPGX-SCTP')),
    /** 设计中心-图片更新管理-下载图片 */
    XZTP: computed(() => has('SDP-SJZX-TPGX-XZTP')),
    /** 设计中心-图片更新管理-审核不通过原因 */
    SHBTGYY: computed(() => has('SDP-SJZX-TPGX-SHBTGYY')),
    /** 分组-全部 */
    FZQB: computed(() => has('SDP-SJZX-TPGX-FZQB')),
    /** 分组-组内 */
    FZZN: computed(() => has('SDP-SJZX-TPGX-FZZN')),
    /** 分组-我的 */
    FZWD: computed(() => has('SDP-SJZX-TPGX-FZWD')),
  };
};
