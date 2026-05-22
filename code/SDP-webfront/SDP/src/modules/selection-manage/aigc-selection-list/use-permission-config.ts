import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

export const usePermissionConfig = () => {
  return {
    /*
     * 标记
     * 控制：选款管理-AIGC选款-标记
     * */
    BJ: computed(() => has('SDP-XKGL-AIGCXKLB-BJ')),
    /*
     * 选图记录
     * 控制：选款管理-AIGC选款-选图记录
     * */
    XTJL: computed(() => has('SDP-XKGL-AIGCXKLB-XTJL')),
    /*
     * 导入外部数据
     * 控制：选款管理-AIGC选款-导入外部数据
     * */
    DRWBSJ: computed(() => has('SDP-XKGL-AIGCXKLB-DRWBSJ')),
    /*
     * 导入外部数据
     * 控制：选款管理-AIGC选款-导入外部数据
     * */
    KSBJ: computed(() => has('SDP-XKGL-AIGCXKLB-KSBJ')),
  };
};
