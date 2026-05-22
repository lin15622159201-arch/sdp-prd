import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

export const usePermissionConfig = () => {
  return {
    /**
     * 查看
     * 控制：数码印花-AI素材-查看
     */
    CK: computed(() => has('FASHION-FGHYS-FGHYSRW-CK')),
    /*
     * 复制
     * 控制：数码印花-AI素材-复制
     * */
    FZ: computed(() => has('FASHION-FGHYS-FGHYSRW-FZ')),
    /*
     * 删除
     * 控制：数码印花-AI素材-删除
     * */
    SC: computed(() => has('FASHION-FGHYS-FGHYSRW-SC')),
    /*
     * 重试
     * 控制：数码印花-AI素材-重试
     * */
    CS: computed(() => has('FASHION-FGHYS-FGHYSRW-CS')),
    /*
     * 新增任务
     * 控制：数码印花-AI素材-新增任务
     * */
    XZRW: computed(() => has('FASHION-FGHYS-FGHYSRW-XZRW')),
    /*
     * 编辑
     * 控制：数码印花-AI素材-编辑
     * */
    // BJ: computed(() => has('FASHION-FGHYS-FGHYSRW-BJ')),
    /*
     * 中止
     * 控制：数码印花-AI素材-AI素材详情-中止
     * */
    ZZ: computed(() => has('FASHION-FGHYS-FGHYSRW-ZZ')),
  };
};
