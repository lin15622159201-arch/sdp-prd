<template>
  <el-table :data="tableData" border>
    <el-table-column label="序号" type="index" />
    <el-table-column label="工艺名" prop="category3">
      <template #default="{ row }">
        {{ row.category3 || row.category2 }}
      </template>
    </el-table-column>
    <el-table-column label="参考供应商" prop="factoryName" />
    <el-table-column label="供应商关系" prop="relation" />
    <el-table-column label="关联物料" prop="prototypeMaterialName">
      <template #default="{ row }">
        {{ getRelationMaterial(row.bomMaterialId) }}
      </template>
    </el-table-column>
    <el-table-column label="使用部位" prop="partUse">
      <template #default="{ row }">
        {{ getLabelsByCodes(row.positionRequirement) }}
      </template>
    </el-table-column>
    <el-table-column label="工艺次序" prop="craftsRequire">
      <template #default="{ row }">
        {{ $filters.getEnumLabel(CRAFTS_REQUIRE_LIST, row.craftsRequire) }}
      </template>
    </el-table-column>
    <el-table-column label="单件损耗用量" prop="singlePieceLossAmount">
      <template #default="{ row }">
        <span v-if="row.dosageAccount && row.attritionRate">
          {{ NP.round(NP.times(row.dosageAccount ?? 0, NP.plus(1, row.attritionRate ?? 0)), 2) }}
        </span>
      </template>
    </el-table-column>
    <el-table-column label="单位" prop="dosageAccountUnit">
      <template #default="{ row }">
        {{ row.dosageAccountUnit || (row.craftsRequire === CRAFTS_REQUIRE_ENUM.BEFORE ? '米' : '件') }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue';
import {
  IV1ProdBomCraftDemandInfoListItem,
  IV1ProdBomBomOrderMaterialListItem,
} from '../../../../api/types';
import { getLabelsByCodes } from '../../hooks/use-get-labels-by-codes';
import { CRAFTS_REQUIRE_LIST, CRAFTS_REQUIRE_ENUM } from '../../../../constant';
import NP from 'number-precision';

const props = defineProps({
  data: {
    type: Array as PropType<IV1ProdBomCraftDemandInfoListItem[]>,
    default: () => [],
  },
  list: {
    type: Array as PropType<IV1ProdBomBomOrderMaterialListItem[]>,
    default: () => [],
  },
});

const tableData = computed(() => props.data ?? []);
const bomOrderMaterialList = computed(() => props.list ?? []);

const getRelationMaterial = (id: string) => {
  const item = bomOrderMaterialList.value?.find(v => v.bomMaterialId === id);
  return item?.prototypeMaterialName ?? '';
};
</script>
