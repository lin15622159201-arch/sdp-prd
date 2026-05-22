<template>
  <component
    :is="componentMap[activeAside]"
    :stateCount="stateCount"
    @getStateCount="getStateCount"
  >
    <template #laside>
      <left-aside
        :config="asideConfig"
        v-model="activeAside"
      />
    </template>
  </component>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { ASIDE_TYPE_ENUM } from './constant';
import LeftAside from './components/left-aside.vue';
import Dispatch from './components/dispatch/index.vue';
import InnerHandle from './components/inner-handle/index.vue';
import OuterHandle from './components/outer-handle/index.vue';
import { useRoute } from 'vue-router';
import { IGetCheckCountStatisticsRes } from '../../api/types';
import { getCheckCountStatistics } from '../../api';
import { plus } from 'number-precision';

const $route = useRoute();
const activeAside = ref<ASIDE_TYPE_ENUM>($route.query.type as ASIDE_TYPE_ENUM ?? ASIDE_TYPE_ENUM.DISPATCH);
const componentMap: {
  [ASIDE_TYPE_ENUM.DISPATCH] : typeof Dispatch;
  [ASIDE_TYPE_ENUM.INNER_HANDLE] : typeof InnerHandle;
  [ASIDE_TYPE_ENUM.OUTER_HANDLE] : typeof OuterHandle;
} = {
  [ASIDE_TYPE_ENUM.DISPATCH]: Dispatch,
  [ASIDE_TYPE_ENUM.INNER_HANDLE]: InnerHandle,
  [ASIDE_TYPE_ENUM.OUTER_HANDLE]: OuterHandle,
} as const;

const stateCount = ref<IGetCheckCountStatisticsRes>();
const getStateCount = async () => {
  const { data } = await getCheckCountStatistics();
  stateCount.value = data;
};
const asideConfig = computed(() => {
  return [
    {
      value: ASIDE_TYPE_ENUM.DISPATCH,
      label: '用量核算分单',
      count: stateCount?.value?.unallocatedCount || '0'
    },
    {
      value: ASIDE_TYPE_ENUM.INNER_HANDLE,
      label: '内部处理',
      count: stateCount?.value?.internalUncheckedCount || '0'
    },
    {
      value: ASIDE_TYPE_ENUM.OUTER_HANDLE,
      label: '外部处理',
      count: plus(
        stateCount?.value?.externalUnReceivingCount || '0',
        stateCount?.value?.externalUncheckedCount || '0',
      )
    },
  ];
});
</script>
