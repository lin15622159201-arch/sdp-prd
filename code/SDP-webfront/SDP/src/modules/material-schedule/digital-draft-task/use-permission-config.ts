import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

export const usePermissionConfig = () => {
  return {
    /*
    * 新增
    * */
    XJ: computed(() => has('SDP-WLJDGL-SMMGRW-XJ')),
    /*
    * 导出
    * */
    DC: computed(() => has('SDP-WLJDGL-SMMGRW-DC')),
    /*
    * 编辑
    * */
    BJ: computed(() => has('SDP-WLJDGL-SMMGRW-BJ')),
    /*
    * 操作日志
    * */
    CZRZ: computed(() => has('SDP-WLJDGL-SMMGRW-CZRZ')),
    /**
     * 撤回
     */
    CH: computed(() => has('SDP-WLJDGL-SMMGRW-CH')),
    /**
     * 取消
     */
    QX: computed(() => has('SDP-WLJDGL-SMMGRW-QX')),
    /**
     * 审核
     */
    SH: computed(() => has('SDP-WLJDGL-SMMGRW-SH')),
    /**
     * 查看
     */
    CK: computed(() => has('SDP-WLJDGL-SMMGRW-CK')),
    /**
     * 编码
     */
    BM: computed(() => has('SDP-WLJDGL-SMMGRW-BM')),
    /**
     * 重新描稿
     */
    CXMG: computed(() => has('SDP-WLJDGL-SMMGRW-CXMG')),
  };
};
