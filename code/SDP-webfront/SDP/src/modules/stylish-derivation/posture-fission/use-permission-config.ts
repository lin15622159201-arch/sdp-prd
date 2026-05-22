import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

export const usePermissionConfig = () => {
  return {
    /**
     * 查看
     */
    CK: computed(() => has('FASHION-FGLB-FGLBLB-CK')),
    /*
     * 复制
     * */
    FZ: computed(() => has('FASHION-FGLB-FGLBLB-FZ')),
    /*
     * 删除
     * */
    SC: computed(() => has('FASHION-FGLB-FGLBLB-SC')),
    /*
     * 重试
     * */
    CS: computed(() => has('FASHION-FGLB-FGLBLB-CS')),
    /*
     * 新增任务
     * */
    XZRW: computed(() => has('FASHION-FGLB-FGLBLB-XZRW')),
    /*
     * 编辑
     * */
    // BJ: computed(() => has('FASHION-FGLB-FGLBLB-BJ')),
    /*
     * 中止
     * */
    ZZ: computed(() => has('FASHION-FGLB-FGLBLB-ZZ')),
  };
};
