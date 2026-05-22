import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

export const usePermissionConfig = () => {
  const codeMap = {
    /** 复色 */
    'SDP-SJZX-KSGL-FS': 'SDP-SJZX-KSGL-FS',
    /** 打印版单 */
    'SDP-SJZX-KSGL-DYBD': 'SDP-SJZX-KSGL-DYBD',
    /** 设计师变更 */
    'SDP-SJZX-KSGL-SJSBG': 'SDP-SJZX-KSGL-SJSBG',
    /** 取消SKC */
    'SDP-SJZX-KSGL-QXSKC': 'SDP-SJZX-KSGL-QXSKC',
    /** 新建SPU */
    'SDP-SJZX-KSGL-XJSPU': 'SDP-SJZX-KSGL-XJSPU',
    /** 查看详情 */
    'SDP-SJZX-KSGL-CKXQ': 'SDP-SJZX-KSGL-CKXQ',
    /** 编辑SKC */
    'SDP-SJZX-KSGL-BJSKC': 'SDP-SJZX-KSGL-BJSKC',
    /** 发起打版 */
    'SDP-SJZX-KSGL-FQDB': 'SDP-SJZX-KSGL-FQDB',
    /** 编辑SPU */
    'SDP-SJZX-KSGL-BJSPU': 'SDP-SJZX-KSGL-BJSPU',
    /** 导出 */
    'SDP-SJZX-KSGL-DC': 'SDP-SJZX-KSGL-DC',
    /** 下载图片 */
    'SDP-SJZX-KSGL-XZTP': 'SDP-SJZX-KSGL-XZTP',
    /** 新建描稿任务 */
    'SDP-SJZX-KSGL-XJMGRW': 'SDP-SJZX-KSGL-XJMGRW',
    /** 发送到 */
    'SDP-SJZX-KSGL-FSD': 'SDP-SJZX-KSGL-FSD',
    /** 推送上架 */
    'SDP-SJZX-KSGL-TSSJ': 'SDP-SJZX-KSGL-TSSJ',
    'SDP-SJZX-KSGL-TSPLM': 'SDP-SJZX-KSGL-TSPLM'
  };
  return {
    /*
    * 复色
    * 控制:设计中心-款式管理-复色
    * 跳转路由名称：
    * */
    FS: computed(() => has(codeMap['SDP-SJZX-KSGL-FS'])),
    /*
    * 打印版单
    * 控制:设计中心-款式管理-打印版单
    * 跳转路由名称：
    * */
    DYBD: computed(() => has(codeMap['SDP-SJZX-KSGL-DYBD'])),
    /*
    * 设计师变更
    * 控制:设计中心-款式管理-设计师变更
    * 跳转路由名称：
    * */
    SJSBG: computed(() => has(codeMap['SDP-SJZX-KSGL-SJSBG'])),
    /*
    * 取消SKC
    * 控制:设计中心-款式管理-取消SKC
    * 跳转路由名称：
    * */
    QXSKC: computed(() => has(codeMap['SDP-SJZX-KSGL-QXSKC'])),
    /*
    * 新建SPU
    * 控制:设计中心-款式管理-新建SPU
    * 跳转路由名称：
    * */
    XJSPU: computed(() => has(codeMap['SDP-SJZX-KSGL-XJSPU'])),
    /*
    * 查看详情
    * 控制:设计中心-款式管理-查看详情
    * 跳转路由名称：DesignCenterStyleManageSkcDetail
    * */
    CKXQ: computed(() => has(codeMap['SDP-SJZX-KSGL-CKXQ'])),
    /*
    * 编辑SKC
    * 控制:设计中心-款式管理-编辑SKC
    * 跳转路由名称：DesignCenterStyleManageUpdateSkc
    * */
    BJSKC: computed(() => has(codeMap['SDP-SJZX-KSGL-BJSKC'])),
    /*
    * 发起打版
    * 控制:设计中心-款式管理-发起打版
    * 跳转路由名称：
    * */
    FQDB: computed(() => has(codeMap['SDP-SJZX-KSGL-FQDB'])),
    /*
    * 编辑SPU
    * 控制:设计中心-款式管理-编辑SPU
    * 跳转路由名称：
    * */
    BJSPU: computed(() => has(codeMap['SDP-SJZX-KSGL-BJSPU'])),
    /*
    * 导出
    * 控制:设计中心-款式管理-导出
    * 跳转路由名称：
    * */
    DC: computed(() => has(codeMap['SDP-SJZX-KSGL-DC'])),
    /*
    * 下载图片
    * 控制:设计中心-款式管理-下载图片
    * 跳转路由名称：
    * */
    XZTP: computed(() => has(codeMap['SDP-SJZX-KSGL-XZTP'])),
    /**
     * 新建描稿任务
     * 控制:设计中心-款式管理-新建描稿任务
     */
    XJMGRW: computed(() => has(codeMap['SDP-SJZX-KSGL-XJMGRW'])),
    /**
     * 发送到
     * 控制:设计中心-款式管理-发送到
     */
    FSD: computed(() => has(codeMap['SDP-SJZX-KSGL-FSD'])),
    /**
     * 推送上传
     * 控制:设计中心-款式管理-推送上架
     */
    TSSJ: computed(() => has(codeMap['SDP-SJZX-KSGL-TSSJ'])),
    /**
     * 推送plm
     * 控制:设计中心-款式管理-推送plm
     */
    TSPLM: computed(() => has(codeMap['SDP-SJZX-KSGL-TSPLM'])),
    /*
    * 分组-全部
    * */
    QBFZ: computed(() => has('SDP-SJZX-KSGL-QBFZ')),
    /*
    * 分组-组内
    * */
    QBZN: computed(() => has('SDP-SJZX-KSGL-QBZN')),
    /*
    * 分组-我的
    * */
    QBWD: computed(() => has('SDP-SJZX-KSGL-QBWD')),
  };
};
