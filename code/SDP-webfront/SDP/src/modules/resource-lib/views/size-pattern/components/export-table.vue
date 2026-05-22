<script lang="ts">
import type { PropType } from 'vue';
import { computed, ref, defineComponent, nextTick } from 'vue';
import type {
  IPatternClothesSizePagePatternClothesSizeListItem,
  IPatternClothesSizePageListItem,
} from '@/modules/resource-lib/api/types';
import type { VxeTableInstance } from 'vxe-table';
import { useInstall } from '@/components/vxe-table';

export default defineComponent({
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
    designCode: String,
    styleCode: String,
  },
  setup(props) {
    useInstall();

    const formData = computed(() => {
      const { row } = props;
      const goodsType = props.categoryName?.split('-')[1] || props.categoryName?.split('-')[0];

      const sampleClothesSize = `样衣尺寸(${row!.sampleClothesSize})`;
      const patternSize = `纸样尺寸(${row!.patternSize})`;

      return { goodsType, sampleClothesSize, patternSize };
    });

    const listData = computed(() => {
      return props?.data?.map((item) => {
        return {
          ...item,
          dimension: `X${item.dimension}`,
          tolerance: `±${item.tolerance}`,
        };
      }) || [];
    });
    const vxeTable = ref<VxeTableInstance>();

    const exportData = async () => {
      await nextTick();
      await vxeTable.value?.exportData({
        filename: `开发尺寸表-${props.designCode}`,
        sheetName: props.designCode,
        type: 'xlsx',
        // message: false,
      });
    };

    return {
      listData,
      exportData,
      formData,
      vxeTable,
    };
  },
});
</script>

<template>
  <vxe-table
    ref="vxeTable"
    :data="listData"
    border
    class="invisible"
  >
    <vxe-colgroup title="开发尺寸表">
      <vxe-colgroup :title="designCode">
        <vxe-column
          title="部位"
          align="center"
          field="positionName"
        />
        <vxe-column
          title="尺寸维度"
          align="center"
          field="dimension"
        >
          <template #edit="{ row }">
            X{{ row.dimension }}
          </template>
        </vxe-column>
      </vxe-colgroup>
      <vxe-colgroup :title="styleCode">
        <vxe-column
          width="350px"
          title="量法"
          align="center"
          field="measuringMethod"
        />
        <vxe-column
          title="客户要求尺寸"
          align="center"
          field="size"
        />
      </vxe-colgroup>
      <vxe-colgroup :title="`商品品类：${categoryName}`">
        <vxe-column
          :title="formData.sampleClothesSize"
          align="center"
          field="sampleClothesSize"
        />
        <vxe-column
          :title="formData.patternSize"
          align="center"
          field="patternSize"
        />
        <vxe-column
          title="允差范围"
          align="center"
          field="tolerance"
        />
      </vxe-colgroup>
    </vxe-colgroup>
  </vxe-table>
</template>

<style lang="scss" scoped>
.invisible {
  position: fixed;
  opacity: 0;
  right: -1000%;
  width: 1200px;
  pointer-events: none;
}
</style>
