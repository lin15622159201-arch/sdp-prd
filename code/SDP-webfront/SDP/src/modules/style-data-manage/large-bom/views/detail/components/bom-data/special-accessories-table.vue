<template>
  <el-table :data="tableData" border>
    <el-table-column label="物料项目" prop="prototypeMaterialName" />
    <el-table-column label="物料SPU" prop="commodityCode" />
    <el-table-column label="货号" prop="commodityNumber" />
    <el-table-column label="使用部位" prop="partUse">
      <template #default="{ row }">
        {{ getLabelsByCodes(row.partUse) }}
      </template>
    </el-table-column>
    <el-table-column label="物料属性" prop="skuAttrs">
      <template #default="{ row }">
        <div>
          <p v-for="attr in JSON.parse(row.skuAttrs || '[]')" :key="attr.attrId">
            <b>{{ attr.attrName }}：</b>
            {{ attr.attrValue }}
          </p>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="单件损耗用量" prop="singlePieceLossAmount">
      <template #default="{ row }">
        {{ NP.round(NP.times(row.dosageAccount, NP.plus(1, row.attritionRate)), 2) }}
      </template>
    </el-table-column>
    <el-table-column label="单位" prop="dosageAccountUnit" />
    <el-table-column label="损耗（%）" prop="attritionRate">
      <template #default="{ row }">
        {{ NP.times(row.attritionRate, 100) }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue';
import { IV1ProdBomBomOrderMaterialListItem } from '../../../../api/types';
import { getLabelsByCodes } from '../../hooks/use-get-labels-by-codes';
import NP from 'number-precision';

const props = defineProps({
  data: {
    type: Array as PropType<IV1ProdBomBomOrderMaterialListItem[]>,
    default: () => [],
  },
});

const tableData = computed(() => props.data);
</script>
