import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

export const usePermissionConfig = () => {
  return {
    /**
     * 权限控制【服装工程中心-异常发起】
     */
    YCFQ: computed(() => has('SDP-FZGCZX-KSCB-YCFQ')),
    /**
     * 权限控制【服装工程中心-齐套签收列表-齐套签收】
     */
    QTQS_QS: computed(() => has('SDP-FZGCZX-KSCB-QTQS-QS')),
    /**
     * 权限控制【服装工程中心-车版分单列表-分单】
     */
    CBFD_FD: computed(() => has('SDP-FZGCZX-KSCB-CBFD-FD')),
    /**
     * 权限控制【服装工程中心-车版分单列表-撤回】
     */
    CBFD_CH: computed(() => has('SDP-FZGCZX-KSCB-CBFD-CH')),
    /**
     * 权限控制【服装工程中心-内部裁剪-裁剪完成】
    */
    NBCJ_CJWC: computed(() => has('SDP-FZGCZX-KSCB-NBCJ-CJWC')),
    /**
    * 权限控制【服装工程中心-内部车缝-开始车缝】
    */
    NBCF_KSCF: computed(() => has('SDP-FZGCZX-KSCB-NBCF-KSCF')),
    /**
    * 权限控制【服装工程中心-内部车缝-排单变更】
    */
    NBCF_PDBG: computed(() => has('SDP-FZGCZX-KSCB-NBCF-PDBG')),
    /**
    * 权限控制【服装工程中心-内部车缝-车缝完成】
    */
    NBCF_CFWC: computed(() => has('SDP-FZGCZX-KSCB-NBCF-CFWC')),
    /**
    * 权限控制【服装工程中心-外部车缝-确认收货】
    */
    WBCF_QRSH: computed(() => has('SDP-FZGCZX-KSCB-WBCF-QRSH')),
    /**
     * 权限控制【服装工程中心—样衣质检-查询详情】
     */
    YYZJ_XQ: computed(() => has('SDP-FZGCZX-KSCB-YYZJ-XQ')),
    /**
     * 权限控制【服装工程中心-样衣质检-质检】
     */
    YYZJ_ZJ: computed(() => has('SDP-FZGCZX-KSCB-YYZJ-ZJ')),
  };
};
