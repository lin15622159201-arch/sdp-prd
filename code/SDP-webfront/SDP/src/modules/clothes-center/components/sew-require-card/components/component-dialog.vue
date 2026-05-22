<template>
  <el-dialog
    :modelValue="props.visible"
    title="部件添加"
    center
    custom-class="el-dialog-inner-scroll"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    append-to-body
    @close="handleClose"
    @open="handleOpen"
  >
    <el-form :inline="true" :model="params">
      <el-form-item label="部件名称" class="tw-w[200px]">
        <el-input
          v-model="params.user"
          placeholder="请输入"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
    <sc-table
      height="100%"
      :data="tableData"
      :columns="tableColumns"
      @selection-change="handleSelectionChange"
    />
    <template #footer>
      <el-button @click="handleClose">
        取 消
      </el-button>
      <el-button type="primary" @click="handleConfirm">
        确 定
      </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useListColumns } from '../hooks/use-select-table-columns';

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
});

const emits = defineEmits(['update:visible', 'confirm']);
const { tableColumns } = useListColumns();
const params = ref({
  componentName: '',
  user: '',
});
const tableData = ref<any[]>([]);

// 多选
const multiSelectList = ref<any[]>([]);
const handleSelectionChange = (list: any[]) => {
  multiSelectList.value = list;
};

const getList = async () => {
  try {
    // const res = await getListApi();
    tableData.value = [];
  } catch (error) {
    tableData.value = [];
  }
};

const handleSearch = () => {
  getList();
};

const handleOpen = () => {
  multiSelectList.value = [];
  getList();
};

const handleClose = () => {
  emits('update:visible', false);
};

const handleConfirm = async () => {
  if (!multiSelectList.value.length) {
    ElMessage.warning('请选择部件');
    return;
  }
  emits('confirm', multiSelectList.value);
  handleClose();
};

</script>
