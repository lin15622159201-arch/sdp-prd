<template>
  <el-dialog
    v-model="show"
    title="上传结果"
    width="460px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    append-to-body
    @closed="close()"
  >
    <sc-table
      min-height="100px"
      max-height="400px"
      :columns="columns"
      :data="tableData"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close()">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import { computed } from 'vue';
import { IListItem } from '../views/list/types';
import { useTableColumns } from '@toy/business-components';
import { ISpotStyleBatchEditImageRes } from '../api/spot-style';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  tableData: {
    type: Array as PropType<ISpotStyleBatchEditImageRes>,
    default: () => [],
  },
});

interface IEmit {
  (e: 'update:modelValue', val: boolean): void;
  (e: 'close'): void;
}

const emits = defineEmits<IEmit>();

const show = computed({
  get: () => props.visible,
  set: (value: boolean) => emits('update:modelValue', value),
});

const close = () => {
  show.value = false;
};

const { columns } = useTableColumns<IListItem>(() => [
  {
    label: '文件夹名称',
    width: 120,
    prop: 'code',
  },
  {
    label: '上传状态',
    minWidth: 260,
    prop: 'message',
  }
]);
</script>
