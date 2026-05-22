<template>
  <sc-app-page class="custom-app-page">
    <template #fheader>
      <div class="tw-flex tw-flex-justify-between tw-flex-center-y tw-mb-3">
        <div class="tw-flex tw-flex-center-y">
          <el-button
            class="tw-mr-4"
            :icon="ArrowLeft"
            link
            @click="handleBack"
          />
          <sc-status-label
            :options="SELECTION_STATUS_LIST"
            :value="headerConfig.state"
            mode="tag"
          />
          <p
            class="tw-ml-7 tw-text-base"
            v-for="(item, index) in headerConfig.selectionNumberList"
            :key="index"
          >
            {{item.label}}：
            <span>{{ item.value }}</span></p>
        </div>
        <el-button
          type="primary"
          :disabled="tableData.length === 0 "
          @click="handleSubmit"
        >
          {{ headerConfig.btnName }}
        </el-button>
      </div>
    </template>
    <template #header>
      <div class="tw-flex tw-justify-end tw-flex-center-y">
        <template v-for="model in modelList" :key="model.prop">
          <el-input
            v-if="model.type === 'input'"
            v-model="modelForm[model.prop]"
            class="tw-w-min-w-[84px] tw-w-[84px] tw-mr-4"
            :placeholder="model.placeholder"
            clearable
          />
          <sc-input-number
            v-else-if="model.type === 'inputNumber'"
            v-model="modelForm[model.prop]"
            :placeholder="model.placeholder ? model.placeholder : '请输入数字'"
            class="tw-w-min-w-[84px] tw-w-[84px] tw-mr-4"
            :precision="2"
            :min="1"
            :max="9999"
            clearable
          />
          <el-select
            v-else-if="model.type === 'select'"
            v-model="modelForm[model.prop]"
            class="tw-w-min-w-[84px] tw-w-[84px] tw-mr-4 "
            :placeholder="model.placeholder"
            clearable
          >
            <el-option
              v-for="item in model.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            /></el-select>
          <el-cascader
            v-else
            class="tw-w-min-w-[84px] tw-w-[84px] tw-mr-4 "
            v-model="modelForm[model.prop]"
            :placeholder="model.placeholder"
            :options="model.options"
            :show-all-levels="false"
            :props="{
              emitPath: false,
            }"
            clearable
          />
        </template>
        <div class="tw-w-[98px]">
          <el-button link @click="handleBatchFill">批量填写</el-button>
        </div>
      </div>
    </template>
    <template #main>
      <el-form
        :model="tableForm"
        ref="formRef"
        class="tw-h-full"
        :validate-on-rule-change="false"
      >
        <el-table class="tw-h-full" :data="tableForm.tableData">
          <el-table-column
            v-for="(column, index) in tableColumns"
            :key="column.prop"
            :prop="column.prop"
            :label="column.label"
            :width="column.width"
            :min-width="column.minWidth"
            :fixed="column.fixed"
          >
            <template #header>
              <div class="tw-flex tw-flex-center-y">
                <span
                  v-if="(column.rule && column.rule.length > 0) || column.customRule"
                  class="tw-mr-2 tw-text-danger"
                >
                  *
                </span>
                <span>{{ column.label }}</span>
              </div>
            </template>
            <template #default="scope">
              <el-form-item
                v-if="column.type && !['image'].includes(column.type)"
                :prop="`tableData.${scope.$index}.${column.prop}`"
                class="!tw-mb-0"
                :rules="column.customRule ? column.customRule(scope.row) : column.rule"
              >
                <el-input
                  v-if="column.type === 'input'"
                  v-model="scope.row[column.prop]"
                  :placeholder="column.placeholder"
                  clearable
                />
                <sc-input-number
                  v-else-if="column.type === 'inputNumber'"
                  v-model="scope.row[column.prop]"
                  :placeholder="column.placeholder ? column.placeholder : '请输入数字'"
                  :clearable="true"
                  :precision="2"
                  :min="1"
                  :max="9999"
                />
                <el-select
                  v-else-if="column.type === 'select'"
                  v-model="scope.row[column.prop]"
                  :placeholder="column.placeholder ? column.placeholder : '请选择'"
                  clearable
                >
                  <el-option
                    v-for="item in tableColumns[index].options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  /></el-select>
                <el-cascader
                  v-else
                  v-model="scope.row[column.prop]"
                  :placeholder="column.placeholder"
                  :options="tableColumns[index].options"
                  :show-all-levels="false"
                  :props="{
                    emitPath: false,
                  }"
                  clearable
                />
              </el-form-item>
              <div v-else-if="column.type === 'image'" class='tw-flex tw-flex-wrap tw-gap-2px'>
                <el-image
                  :src="scope.row[column.prop]"
                  class='tw-w-100px tw-h-100px tw-rounded-4px'
                  fit='cover'
                  :preview-src-list="[scope.row[column.prop]]"
                  preview-teleported
                />
              </div>
              <span v-else>{{ scope.row[column.prop] }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="action"
            label="操作"
            fixed="right"
            width="100px"
          >
            <template #default="scope">
              <div class="tw-flex tw-flex-col">
                <el-button
                  type="primary"
                  link
                  @click="() => handleOpenDialog({
                    styleSelectionId: scope.row.styleSelectionId
                  }, (total:number) => {
                    scope.row.totalRemark = total;
                  })"
                >
                  备注{{ scope.row.totalRemark !== null ? `(${scope.row.totalRemark})` : ''}}
                </el-button>
                <el-button
                  type="danger"
                  link
                  :loading="deleteLoadingMap[scope.row.styleSelectionId]"
                  @click="handleDelete(scope.$index, scope.row.styleSelectionId)"
                >
                  {{ deleteName }}
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </template>
  </sc-app-page>
</template>

<script lang="ts" setup>
import { ElMessage, FormInstance } from 'element-plus';
import type { Option, ColumItem } from '../type';
import { computed, ref } from 'vue';
import { useRemarkDialog } from '../hooks/use-remark-dialog';
import { SELECTION_STATUS_ENUM, SELECTION_STATUS_LIST } from '../constant';
import { ArrowLeft } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

interface ModelFormData {
  [key: string]: any;
}

interface IProps {
  headerConfig:{
    state?: SELECTION_STATUS_ENUM;
    btnName?: string;
    selectionNumberList:Option[];
  };
  deleteName?: string;
  delete?:(id:string) => Promise<void>;
  submit?:(data:any) => Promise<void>;
}

const props = withDefaults(defineProps<IProps>(), {
  headerConfig: () => ({
    tagName: '选款中',
    tagType: 'warning',
    btnName: '提交选款结果',
    selectionNumberList: [],
  }),
  deleteName: '删除',
});

const router = useRouter();

const formRef = ref<FormInstance>();

const { handleOpenDialog } = useRemarkDialog();

const deleteLoadingMap = ref<Record<string, boolean>>({});

const modelForm = ref<ModelFormData>({});

const tableColumns = defineModel<ColumItem[]>('tableColumns', {
  required: true,
  default: () => [],
});
const tableData = defineModel<any[]>('tableData', {
  required: true,
  default: () => [],
});

const tableForm = computed(() => {
  return {
    tableData: tableData.value,
  };
});

const modelList = computed(() => {
  if (!tableColumns.value || tableColumns.value.length === 0) return [];
  const list = tableColumns.value.filter(item => item.type && !['image'].includes(item.type));
  list.forEach((item) => {
    modelForm.value[item.prop] = null;
  });
  return list;
});

const handleDelete = async (index:number, id:string) => {
  deleteLoadingMap.value[id] = true;
  try {
    if (props.delete) {
      await props.delete(id);
    }
    tableData.value.splice(index, 1);
  } finally {
    deleteLoadingMap.value[id] = false;
  }
};

const handleBatchFill = () => {
  tableData.value = tableData.value.map((row) => {
    return Object.assign(row, modelForm.value);
  });
};

const handleSubmit = async () => {
  if (!formRef.value) return;

  await formRef.value.validate(async (valid) => {
    if (valid && props.submit) {
      await props.submit(tableData.value);
    } else {
      ElMessage.error('有必填项未填写,请先填写!');
    }
  });
};

const handleBack = () => {
  router.replace({
    name: 'AigcSelectionManageInStockSelection',
  });
};

</script>
