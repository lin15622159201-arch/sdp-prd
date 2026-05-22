import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

export const usePermissionConfig = () => {
  return {
    /*
     * 灵感任务详情
     * 控制：灵感中心-灵感源列表-灵感任务详情
     * */
    LGRWXQ: computed(() => has('SDP-LGZX-LGY-LGRWXQ')),
    /*
     * 导出数据
     * 控制：灵感中心-灵感源列表-导出数据
     * */
    DCSJ: computed(() => has('SDP-LGZX-LGY-DCSJ')),
    /*
     * 导入灵感图
     * 控制：灵感中心-灵感源列表-导入灵感图
     * */
    DRLGT: computed(() => has('SDP-LGZX-LGY-DRLGT')),
    /*
     * 提交任务
     * 控制：灵感中心-灵感源列表-提交任务
     * */
    TJRW: computed(() => has('SDP-LGZX-LGY-TJRW')),
    /*
     * 删除
     * 控制：灵感中心-灵感源列表-删除
     * */
    SC: computed(() => has('SDP-LGZX-LGY-SC')),
    /*
     * 重新识别
     * 控制：灵感中心-灵感源列表-重新识别
     * */
    CXSB: computed(() => has('SDP-LGZX-LGY-CXSB')),
    /*
     * 编辑识别品类
     * 控制：灵感中心-灵感源列表-编辑识别品类
     * */
    BJSBPL: computed(() => has('SDP-LGZX-LGY-BJSBPL')),
  };
};
