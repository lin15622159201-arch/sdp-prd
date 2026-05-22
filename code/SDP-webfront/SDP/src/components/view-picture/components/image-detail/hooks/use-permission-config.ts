import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

export const usePermissionConfig = () => {
  return {
    /**
     * 查看
     * 控制：灵感中心-AI设计任务-查看
     */
    CK: computed(() => has('FASHION-LGZX-AISJRW-CK')),
    /*
     * 复制
     * 控制：灵感中心-AI设计任务-复制
     * */
    FZ: computed(() => has('FASHION-LGZX-AISJRW-FZ')),
    /*
     * 删除
     * 控制：灵感中心-AI设计任务-删除
     * */
    SC: computed(() => has('FASHION-LGZX-AISJRW-SC')),
    /*
     * 重试
     * 控制：灵感中心-AI设计任务-重试
     * */
    CS: computed(() => has('FASHION-LGZX-AISJRW-CS')),
    /*
     * 新增任务
     * 控制：灵感中心-AI设计任务-新增任务
     * */
    XZRW: computed(() => has('FASHION-LGZX-AISJRW-XZRW')),
    /*
     * 详情
     * 控制：灵感中心-AI设计任务-详情
     * */
    XQ: computed(() => has('FASHION-LGZX-AISJRW-XQ')),
    /*
     * 编辑
     * 控制：灵感中心-AI设计任务-编辑
     * */
    BJ: computed(() => has('FASHION-LGZX-AISJRW-BJ')),
    /*
     * 中止
     * 控制：灵感中心-AI设计任务-AI设计任务详情-中止
     * */
    ZZ: computed(() => has('FASHION-LGZX-AISJRW-ZZ')),
    /*
     * 删除灵感
     * 控制：灵感中心-AI设计任务-AI设计任务详情-删除灵感
     * */
    SCLG: computed(() => has('FASHION-LGZX-AISJRW-SCLG')),
    /*
     * 复制链接
     * 控制：灵感中心-AI设计任务-AI设计任务详情-复制链接
     * */
    FZLJ: computed(() => has('FASHION-LGZX-AISJRW-FZLJ')),

    /*
     * 面料咨询
     * 控制：灵感中心-AI设计任务-AI设计任务详情-面料咨询
     * */
    MLZX: computed(() => has('FASHION-LGZX-AISJRW-MLZX')),
    /*
     * 关联需求跳转
     * 控制：灵感中心-AI设计任务-AI设计任务详情-关联需求跳转
     * */
    GLXQ: computed(() => has('FASHION-LGZX-AISJRW-GLXQ')),
    /*
     * 发起打版
     * 控制：灵感中心-AI设计任务-AI设计任务详情-发起打版
     * */
    FQDB: computed(() => has('FASHION-LGZX-AISJRW-FQDB')),
    /**
     * 款式衍生
     * 控制：灵感中心-AI设计任务-AI设计任务详情-款式衍生
     */
    KSYS: computed(() => has('FASHION-LGZX-AISJRW-KSYS')),
    /**
     * 花型工作台
     */
    HXGZT: computed(() => has('FASHION-LGZX-HXGZT')),
    /**
     * 选择模特
     */
    MTXZ: computed(() => has('FASHION-LGZX-AISJRW-MTXZ')),
    /**
     * 选择场景
     */
    CJXZ: computed(() => has('FASHION-LGZX-AISJRW-CJXZ')),
    /**
     * 模特新增
     */
    XZMT: computed(() => has('FASHION-LGZX-AISJRW-XZMT')),
    /**
     * 场景新增
     */
    XZCJ: computed(() => has('FASHION-LGZX-AISJRW-XZCJ')),
    /**
     * 模型选择
     */
    MXXZ: computed(() => has('FASHION-LGZX-AISJRW-MXXZ')),
    /**
     * AI标题
     */
    AIBT: computed(() => has('FASHION-LGZX-AISJRW-AIBT')),
  };
};
