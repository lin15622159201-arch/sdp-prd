<template>
  <div class="tw-h-full tw-w-full">
    <sc-detail-card title="打版参考尺寸">
      <div class="tw-flex tw-my[10px]">
        <div class="tw-w-[50%]">
          <span class="required">版房品类：</span>
          {{auditCraftOrderDetailVo?.referSize?.roomCategoryName || ''}}
        </div>
        <div>
          <span class="required">纸样尺寸：</span>
          {{auditCraftOrderDetailVo?.referSize?.patternSize || ''}}
        </div>
      </div>
      <div>
        <sc-table
          height="300px"
          :data="sizeTableList"
          :columns="sizeTableColumns"
        />
      </div>
    </sc-detail-card>
    <sc-detail-card title="工艺说明要求">
      <div>
        <div class="required">裁剪要求：</div>
        <div v-html="getDefaultHtml(auditCraftOrderDetailVo?.cuttingRequire || cuttingRequireDefault)" />
      </div>
      <div class="tw-my[10px]">
        <div class="tw-mb[10px] required">车缝要求：</div>
        <div>
          <sc-table
            height="300px"
            :data="sewProcessList"
            :columns="designTableColumns"
            :span-method="componentSpanMethod"
          />
        </div>
      </div>
      <div>
        <div class="tw-my[10px] required">尾部要求：</div>
        <div v-html="getDefaultHtml(auditCraftOrderDetailVo?.tailRequire || tailRequireDefault)" />
      </div>
    </sc-detail-card>
  </div>
</template>

<script lang="ts" setup>
import {
  ISampleClothesInfoDetailRes
} from '@/modules/clothes-center/api/types';
import {
  useDesignTableColumns
} from '@/modules/clothes-center/components/process-dialog/hooks/use-design-table-columns';
import { useSizeTableColumns } from '@/modules/clothes-center/components/process-dialog/hooks/use-size-table-columns';
import { cuttingRequireDefault, tailRequireDefault } from '@/modules/clothes-center/constant';
import { computed, PropType } from 'vue';
import {
  SpanMethodProps
} from '@/modules/clothes-center/components/sew-require-card/hooks/use-table-list/type';
import useSewTableList from '@/modules/clothes-center/components/sew-require-card/hooks/use-table-list';

const props = defineProps({
  detailObj: {
    type: Object as PropType<ISampleClothesInfoDetailRes>,
    default: () => ({}),
  },
});

const auditCraftOrderDetailVo = computed(() => props.detailObj?.auditCraftOrderDetailVo);

const referSize = computed(() => auditCraftOrderDetailVo.value?.referSize);

const { sizeTableColumns } = useSizeTableColumns({ referSize } as any);
const { designTableColumns } = useDesignTableColumns();

const sizeTableList = computed(() => {
  if (!referSize.value) return [];
  return referSize.value?.sizeTable || [];
});

const { convertToArray } = useSewTableList();
const sewProcessList = computed(() => {
  return convertToArray(auditCraftOrderDetailVo.value?.sewRequire || []);
});

const getDefaultHtml = (val: string) => {
  if (val) {
    return val.replace(/\n/g, '<br/>');
  }
  return '';
};

/**
   * @description 表格合并行处理
   * @param { row, column, rowIndex, columnIndex }
   * @returns { rowspan: number; colspan: number; }
   */
const componentSpanMethod = ({ row, column, rowIndex, columnIndex }: SpanMethodProps) => {
  const firstCol: Record<string, { rowspan: number; colspan: number; }> = {};
  const secondCol: Record<string, { rowspan: number; colspan: number; }> = {};
  sewProcessList.value.forEach((item) => {
    const [firstId, secondId] = item.parentId.split(',');
    if (!firstCol[firstId]) {
      firstCol[firstId] = {
        rowspan: 1,
        colspan: 1,
      };
    } else {
      firstCol[firstId].rowspan += 1;
    }
    if (!secondCol[secondId]) {
      secondCol[secondId] = {
        rowspan: 1,
        colspan: 1,
      };
    } else {
      secondCol[secondId].rowspan += 1;
    }
  });
  const [firstId, secondId] = sewProcessList.value[rowIndex].parentId.split(',');
  if (columnIndex === 0) {
    // 如果不是第一个出现的 `id`，返回 [0, 0]，表示合并到上一行
    if (rowIndex > 0 && sewProcessList.value[rowIndex - 1].parentId.includes(firstId)) {
      return [0, 0];
    }
    return firstCol[firstId]; // 返回合并的行数和列数
  }
  if (columnIndex === 1) {
    // 如果不是第一个出现的 `id`，返回 [0, 0]，表示合并到上一行
    if (rowIndex > 0 && sewProcessList.value[rowIndex - 1].parentId.includes(secondId)) {
      return [0, 0];
    }
    return secondCol[secondId]; // 返回合并的行数和列数
  }
  return [1, 1];
};

</script>
