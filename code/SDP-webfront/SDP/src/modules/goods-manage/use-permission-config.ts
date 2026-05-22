import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

/**
 * 商品管理权限配置
 */
export const usePermissionConfig = () => {
  return {
    /* 待上架列表-发布商品 */
    FBSP: computed(() => has('POP-SPGL-DSJ-FBSP')),
    /* 待上架列表-审核 */
    SH: computed(() => has('POP-SPGL-DSJ-SH')),
    /* 待上架列表-编辑 */
    BJ: computed(() => has('POP-SPGL-DSJ-BJ')),
    /* 待上架列表-查看 */
    CK: computed(() => has('POP-SPGL-SPLB-BJSPXQ')),
    /* 商品列表-编辑商品 */
    BJSP: computed(() => has('POP-SPGL-SPLB-BJSP')),
    /* 商品列表-测价 */
    CJ: computed(() => has('POP-SPGL-SPLB-CJ')),
    /* 商品列表-编辑SKC */
    BJSPSKC: computed(() => has('POP-SPGL-SPLB-BJSPSKC')),
    /* 商品列表-编辑图片 */
    BJSPIMG: computed(() => has('POP-SPGL-SPLB-BJSPIMG')),
    /* 商品列表-查看详情 */
    BJSPCKXQ: computed(() => has('POP-SPGL-SPLB-BJSPCKXQ')),
  };
};
