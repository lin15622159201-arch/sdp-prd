<template>
  <sc-detail-card
    :title="props.title"
    class="tw-mb-8px tw-px-0! tw-py-0!"
  >
    <el-form
      label-suffix="："
      label-width="130px"
      :model="formData"
      ref="sewFormElRef"
      :disabled="props.disabled"
    >
      <el-form-item
        label="裁剪要求"
        prop="cuttingRequire"
        :rules="[{ required: true, message: '请输入', trigger: 'blur' }]"
        class="tw-block"
        label-position="left"
      >
        <el-input
          v-model="formData.cuttingRequire"
          :autosize="{ minRows: 4, maxRows: 6 }"
          type="textarea"
          placeholder="请输入"
          resize="none"
          :maxlength="500"
          clearable
        />
      </el-form-item>
      <div class="tw-mb[10px] required">车缝要求</div>
      <el-row
        class="tw-w-full"
        type="flex"
      >
        <el-col :span="8">
          <el-form-item
            label="引用模板"
            prop="templates"
            class="tw-w-full"
            label-position="right"
          >
            <div class="tw-flex tw-w-full">
              <query-select
                v-model="formData.referStyleTemplateCode"
                placeholder='请输入'
                :method="auditCraftTemplateListBaseInfo"
                clearable
                :needInitSearch="true"
                :config="{
                  labelKey: 'templateName',
                  valueKey: 'templateId',
                  keywordQueryKey: 'templateName',
                  valueQueryKey: 'templateId',
                  dataKey: 'data',
                }"
                :queryParams="{ state: YES_NO_ENUM.YES }"
              />
              <el-button
                class="tw-w-[88px] tw-flex-1 tw-ml[6px]"
                type="primary"
                @click="handleReferenceStyle(formData.referStyleTemplateCode)"
              >引用</el-button>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-table
            :data="formData.sewingRequireList"
            border
            class="tw-my-10px reset-form-item-top"
            row-key="tableId"
            :span-method="componentSpanMethod"
          >
            <el-table-column
              minWidth="120px"
              align="center"
              prop="id"
            >
              <template #header>
                <span class="required">部件名称</span>
              </template>
              <template #default="{ row, $index }">
                <el-form-item
                  :prop="`sewingRequireList[${$index}].componentName`"
                  :rules="{ required: true, message: '请输入', trigger: 'change' }"
                >
                  <div class="tw-w-full">
                    <el-autocomplete
                      v-model="row.componentName"
                      :fetch-suggestions="(queryString, cb) => {
                        querySearchComponentName(queryString, cb);
                      }"
                      clearable
                      fit-input-width
                      :maxlength="50"
                      value-key="componentName"
                      :ref="el => setAutoCompleteRef(el, $index)"
                      @select="(val) => handleSelectComponentName(val as IListItem, row)"
                    />
                    <div>
                      <el-button
                        class="tw-w-[88px]"
                        type="primary"
                        link
                        @click="handleAddComponent()"
                      >添加</el-button>
                      <el-button
                        class="tw-w-[88px]"
                        type="danger"
                        link
                        v-if="showComponentDel"
                        @click="handleDelComponent($index, row)"
                      >删除</el-button>
                    </div>
                  </div>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column
              min-width="120px"
              align="center"
              prop="structuralDesc"
            >
              <template #header>
                <span class="required">版型结构分解</span>
              </template>
              <template #default="{ row, $index }">
                <el-form-item
                  :prop="`sewingRequireList[${$index}].structuralDesc`"
                  :rules="{ required: true, message: '请输入', trigger: ['blur'] }"
                  class="tw-mt-[40px]! tw-ml-0!"
                >
                  <el-autocomplete
                    v-model="row.structuralDesc"
                    :fetch-suggestions="(queryString, cb) => {
                      querySearchStructural(queryString, cb, row);
                    }"
                    clearable
                    fit-input-width
                    type="textarea"
                    resize="none"
                    :autosize="{ minRows: 3, maxRows: 5 }"
                    :maxlength="500"
                    :ref="el => setAutoCompleteRef(el, $index)"
                    @select="(val) => {
                      handleSelectStructuralDes(val as IComponentListItem, row);
                    }"
                  />
                  <div>
                    <el-button
                      class="tw-w-[88px]"
                      type="primary"
                      link
                      @click="handleAddStructural(row)"
                    >添加</el-button>
                    <el-button
                      class="tw-w-[88px]"
                      type="danger"
                      link
                      v-if="isShowDelStruct(row)"
                      @click="handleDelStruct($index, row)"
                    >删除</el-button>
                  </div>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column
              min-width="120px"
              align="center"
              prop="sewingRequires"
            >
              <template #header>
                <span class="required">车缝工艺要求</span>
              </template>
              <template #default="{ row, $index }">
                <el-form-item
                  :prop="`sewingRequireList[${$index}].sewingRequires`"
                  :rules="{ required: true, message: '请输入', trigger: ['blur'] }"
                >
                  <el-autocomplete
                    v-model="row.sewingRequires"
                    :fetch-suggestions="(queryString, cb) => {
                      querySearchSewingRequires(queryString, cb, row);
                    }"
                    clearable
                    fit-input-width
                    :maxlength="500"
                    type="textarea"
                    resize="none"
                    :autosize="{ minRows: 3, maxRows: 5 }"
                    :ref="el => setAutoCompleteRef(el, $index)"
                    @select="(val) => {
                      handleSelectSewingRequireDes(val as IComponentListItem, row);
                    }"
                  />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="80px"
              align="center"
              prop="operation"
            >
              <template #default="{ row, $index }">
                <el-button
                  text
                  type="primary"
                  @click="handleAddSewingRequires($index, row)"
                >
                  <el-icon><Plus /></el-icon>
                </el-button>
                <el-button
                  text
                  type="danger"
                  :disabled="!isShowDelProcessRequireDes(row)"
                  @click="handleRemoveSewingRequires($index)"
                >
                  <el-icon><Minus /></el-icon>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-form-item
        label="尾部要求"
        prop="tailRequire"
        :rules="[{ required: true, message: '请输入', trigger: 'blur' }]"
        class="tw-block"
        label-position="left"
      >
        <el-input
          v-model="formData.tailRequire"
          :autosize="{ minRows: 4, maxRows: 6 }"
          type="textarea"
          placeholder="请输入"
          resize="none"
          :maxlength="500"
          clearable
        />
      </el-form-item>
    </el-form>
  </sc-detail-card>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { cloneDeep } from 'lodash-es';
import { ElForm, ElMessage, ElAutocomplete } from 'element-plus';
import {
  auditCraftTemplateListBaseInfo,
  auditCraftTemplateGetDetailById,
} from './api';
import { Minus, Plus } from '@element-plus/icons-vue';
import { YES_NO_ENUM } from '@/constant';
import {
  auditCraftComponentGetById, auditCraftComponentQueryByPage
} from '@/modules/base-config/views/audit-craft-component-library/api';
import { SpanMethodProps, IListItem, ICraftSewRequireItem } from './hooks/use-table-list/type';
import { v4 as uuid } from 'uuid';
import useSewTableList from './hooks/use-table-list';

interface IComponentListItem {
  value: string;
  label: string;
}

const props = defineProps({
  title: {
    type: String,
    default: '添加',
  },
  sewFormData: {
    type: Object,
    default: () => ({})
  },
  sizeFormData: {
    type: Object,
    default: () => ({})
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const { defaultSewingItem, convertToArray } = useSewTableList();

const emit = defineEmits([
  'update:sewFormData',
]);

const sewFormElRef = ref<InstanceType<typeof ElForm>>();

const formData = computed({
  get() {
    return props.sewFormData;
  },
  set(val) {
    emit('update:sewFormData', val);
  }
});

// 判断是否相同【部件】ID是否大于1
const showComponentDel = computed(() => {
  const nameArr = formData.value?.sewingRequireList.map((item: IListItem) => item.parentId);
  const nameSet = Array.from(new Set(nameArr));
  return nameSet.length > 1;
});

// 判断是否相同【车缝工艺要求】ID是否大于1
const isShowDelProcessRequireDes = (row: IListItem) => {
  const secondId = row.parentId.split(',')[1];
  const arr = formData.value?.sewingRequireList.filter((n: IListItem) => {
    return n.parentId.includes(secondId);
  });
  return arr.length > 1;
};

/**
 * @description 展示结构分解的删除按钮
 * @returns 只有一个时候不展示删除按钮
 */
const isShowDelStruct = (row: IListItem) => {
  const firstId = row.parentId.split(',')[0];
  // eslint-disable-next-line vue/max-len
  const filteredData = formData.value?.sewingRequireList.filter((item: IListItem) => item.parentId.split(',')[0] === firstId);
  const structuralSet = new Set(filteredData.map((item:IListItem) => item.parentId.split(',')[1]));
  return structuralSet.size > 1;
};

// 表格数据合并
const componentSpanMethod = ({
  row, column, rowIndex, columnIndex
}: SpanMethodProps) => {
  const { sewingRequireList } = formData.value;
  const firstCol: Record<string, { rowspan: number; colspan: number; }> = {};
  const secondCol: Record<string, { rowspan: number; colspan: number; }> = {};
  sewingRequireList.forEach((item: IListItem) => {
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
  const [firstId, secondId] = formData.value.sewingRequireList[rowIndex].parentId.split(',');
  if (columnIndex === 0) {
    // 如果不是第一个出现的 `id`，返回 [0, 0]，表示合并到上一行
    if (rowIndex > 0 && formData.value.sewingRequireList[rowIndex - 1].parentId.includes(firstId)) {
      return [0, 0];
    }
    return firstCol[firstId]; // 返回合并的行数和列数
  }
  if (columnIndex === 1) {
    // 如果不是第一个出现的 `id`，返回 [0, 0]，表示合并到上一行
    if (rowIndex > 0 && formData.value.sewingRequireList[rowIndex - 1].parentId.includes(secondId)) {
      return [0, 0];
    }
    return secondCol[secondId]; // 返回合并的行数和列数
  }
  return [1, 1];
};

// 【部件名称】添加
const handleAddComponent = () => {
  const id = uuid();
  const defaultItem = cloneDeep(defaultSewingItem);
  formData.value.sewingRequireList.push({
    ...defaultItem,
    tableId: id,
    parentId: `${id},${uuid()}`,
  });
};

// 【部件名称】删除
const handleDelComponent = (index: number, row: IListItem) => {
  // eslint-disable-next-line vue/max-len
  formData.value.sewingRequireList = formData.value.sewingRequireList.filter((item: IListItem) => !item.parentId.includes(row.parentId.split(',')[0]));
};

// 【版型结构分解】添加
const handleAddStructural = (row: IListItem) => {
  const defaultItem = cloneDeep(defaultSewingItem);
  const id = String(Date.now());
  const [firstId, secondId] = row.parentId.split(',');
  const index = formData.value.sewingRequireList.findLastIndex((item: IListItem) => item.parentId.includes(secondId));
  formData.value.sewingRequireList?.splice(index + 1, 0, {
    ...defaultItem,
    tableId: id,
    parentId: `${firstId},${id}`,
    componentName: row.componentName,
    selectedComponentId: row.selectedComponentId,
    componentId: row.componentId,
  });
};

// 【版型结构分解】删除
const handleDelStruct = (index: number, row: IListItem) => {
  // eslint-disable-next-line vue/max-len
  formData.value.sewingRequireList = formData.value.sewingRequireList.filter((item: IListItem) => !item.parentId.includes(row.parentId));
};

// 【车缝工艺要求】添加
const handleAddSewingRequires = (index: number, row: IListItem) => {
  const defaultItem = cloneDeep(defaultSewingItem);
  const id = String(Date.now());
  const [firstId, secondId] = row.parentId.split(',');
  formData.value.sewingRequireList?.splice(index + 1, 0, {
    ...defaultItem,
    tableId: id,
    parentId: `${firstId},${secondId},${id}`,
    structuralDes: row.structuralDesc,
    componentName: row.componentName,
    selectedComponentId: row.selectedComponentId,
    selectedStructuralId: row.selectedStructuralId,
    componentId: row.componentId,
  });
};

// 【车缝工艺要求】删除
const handleRemoveSewingRequires = (index: number) => {
  formData.value.sewingRequireList?.splice(index, 1);
};

// 引用模版
const handleReferenceStyle = async (code: string) => {
  if (!code) {
    ElMessage.warning('请选择模版');
    return;
  }
  const { data } = await auditCraftTemplateGetDetailById({
    templateId: code,
  });
  const list = convertToArray((data?.detailJson || []) as ICraftSewRequireItem[]);
  if (!formData.value.sewingRequireList?.length) {
    formData.value.sewingRequireList = [];
  }
  formData.value.sewingRequireList?.push(...list);
};

const autoCompleteRefs = ref<Array<InstanceType<typeof ElAutocomplete>>>([]);
const setAutoCompleteRef = (el: any, index: number) => {
  autoCompleteRefs.value[index] = el;
};

// 获取部件名称列表
const querySearchComponentName = async (queryString: string, callback:(arg: any) => void) => {
  const { data } = await auditCraftComponentQueryByPage({
    pageNum: 1,
    pageSize: 10000,
    componentName: queryString,
    state: YES_NO_ENUM.YES
  });
  // call callback function to return suggestions
  callback(data.list || []);
};

const handleSelectComponentName = (select: IListItem, row: IListItem) => {
  row.selectedComponentId = select.componentId || '';
  row.componentName = select.componentName;
  row.componentId = select.componentId!;
  const [firstId] = row.parentId.split(',');
  formData.value?.sewingRequireList.forEach((n: IListItem) => {
    if (n.parentId.includes(firstId)) {
      n.selectedComponentId = select.componentId;
      n.componentName = select.componentName;
      n.componentId = select.componentId;
    }
  });
};

// 版型结构分解
const querySearchStructural = async (queryString: string, callback:(arg: any) => void, row: IListItem) => {
  const { selectedComponentId } = row;
  if (!selectedComponentId) {
    callback([]);
    return;
  }
  const { data } = await auditCraftComponentGetById(selectedComponentId);
  if (data.state === YES_NO_ENUM.NO) {
    callback([]);
    return;
  }
  const list = data.structurals.map(n => ({
    value: n.desc,
    label: n.desc,
  }));
  const results = queryString
    ? list.filter(n => n.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1)
    : list;
  // call callback function to return suggestions
  callback(results);
};

const handleSelectStructuralDes = (select: IComponentListItem, row: IListItem) => {
  row.selectedStructuralId = select.value;
  row.structuralDesc = select.value;
  const secondId = row.parentId.split(',')[1];
  formData.value.sewingRequireList.forEach((n: IListItem) => {
    if (n.parentId.includes(secondId)) {
      n.selectedStructuralId = select.value;
      n.structuralDesc = select.value;
    }
  });
};

// 车缝工艺要求
const querySearchSewingRequires = async (queryString: string, callback:(arg: any) => void, row: IListItem) => {
  const { selectedComponentId, selectedStructuralId } = row;
  if (!selectedComponentId) {
    callback([]);
    return;
  }
  const { data } = await auditCraftComponentGetById(selectedComponentId);
  if (data.state === YES_NO_ENUM.NO) {
    callback([]);
    return;
  }
  const selectStruct = data.structurals.filter(n => n.desc === selectedStructuralId);
  let list: IComponentListItem[] = [];
  if (!selectStruct.length) {
    callback([]);
    return;
  }
  list = selectStruct[0].sewingRequires.map(n => ({
    value: n.desc,
    label: n.desc,
  }));
  const results = queryString
    ? list.filter(n => n.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1)
    : list;
  // call callback function to return suggestions
  callback(results);
};

const handleSelectSewingRequireDes = (select: IComponentListItem, row: IListItem) => {
  row.sewingRequires = select.value;
};

// 表单校验
const validateForm = () => {
  return new Promise((resolve, reject) => {
    sewFormElRef.value?.validate((valid: any) => {
      if (valid) {
        resolve(true);
      } else {
        reject(new Error('表单验证失败!'));
      }
    });
  });
};

defineExpose({
  validateForm,
});
</script>

<style lang="scss" scoped>
.reset-form-item-bottom {
  :deep(.el-form-item) {
    margin-bottom: 0;
    margin-right: 0;
  }
}
.reset-form-item-top {
  :deep(.el-form-item) {
    margin-top: 18px;
  }
  :deep(.el-form-item__content) {
    margin-left: 0 !important;
  }
}
</style>
