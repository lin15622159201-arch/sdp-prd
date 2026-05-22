import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

export const usePermissionConfig = () => {
  return {
    /**
     * 查看
     */
    CK: computed(() => has('FASHION-AIGZT-TPXF-CK')),
    /*
     * 复制
     * */
    FZ: computed(() => has('FASHION-AIGZT-TPXF-FZ')),
    /*
     * 删除
     * */
    SC: computed(() => has('FASHION-AIGZT-TPXF-SC')),
    /*
     * 重试
     * */
    CS: computed(() => has('FASHION-AIGZT-TPXF-CS')),
    /*
     * 新增任务
     * */
    XZRW: computed(() => has('FASHION-AIGZT-TPXF-XZRW')),
    /*
     * 编辑
     * */
    // BJ: computed(() => has('FASHION-AIGZT-TPXF-BJ')),
    /*
     * 中止
     * */
    ZZ: computed(() => has('FASHION-AIGZT-TPXF-ZZ')),
  };
};
