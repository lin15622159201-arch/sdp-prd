import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

export const usePermissionConfig = () => {
  return {
    /**
     * 财务管理-对账单管理-确认对账
     */
    QRDZ: computed(() => has('SDP-CWGL-DZDGL-QRDZ')),
    /**
     * 财务管理-对账单管理-查看账单
     */
    XQ: computed(() => has('SDP-CWGL-DZDGL-XQ')),
    /**
     * 财务管理-对账单管理-核实明细
     */
    HSMX: computed(() => has('SDP-CWGL-DZDGL-HSMX')),
    /**
     * 财务管理-对账单管理-查看明细
     */
    CKMX: computed(() => has('SDP-CWGL-DZDGL-CKMX')),
    /**
     * 财务管理-对账单管理-下载对账单
     */
    XZDZD: computed(() => has('SDP-CWGL-DZDGL-XZDZD')),
    /**
     * 财务管理-对账单管理-导出明细
     */
    DCMX: computed(() => has('SDP-CWGL-DZDGL-DCMX')),
  };
};
