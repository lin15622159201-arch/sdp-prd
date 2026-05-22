import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

export const usePermissionConfig = () => {
  return {
    /*
     * 权限控制：打版需求汇总-需求编辑
     * */
    BJ: computed(() => has('SDP-FZGCZX-DBXQHZ-XQBJ')),
    /*
     * 权限控制：打版需求汇总-取消需求
     * */
    QXXQ: computed(() => has('SDP-FZGCZX-DBXQHZ-QXXQ')),
  };
};
