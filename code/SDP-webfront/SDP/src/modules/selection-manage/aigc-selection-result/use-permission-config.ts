import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

export const usePermissionConfig = () => {
  return {
    /*
     * 导出修图数据
     * 控制：选款管理-AIGC选款结果-导出修图数据
     * */
    DCXTSJ: computed(() => has('SDP-XKGL-AIGCXKJG-DCXTSJ')),
    /*
     * 查看详情
     * 控制：选款管理-AIGC选款结果-查看详情
     * */
    XQ: computed(() => has('SDP-XKGL-AIGCXKJG-XQ')),
    /*
     * 导出图片
     * 控制：选款管理-AIGC选款结果-导出图片
     * */
    DCTP: computed(() => has('SDP-XKGL-AIGCXKJG-DCTP')),
  };
};
