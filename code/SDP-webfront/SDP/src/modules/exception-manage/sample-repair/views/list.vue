<!-- 样衣返修列表 -->
<template>
  <div class="tw-flex tw-w-full tw-h-full tw-bg-#fff tw-rounded">
    <left-menu-tree
      :list="menuList"
      v-model:active-menu="activeMenu"
      @change-menu="hanldeChangeMenu"
    />
    <div class="tw-flex-1 tw-h-full">
      <div class="tw-w-full tw-h-full tw-relative">
        <!-- 全部 -->
        <all v-if="activeMenu === MENU_RESOURCE_URL_ENUM.ALL" />
        <!-- 返修分单 -->
        <sample-order v-if="activeMenu === MENU_RESOURCE_URL_ENUM.REPAIR" @get-counts="countsUpdate" />
        <!-- 内部返修 -->
        <inner-sample v-if="activeMenu === MENU_RESOURCE_URL_ENUM.INNER" @get-counts="countsUpdate" />
        <!-- 外部返修：待接单、返修中、收货、确认耗时 -->
        <outer-sample
          v-if="OUTER_SAMPLE_ARR.includes(activeMenu)"
          :active-menu="activeMenu"
          @get-counts="countsUpdate"
        />
        <!-- 已完成 -->
        <completed v-if="activeMenu === MENU_RESOURCE_URL_ENUM.COMPLETED" />
        <!-- 已取消 -->
        <cancelled v-if="activeMenu === MENU_RESOURCE_URL_ENUM.CANCELLED" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import { MENU_RESOURCE_URL_ENUM, useMenuList } from '../hooks/use-left-menu';
import All from '../components/all.vue';
import SampleOrder from '../components/sample-order.vue';
import InnerSample from '../components/inner-sample.vue';
import OuterSample from '../components/outer-sample.vue';
import Completed from '../components/completed.vue';
import Cancelled from '../components/cancelled.vue';

const OUTER_SAMPLE_ARR = [
  MENU_RESOURCE_URL_ENUM.OUTER_WAIT_ORDER,
  MENU_RESOURCE_URL_ENUM.OUTER_REPAIRING,
  MENU_RESOURCE_URL_ENUM.OUTER_RECEIVE,
  MENU_RESOURCE_URL_ENUM.OUTER_CONFIRMATION_TIME,
];
const activeMenu = ref<MENU_RESOURCE_URL_ENUM>(MENU_RESOURCE_URL_ENUM.ALL);
const { menuList, countsUpdate } = useMenuList();
const hanldeChangeMenu = (val: string) => {
  console.log('changeMenu==', val);
  countsUpdate();
};

onBeforeMount(() => {
  countsUpdate();
});

</script>

<style lang="scss" scoped>
:deep(.sc-app-page .sc-app-page-layout-center-fheader) {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  padding-bottom: 12px;
  box-shadow: 0 2px 6px rgba(0, 21, 41, 0.1);
  margin-bottom: 10px;
}
:deep(.sc-app-page .sc-app-page-layout-center-main) {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
