import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

export const usePermissionConfig = () => {
  const codeMap = {
    /** 打印BOM */
    'SDP-SJZX-KFBOM-DYBOM': 'SDP-SJZX-KFBOM-DYBOM',
    /** 下载BOM单 */
    'SDP-SJZX-KFBOM-XZBOM': 'SDP-SJZX-KFBOM-XZBOM',
    /** 查看详情 */
    'SDP-SJZX-KFBOM-CKXQ': 'SDP-SJZX-KFBOM-CKXQ',
    /** 编辑 */
    'SDP-SJZX-KFBOM-BJ': 'SDP-SJZX-KFBOM-BJ',
    /** 采购申请 */
    'SDP-SJZX-KFBOM-CGSQ': 'SDP-SJZX-KFBOM-CGSQ',
    /** 导出 */
    'SDP-SJZX-KFBOM-DC': 'SDP-SJZX-KFBOM-DC',
  };
  return {
    /*
    * 打印BOM
    * 控制:设计中心-开发BOM-打印BOM
    * 跳转路由名称：
    * */
    DYBOM: computed(() => has(codeMap['SDP-SJZX-KFBOM-DYBOM'])),
    /*
    * 下载BOM单
    * 控制:设计中心-开发BOM-下载BOM单
    * 跳转路由名称：
    * */
    XZBOM: computed(() => has(codeMap['SDP-SJZX-KFBOM-XZBOM'])),
    /*
    * 查看详情
    * 控制:设计中心-开发BOM-查看详情
    * 跳转路由名称:DesignCenterDevelopBomDetail
    * */
    CKXQ: computed(() => has(codeMap['SDP-SJZX-KFBOM-CKXQ'])),
    /*
    * 编辑
    * 控制:设计中心-开发BOM-编辑
    * 跳转路由名称:DesignCenterDevelopBomEdit
    * */
    BJ: computed(() => has(codeMap['SDP-SJZX-KFBOM-BJ'])),
    /*
    * 采购申请
    * 控制:设计中心-开发BOM-采购申请
    * 跳转路由名称:
    * */
    CGSQ: computed(() => has(codeMap['SDP-SJZX-KFBOM-CGSQ'])),
    /**
     * 导出
     * 控制:设计中心-开发BOM-导出
     * 跳转路由名称:
     */
    DC: computed(() => has(codeMap['SDP-SJZX-KFBOM-DC'])),
  };
};
