<template>
  <el-table :data="tableData" border>
    <el-table-column label="物料项目" prop="prototypeMaterialName" />
    <el-table-column label="品名" prop="commodityName" />
    <el-table-column label="物料SPU" prop="commodityCode" />
    <el-table-column label="货号" prop="commodityNumber" />
    <el-table-column label="供应商关系" prop="relation" />
    <el-table-column label="商品类型" prop="commodityType">
      <template #default="{ row }">
        {{ $filters.getEnumLabel(LARGE_BOM_COMMODITY_TYPE_LIST, row.commodityType) }}
      </template>
    </el-table-column>
    <el-table-column label="使用部位" prop="partUse">
      <template #default="{ row }">
        {{ getLabelsByCodes(row.partUse) }}
      </template>
    </el-table-column>
    <el-table-column label="单件用量" prop="dosageAccount" />
    <el-table-column
      label="单件损耗用量"
      prop="singlePieceLossAmount"
      min-width="100px"
    >
      <template #default="{ row }">
        {{ NP.round(NP.times(row.dosageAccount, NP.plus(1, row.attritionRate)), 2) }}
      </template>
    </el-table-column>
    <el-table-column label="单位" prop="dosageAccountUnit" />
    <el-table-column
      label="损耗率（%）"
      prop="attritionRate"
      min-width="90px"
    >
      <template #default="{ row }">
        {{ NP.times(row.attritionRate, 100) }}
      </template>
    </el-table-column>
    <el-table-column
      label="备注"
      width="120px"
    >
      <template #default="{ row }">
        <div class="tw-flex tw-flex-col">
          <remark-record
            v-model="row.materialRemarkList"
            disabled
            name-key="createdName"
            time-key="createdTime"
            desc-key="remark"
          />
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue';
import { IV1ProdBomBomOrderMaterialListItem } from '../../../../api/types';
import { LARGE_BOM_COMMODITY_TYPE_LIST } from '../../../../constant';
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
