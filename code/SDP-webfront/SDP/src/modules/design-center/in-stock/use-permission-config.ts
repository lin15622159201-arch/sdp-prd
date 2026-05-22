import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

export const usePermissionConfig = () => {
  return {
    /*
    * 设计师变更
    * 控制:设计中心-现货管理-设计师变更
    * 跳转路由名称：
    * */
    SJSBG: computed(() => has('SDP-SJZX-XHGL-SJSBG')),
    /*
    * 下载图片
    * 控制:设计中心-现货管理-下载图片
    * 跳转路由名称：
    * */
    XZTP: computed(() => has('SDP-SJZX-XHGL-XZTP')),
    /*
    * 上传图片
    * 控制:设计中心-现货管理-上传图片
    * 跳转路由名称：
    * */
    SCTP: computed(() => has('SDP-SJZX-XHGL-SCTP')),
    /*
    * 导出
    * 控制:设计中心-现货管理-导出
    * 跳转路由名称：
    * */
    DC: computed(() => has('SDP-SJZX-XHGL-DC')),
    /*
    * 新建款号
    * 控制:设计中心-现货管理-新建款号
    * 跳转路由名称：
    * */
    XJKH: computed(() => has('SDP-SJZX-XHGL-XJKH')),
    /*
    * 取消
    * 控制:设计中心-现货管理-取消
    * 跳转路由名称：
    * */
    QX: computed(() => has('SDP-SJZX-XHGL-QX')),
    /*
    * SPU详情
    * 控制:设计中心-现货管理-SPU详情
    * 跳转路由名称：
    * */
    SPUXQ: computed(() => has('SDP-SJZX-XHGL-SPUXQ')),
    /*
    * 编辑SPU
    * 控制:设计中心-现货管理-编辑SPU
    * 跳转路由名称：
    * */
    BJSPU: computed(() => has('SDP-SJZX-XHGL-BJSPU')),
    /*
    * 编辑SKC
    * 控制:设计中心-现货管理-编辑SKC
    * 跳转路由名称：
    * */
    BJSKC: computed(() => has('SDP-SJZX-XHGL-BJSKC')),
    /*
    * 复色
    * 控制:设计中心-现货管理-复色
    * 跳转路由名称：
    * */
    FS: computed(() => has('SDP-SJZX-XHGL-FS')),
    /*
    * 操作日志
    * 控制:设计中心-现货管理-操作日志
    * 跳转路由名称：
    * */
    CZRZ: computed(() => has('SDP-SJZX-XHGL-CZRZ')),
    /*
    * 设计中心-现货管理-推送上架
    */
    TSSJ: computed(() => has('SDP-SJZX-XHGL-TSSJ')),
    /*
    * 设计中心-现货管理-推送买手系统
    */
    TSMSXT: computed(() => has('SDP-SJZX-XHGL-TSMSXT')),
    /*
    * 分组-全部
    * */
    QBFZ: computed(() => has('SDP-SJZX-XHGL-QBFZ')),
    /*
    * 分组-组内
    * */
    QBZN: computed(() => has('SDP-SJZX-XHGL-QBZN')),
    /*
    * 分组-我的
    * */
    QBWD: computed(() => has('SDP-SJZX-XHGL-QBWD')),
  };
};
