import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

export const usePermissionConfig = () => {
  return {
    /*
     * 创建任务
     * 控制：灵感中心-花型提取-创建任务
     * */
    CJRW: computed(() => has('FASHION-LGZX-HXTQ-CJRW')),
    /*
     * 中止
     * 控制：灵感中心-花型提取-中止
     * */
    ZZ: computed(() => has('FASHION-LGZX-HXTQ-ZZ')),
    /*
     * 再次编辑
     * 控制：灵感中心-花型提取-再次编辑
     * */
    ZCBJ: computed(() => has('FASHION-LGZX-HXTQ-ZCBJ')),
    /*
     * 删除
     * 控制：灵感中心-花型提取-删除
     * */
    SC: computed(() => has('FASHION-LGZX-HXTQ-SC')),
    /*
     * 重试
     * 控制：灵感中心-花型提取-重试
     * */
    CS: computed(() => has('FASHION-LGZX-HXTQ-CS')),
  };
};
