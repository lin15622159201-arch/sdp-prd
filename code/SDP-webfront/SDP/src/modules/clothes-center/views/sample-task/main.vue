<template>
  <sc-app-page :laside="{ style: 'width: 180px' }">
    <template #laside>
      <div class="tw-h-[100%]">
        <child-menu :list="menusList" />
      </div>
    </template>
    <template #main>
      <div class="tw-h-[100%]">
        <component
          :is="componentMap[currentSubMenu]"
          :componentName="currentSubMenu"
          :menusList="menusList"
          :stepNodeStateCountData="stepNodeStateCountData"
          @updateCount="(p: any) => {
            init(p);
          }"
        />
      </div>
    </template>
  </sc-app-page>
</template>

<script lang="ts" setup>
import { computed, watch, DefineSetupFnComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getMenus, ASIDE_TYPE_ENUM } from './constant/menus';
import ChildMenu from '@/modules/common/components/child-menu/index.vue';
import SampleTaskOrder from './pages/order/list/index.vue';
import SampleTaskExternal from './pages/external/list/index.vue';
import SampleTaskInternal from './pages/internal/list/index.vue';
import { useStepState } from '@/modules/clothes-center/hooks/use-step-state';
import { PROCESS_STEP_CODE_ENUM } from '@/modules/clothes-center/constant';

const route = useRoute();
const router = useRouter();

const defaultMenu = ASIDE_TYPE_ENUM.SAMPLE_TASK_ORDER;
const { getStepNodeStateCountListAndUpdateMenu, menusList, stepNodeStateCountData } = useStepState();

// 动态获取当前路由的菜单 key
const currentSubMenu = computed(() => route.query.componentName as ASIDE_TYPE_ENUM || defaultMenu);

// 动态获取当前路由的组件
const componentMap: Record<ASIDE_TYPE_ENUM, DefineSetupFnComponent<any>> = {
  [ASIDE_TYPE_ENUM.SAMPLE_TASK_ORDER]: SampleTaskOrder,
  [ASIDE_TYPE_ENUM.SAMPLE_TASK_INSIDE]: SampleTaskInternal,
  [ASIDE_TYPE_ENUM.SAMPLE_TASK_OUTSIDE]: SampleTaskExternal,
} as const;

const init = async (p?: any) => {
  menusList.value = getMenus();
  getStepNodeStateCountListAndUpdateMenu(menusList.value, {
    ...p,
    clothesStep: PROCESS_STEP_CODE_ENUM.DIMENSION
  });
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
    init();
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
:deep(.el-menu--vertical .el-menu-item.is-active) {
  color: var(--el-color-primary) !important;
}
</style>
