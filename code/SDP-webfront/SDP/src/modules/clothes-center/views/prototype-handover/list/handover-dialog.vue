<template>
  <el-dialog
    :modelValue="props.visible"
    title="扫码交接"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    @close="handleClose"
    @open="handleOpen"
    :width="500"
    class="el-dialog-inner-scroll"
  >
    <div>
      <el-input
        ref="inputRef"
        v-model="code"
        @keyup.enter="getCollectList"
      />
      <div class="tw-my[10px] tw-text-danger">请扫描版单条码或连续输入SKC回车交接</div>
      <div v-if="tableData.length">
        <p class="tw-mb[10px]">本次交接</p>
        <sc-table
          height="200px"
          :data="tableData"
          :columns="tableColumns"
        />
      </div>
      <div class="tw-flex tw-flex-justify-end tw-py-10px">
        <el-button @click="handleClose">关闭</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue';
import { ElInput } from 'element-plus';
import { useHandoverTableColumns, ITableItem } from '../hooks/use-handover-table-columns';
import { takeOverSampleClothes } from '../api';
import { debounce } from 'lodash-es';

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
});

const emits = defineEmits(['update:visible', 'confirm']);
const inputRef = ref<InstanceType<typeof ElInput> | null>(null);
const code = ref('');
const tableData = ref<ITableItem[]>([]);
const { tableColumns } = useHandoverTableColumns();

const handleOpen = async () => {
  code.value = '';
  tableData.value = [];
  await nextTick();
  inputRef.value?.focus();
};
const handleClose = () => {
  emits('update:visible', false);
  if (tableData.value.length) {
    emits('confirm');
  }
};

const getCollectList = debounce(async () => {
  if (!code.value) return;
  let designCode = code.value;
  if (designCode.includes('^')) {
    designCode = designCode.split('^').at(-1)!;
  }
  const { data } = await takeOverSampleClothes({ designCode });
  if (data.length) {
    tableData.value.push({
      designCode: data[0]?.designCode,
      designerName: data[0]?.designerName,
    });
    code.value = '';
  }
}, 200);
</script>
