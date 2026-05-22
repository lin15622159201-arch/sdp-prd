<template>
  <el-dialog
    v-model="selfVisible"
    title="开发尺寸表"
    center
    width="70%"
    :close-on-click-modal="false"
    append-to-body
    @close="handleClose"
  >
    <el-form
      ref="formRef"
      :model="formData"
      label-width="80px"
      style="width:50%"
    >
      <el-form-item
        label="商品类型"
        prop="goodsType"
      >
        <el-input
          v-model="formData.goodsType"
          :disabled="true"
        />
      </el-form-item>
    </el-form>

    <el-table
      :data="data"
      border
      style="width: 100%"
    >
      <el-table-column
        label="部位"
        align="center"
        prop="positionName"
      />
      <el-table-column
        label="尺寸维度"
        align="center"
        prop="dimension"
      >
        <template #default="{ row }">
          <span>
            X{{ row.dimension }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="量法"
        align="center"
        prop="measuringMethod"
      />
      <!-- <el-table-column
        label="客户要求尺寸"
        align="center"
        prop="size"
      /> -->
      <el-table-column
        :label="formData.sampleClothesSize"
        align="center"
        prop="sampleClothesSize"
      />
      <el-table-column
        :label="formData.patternSize"
        align="center"
        prop="patternSize"
      />
      <el-table-column
        label="允差范围"
        align="center"
        prop="tolerance"
      >
        <template #default="{ row }">
          <span>
            ±{{ row.tolerance }}
          </span>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose()">
          关 闭
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, computed } from 'vue';
import useDialogVisible from '@/hooks-transfer/use-dialog-visible';
import type {
  IPatternClothesSizePagePatternClothesSizeListItem,
  IPatternClothesSizePageListItem,
} from '@/modules/resource-lib/api/types';

export default defineComponent({
  name: 'SizeTable',
  props: {
    categoryName: {
      require: true,
      type: String,
    },
    data: {
      require: true,
      type: Array as PropType<IPatternClothesSizePagePatternClothesSizeListItem[]>,
    },
    row: {
      require: true,
      type: Object as PropType<IPatternClothesSizePageListItem>,
    },

  },
  setup(props, { emit }) {
    const { visible: selfVisible } = useDialogVisible(props, emit);

    const formData = computed(() => {
      const goodsType = props.categoryName?.split('-')[1] || props.categoryName?.split('-')[0];

      const sampleClothesSize = `样衣尺寸(${props.row!.sampleClothesSize})`;
      const patternSize = `纸样尺寸(${props.row!.patternSize})`;

      return { goodsType, sampleClothesSize, patternSize };
    });

    const handleClose = () => {
      selfVisible.value = false;
    };
    return {
      handleClose,
      selfVisible,
      formData,
    };
  },
});
</script>
<style scoped lang="scss">
  .dialog-footer{
    text-align: right;
  }
</style>
