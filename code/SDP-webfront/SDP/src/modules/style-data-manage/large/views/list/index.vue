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
          :stateInfo="stateInfo"
          @updateCount="getMenusNodeCount"
        />
      </div>
    </template>
  </sc-app-page>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ChildMenu from '@/modules/common/components/child-menu/index.vue';
import { getMenus, ASIDE_TYPE_ENUM, IMenuItem } from '../../constant/menus';
import dispatch from '../components/dispatch/index.vue';
import innerHandle from '../components/inner-handle/index.vue';
import outerHandle from '../components/outer-handle/index.vue';
import { useStepState } from '@/modules/clothes-center/hooks/use-step-state';
import { styleInfoStatistics } from '../../api';
import NP from 'number-precision';
import { IStyleInfoStatisticsRes } from '../../api/types';

const route = useRoute();
const router = useRouter();

const defaultMenu = ASIDE_TYPE_ENUM.DISPATCH;
const { menusList } = useStepState();

// 动态获取当前路由的菜单 key
const currentSubMenu: any = computed(() => route.query.componentName || defaultMenu);

const componentMap: any = {
  [ASIDE_TYPE_ENUM.DISPATCH]: dispatch,
  [ASIDE_TYPE_ENUM.INNER_HANDLE]: innerHandle,
  [ASIDE_TYPE_ENUM.OUTER_HANDLE]: outerHandle,
} as const;

const stateInfo = ref<IStyleInfoStatisticsRes>({});
const getMenusNodeCount = async () => {
  const list = getMenus();
  try {
    const { data }: any = await styleInfoStatistics();
    stateInfo.value = data;
    list.forEach((item: IMenuItem) => {
      item.count = (item.props || []).reduce((sum, propKey) => {
        return NP.plus(sum, data[propKey] ?? 0);
      }, 0);
    });
    menusList.value = list;
  } catch (error) {
    menusList.value = list;
  }
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
    getMenusNodeCount();
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
:deep(.el-menu--vertical .el-menu-item.is-active) {
  color: var(--el-color-primary) !important;
}
</style>
