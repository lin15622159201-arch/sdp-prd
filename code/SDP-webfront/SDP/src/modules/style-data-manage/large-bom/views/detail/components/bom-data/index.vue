<template>
  <el-tabs v-model="activeName">
    <el-tab-pane
      label="面料"
      :name="BOM_TAB_NAMES.FABRIC"
      :lazy="true"
    >
      <FabricTable
        :data="fabricList"
      />
    </el-tab-pane>
    <el-tab-pane
      label="辅料"
      :name="BOM_TAB_NAMES.ACCESSORIES"
      :lazy="true"
    >
      <AccessoriesTable
        :data="accessoriesList"
      />
    </el-tab-pane>
    <el-tab-pane
      label="工艺"
      :name="BOM_TAB_NAMES.CRAFT"
      :lazy="true"
    >
      <CraftTable
        :data="craftList"
        :list="bomOrderMaterialList"
      />
    </el-tab-pane>
    <el-tab-pane
      label="特殊辅料"
      :name="BOM_TAB_NAMES.SPECIAL_ACCESSORIES"
      :lazy="true"
    >
      <SpecialAccessoriesTable
        :data="specialAccessoriesList"
      />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { BOM_TAB_NAMES, LARGE_BOM_DEMAND_TYPE_ENUM } from '../../../../constant';
import FabricTable from './fabric-table.vue';
import AccessoriesTable from './accessories-table.vue';
import CraftTable from './craft-table.vue';
import SpecialAccessoriesTable from './special-accessories-table.vue';
import { IV1ProdBomBomOrderDetailVo } from '../../../../api/types';
import { computed, PropType, ref } from 'vue';

const props = defineProps({
  data: {
    type: Object as PropType<IV1ProdBomBomOrderDetailVo>,
    default: () => ({}),
  },
});

// bom详情
const bomOrderDetailVo = computed(() => props.data ?? {});
// 物料
const bomOrderMaterialList = computed(() => bomOrderDetailVo.value?.bomOrderMaterialList ?? []);
// 面料
const fabricList = computed(() => bomOrderMaterialList.value
  ?.filter(v => v.demandType === LARGE_BOM_DEMAND_TYPE_ENUM.FABRIC) ?? []);
// 辅料
const accessoriesList = computed(() => bomOrderMaterialList.value
  ?.filter(v => v.demandType === LARGE_BOM_DEMAND_TYPE_ENUM.ACCESSORIES) ?? []);
// 特殊辅料
const specialAccessoriesList = computed(() => bomOrderMaterialList.value
  ?.filter(v => v.demandType === LARGE_BOM_DEMAND_TYPE_ENUM.SPECIAL_ACCESSORIES) ?? []);
// 工艺
const craftList = computed(() => bomOrderMaterialList.value?.flatMap(v => v.craftDemandInfoList) ?? []);

const activeName = ref(BOM_TAB_NAMES.FABRIC);
</script>
