<template>
  <component
    :is="componentMap[currentSubMenu]"
    :componentName="currentSubMenu"
    :menusList="menusList"
    :stepNodeStateCountData="stepNodeStateCountData"
    @updateCount="init"
    :laside="{
      style: {
        width: '230px'
      }
    }"
  >
    <template #laside>
      <div class="tw-h-[100%]">
        <child-menu :list="menusList" />
      </div>
    </template>
  </component>
</template>

<script lang="ts" setup>
import { computed, watch, DefineSetupFnComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getMenus, ASIDE_TYPE_ENUM } from './constant/menus';
import ChildMenu from '@/modules/common/components/child-menu/index.vue';
import CollectList from './pages/collect-list/index.vue';
import CarInsideCut from './pages/car/inside/pages/cut/list/index.vue';
import CarInsideSlice from './pages/car/inside/pages/slice/list/index.vue';
import CarInsideSeam from './pages/car/inside/pages/seam/list/index.vue';
import CarOutsideCut from './pages/car/outside/pages/cut/list/index.vue';
import CarOutsideSlice from './pages/car/outside/pages/slice/list/index.vue';
import CarOutsideSeam from './pages/car/outside/pages/seam/list/index.vue';
import CarOutsideDelivery from './pages/car/outside/pages/delivery/list/index.vue';
import CarOutsideProductReprocess from './pages/car/product-reprocess/list/index.vue';
import QcList from './pages/car/qc-list/list/index.vue';
import OrderSeperate from './pages/car/order-seperate/index.vue';
import { useStepState } from '@/modules/clothes-center/hooks/use-step-state';

const route = useRoute();
const router = useRouter();
const { menusList, getStepNodeStateCountListAndUpdateMenu, stepNodeStateCountData } = useStepState();

const defaultMenu = ASIDE_TYPE_ENUM.COLLECTLIST;

// 动态获取当前路由的菜单 key
const currentSubMenu = computed(() => route.query.componentName as ASIDE_TYPE_ENUM || defaultMenu);

// 动态获取当前路由的组件
const componentMap: Record<ASIDE_TYPE_ENUM, DefineSetupFnComponent<any>> = {
  [ASIDE_TYPE_ENUM.COLLECTLIST]: CollectList,
  [ASIDE_TYPE_ENUM.CAR_ORDER_SEPERATE]: OrderSeperate,
  [ASIDE_TYPE_ENUM.CAR_INSIDE_CUT]: CarInsideCut,
  [ASIDE_TYPE_ENUM.CAR_INSIDE_SLICE]: CarInsideSlice,
  [ASIDE_TYPE_ENUM.CAR_INSIDE_SEAM]: CarInsideSeam,
  [ASIDE_TYPE_ENUM.CAR_OUTSIDE_CUT]: CarOutsideCut,
  [ASIDE_TYPE_ENUM.CAR_OUTSIDE_SEAM]: CarOutsideSeam,
  [ASIDE_TYPE_ENUM.CAR_OUTSIDE_SLICE]: CarOutsideSlice,
  [ASIDE_TYPE_ENUM.CAR_OUTSIDE_DELIVERY]: CarOutsideDelivery,
  [ASIDE_TYPE_ENUM.CAR_PRODUCT_REPROCESS]: CarOutsideProductReprocess,
  [ASIDE_TYPE_ENUM.CAR_QC_LIST]: QcList,
} as const;

const init = async () => {
  await getStepNodeStateCountListAndUpdateMenu(menusList.value);
};

// 监听路由变化，实时同步子菜单状态
watch(
  () => route.query.componentName,
  (newComponentName) => {
    if (!newComponentName) {
      router.replace({ query: { componentName: defaultMenu } });
    }
  },
  { immediate: true }
);

watch(
  () => route,
  () => {
    menusList.value = getMenus();
  },
  { immediate: true }
);

</script>

<style lang="scss" scoped>
:deep(.el-menu--vertical .el-menu-item.is-active) {
  color: var(--el-color-primary) !important;
}
</style>
