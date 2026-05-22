import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

export const usePermissionConfig = () => {
  return {
    /*
     * 权限控制【款式生产资料-大货资料-分单】
     * */
    FD: computed(() => has('SDP-KSZLGL-DHZL-FD')),
    /*
     * 控权限控制【款式生产资料-大货资料-撤回】
     * */
    CH: computed(() => has('SDP-KSZLGL-DHZL-CH')),
    /**
     * 权限控制【款式生产资料—内部大货资料-查询详情】
     */
    NBXQ: computed(() => has('SDP-KSZLGL-DHZL-NBXQ')),
    /**
     * 权限控制【款式生产资料—内部大货资料-编辑】
     */
    NBBJ: computed(() => has('SDP-KSZLGL-DHZL-NBBJ')),
    /**
     * 权限控制【款式生产资料—外部大货资料-查询详情】
     */
    WBXQ: computed(() => has('SDP-KSZLGL-DHZL-WBXQ')),
    /**
     * 权限控制【款式生产资料—外部大货资料-编辑】
     */
    WBBJ: computed(() => has('SDP-KSZLGL-DHZL-WBBJ')),
  };
};
