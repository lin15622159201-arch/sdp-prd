import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

export const usePermissionConfig = () => {
  return {
    /**
     *  导入选款数据
     */
    DRXKSJ: computed(() => has('SDP-XKGL-XHXK-DRXKSJ')),
    /**
     *  导出选款数据
     */
    DCXKSJ: computed(() => has('SDP-XKGL-XHXK-DCXKSJ')),
    /**
     *  选款
     */
    XK: computed(() => has('SDP-XKGL-XHXK-XK')),
    /**
     * 报价
     */
    BJ: computed(() => has('SDP-XKGL-XHXK-BJ')),
    /**
     * 确认报价
     */
    QRBJ: computed(() => has('SDP-XKGL-XHXK-QRBJ')),
    /**
     * 重新选款
     */
    CXXK: computed(() => has('SDP-XKGL-XHXK-CXXK')),
    /**
     * 取消选款
     */
    QXXK: computed(() => has('SDP-XKGL-XHXK-QXXK')),
    /**
     * 删除
     */
    SC: computed(() => has('SDP-XKGL-XHXK-SC')),
    /**
     * 备注
     */
    BZ: computed(() => has('SDP-XKGL-XHXK-BZ')),
  };
};
