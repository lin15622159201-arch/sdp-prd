<template>
  <el-dialog
    v-model="selfVisible"
    title="大货尺寸表"
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
        prop="position"
      />
      <el-table-column
        label="尺寸维度"
        align="center"
        prop="sizeDimension"
      >
        <template #default="{ row }">
          <span>
            X{{ row.sizeDimension }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="量法"
        align="center"
        prop="measureWay"
      />
      <el-table-column
        :label="formData.sampleBaseTitle"
        align="center"
        prop="sampleSize"
        width="150px"
      />
      <el-table-column
        :label="formData.designBaseTitle"
        align="center"
        prop="designSize"
        width="150px"
      />
      <el-table-column
        label="跳码"
        align="center"
        prop="skipSizeQuotientList"
        width="180px"
      >
        <template #default="{ row }">
          <p
            v-for="item of row.skipSizeQuotientList"
            :key="item.size"
          >
            {{ item.size }}：{{ item.data }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        label="大货纸样"
        align="center"
        prop="size"
      >
        <el-table-column
          v-for="it of allSizeList"
          :key="it"
          :label="it"
          width="80px"
          align="center"
        >
          <template #default="{ row }">
            {{ getSizeCount(row.sizeList, it) }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        label="允差范围"
        align="center"
        prop="deviationRange"
      >
        <template #default="{ row }">
          <span>
            ±{{ getDeviationRange(row) }}
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
  IProdDesignSizePageStyleSizeInfoListItem,
} from '@/modules/resource-lib/api/types';
import { formatFloat } from '@toy/utils';

export default defineComponent({
  name: 'SizeTable',
  props: {
    categoryName: {
      require: true,
      type: String,
    },
    data: {
      require: true,
      type: Array as PropType<IProdDesignSizePageStyleSizeInfoListItem[]>,
    },
  },
  setup(props, { emit }) {
    const { visible: selfVisible } = useDialogVisible(props, emit);
    const formData = computed(() => {
      const goodsType = props.categoryName?.split('-')[1] || props.categoryName?.split('-')[0];
      const sampleBaseYardage = props.data?.[0].sampleBaseYardage;
      const designBaseYardage = props.data?.[0].designBaseYardage;
      const sampleBaseTitle = `样衣尺寸(${sampleBaseYardage})`;
      const designBaseTitle = `纸样尺寸(${designBaseYardage})`;
      return { goodsType, sampleBaseTitle, designBaseTitle };
    });

    const getDeviationRange = (row: any) => {
      return formatFloat(`${row.deviationRange}`);
    };

    const handleClose = () => {
      selfVisible.value = false;
    };
    return {
      getDeviationRange,
      handleClose,
      selfVisible,
      formData,
      allSizeList: computed(() => {
        const set = new Set();
        props.data?.forEach((item) => {
          item.sizeList.forEach((it) => {
            set.add(it.size);
          });
        });
        return [...set] as string[];
      }),
      getSizeCount(sizeList: IProdDesignSizePageStyleSizeInfoListItem['sizeList'], size: string) {
        return sizeList.find(it => it.size === size)?.data || '';
      },
    };
  },
});
</script>
<style scoped lang="scss">
 .dialog-footer {
    text-align: right;
  }
</style>
