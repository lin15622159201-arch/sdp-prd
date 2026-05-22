<template>
  <el-dialog
    v-model="visible"
    title="选择工序明细"
    center
    :show-close="true"
    custom-class="el-dialog-inner-scroll"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    destroy-on-close
    append-to-body
    width="80%"
    top="5vh"
    @close="handleClose"
    @open="handleOpen"
  >
    <el-form
      :model="form"
      :inline="true"
      label-width="100px"
      class="search-form"
    >
      <el-form-item label="工序部件">
        <el-select
          v-model="form.componentName"
          filterable
          remote
          clearable
          :remote-method="remoteMethod"
          placeholder="请选择工序部件"
          :loading="loading"
        >
          <el-option
            v-for="item in componentList"
            :key="item.sewingComponentTemplateId"
            :label="item.componentName"
            :value="item.componentName"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工序名称">
        <el-input v-model="form.processName" clearable />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="getProcessList"
        >
          查询
        </el-button>
        <el-button @click="reset">
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
      :height="600"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        label="序号"
        width="60"
      >
        <template #default="{ $index }">
          {{ (pageData.currentPage - 1) * pageData.pageSize + $index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="工序部件" prop="componentName" />
      <el-table-column label="工序名称" prop="processName" />
      <el-table-column label="图片" prop="picture">
        <template #default="{ row }">
          <ImageViewer
            v-if="row?.picture"
            :list="[row.picture]"
          >
            <template #default="{ view }">
              <el-image
                :src="$filters.ossUrl(row?.picture)"
                class="img-thumbnail__table"
                fit="cover"
                @click="view"
              />
            </template>
          </ImageViewer>
        </template>
      </el-table-column>
      <el-table-column label="车种" prop="plmSewingName" />
      <el-table-column label="工序描述" prop="processDescribe" />
      <el-table-column label="工时（分）" prop="estimatedTime" />
      <el-table-column label="分钟工资" prop="minutelyPay" />
      <el-table-column label="金额" prop="amount" />
      <el-table-column label="备注" prop="remark" />
    </el-table>
    <template #footer>
      <el-row
        type="flex"
        justify="end"
        style="width:100%"
      >
        <pagination
          :total="pageData.total"
          :current-page="pageData.currentPage"
          :size="pageData.pageSize"
          class="margin-bottom-10"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </el-row>
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
import { reactive, ref } from 'vue';
import {
  ISewingComponentTemplatePageReq,
  ISewingComponentTemplateItem, ISewingComponentTemplatePageResListItem
} from '../api/type';
import { sewingComponentTemplatePage, sewingComponentTemplateOptionsPage } from '../api/index';
import { useVModel } from '@vueuse/core';

const props = defineProps({
  regionId: {
    type: String,
    default: '',
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['success']);

const visible = useVModel(props, 'modelValue');

const form = reactive<ISewingComponentTemplatePageReq>({});
const componentList = ref<ISewingComponentTemplatePageResListItem[]>([]);
const tableData = ref<ISewingComponentTemplateItem[]>([]);
const multipleSelection = ref<ISewingComponentTemplateItem[]>([]);

const loading = ref(false);

const pageData = ref({
  currentPage: 1,
  pageSize: 20,
  total: 0,
});

// 获取全部部件
const getAllsewingComponent = async () => {
  const { data } = await sewingComponentTemplateOptionsPage({
    regionId: props.regionId,
    state: 1,
    pageNum: 1,
    pageSize: 200,
  });
  componentList.value = data.list;
};
const getProcessList = async () => {
  const { data } = await sewingComponentTemplatePage({
    regionId: props.regionId,
    componentName: form.componentName,
    processName: form.processName,
    pageNum: pageData.value.currentPage,
    pageSize: pageData.value.pageSize,
  });
  tableData.value = data.list;
  pageData.value.total = data.total;
};
const reset = () => {
  form.componentName = '';
  form.processName = '';
  pageData.value.pageSize = 20;
  pageData.value.currentPage = 1;
  getProcessList();
};

const handleSizeChange = (val: number) => {
  pageData.value.pageSize = val;
  getProcessList();
};
const handleCurrentChange = (val: number) => {
  pageData.value.currentPage = val;
  getProcessList();
};

const handleClose = async () => {
  visible.value = false;
};
const handleOpen = async () => {
  getAllsewingComponent();
  reset();
};
const handleConfirm = async () => {
  handleClose();
  emits('success', multipleSelection.value);
};

const handleSelectionChange = (val: ISewingComponentTemplateItem[]) => {
  multipleSelection.value = val;
};
const remoteMethod = async (query: string) => {
  if (query) {
    loading.value = true;
    const { data } = await sewingComponentTemplateOptionsPage({
      regionId: props.regionId,
      componentName: query,
      state: 1,
      pageNum: 1,
      pageSize: 200,
    });
    componentList.value = data.list;
    loading.value = false;
  } else {
    componentList.value = [];
  }
};

</script>
<style lang="scss" scoped>
.search-form {
  .el-input, .el-select {
    min-width:188px;
  }
}
</style>
