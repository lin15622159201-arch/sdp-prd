<template>
  <sc-app-page>
    <template #header />
    <template #main>
      <el-form
        ref="formRef"
        :model="formData"
        scroll-to-error
        class="tw-mt-10px"
        :disabled="isView"
        :rules="rules"
      >
        <el-form-item label="工序部件" prop="componentName">
          <el-input
            v-model="formData.componentName"
            clearable
            placeholder="请输入"
            class="tw-w-180px"
            maxlength="50"
          />
        </el-form-item>
        <el-table
          :data="formData.list"
          border
          class="tw-my-10px reset-form-item-top"
          row-key="id"
          :span-method="spanMethod"
        >
          <el-table-column
            minWidth="120px"
            align="center"
            prop="structuralDes"
          >
            <template #header>
              <span class="required">版型结构分解</span>
            </template>
            <template #default="{ row, $index }">
              <el-form-item
                :prop="`list[${$index}].structuralDes`"
                :rules="{ required: true, message: '请输入', trigger: 'change' }"
              >
                <div class="tw-w-full">
                  <el-input
                    class="tw-w-full"
                    type="textarea"
                    v-model="row.structuralDes"
                    :maxlength="500"
                    placeholder="请输入"
                    clearable
                    resize="none"
                    :autosize="{ minRows: 3, maxRows: 5 }"
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
                      @click="handleRemoveComponent($index, row)"
                    >删除</el-button>
                  </div>
                </div>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            min-width="120px"
            align="center"
            prop="sewingRequiresDes"
          >
            <template #header>
              <span class="required">车缝工艺要求</span>
            </template>
            <template #default="{ row, $index }">
              <el-form-item
                :prop="`list[${$index}].sewingRequiresDes`"
                :rules="{ required: true, message: '请输入', trigger: ['blur'] }"
              >
                <el-input
                  type="textarea"
                  v-model="row.sewingRequiresDes"
                  resize="none"
                  :autosize="{ minRows: 3, maxRows: 5 }"
                  :maxlength="500"
                  clearable
                  placeholder="请输入"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="120px"
            align="center"
            prop="operation"
          >
            <template #default="{ row, $index }">
              <el-button
                text
                type="primary"
                @click="handleAddSameComponent($index, row)"
              >
                <el-icon><Plus /></el-icon>
              </el-button>
              <el-button
                text
                type="danger"
                :disabled="!isShowDelProcessRequireDes(row)"
                @click="handleRemoveSameComponent($index)"
              >
                <el-icon><Minus /></el-icon>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </template>
    <template #ffooter>
      <div class="tw-w-full tw-flex tw-flex-justify-center">
        <template v-if="isView">
          <el-button @click="goBack">返回</el-button>
        </template>
        <template v-else>
          <el-button @click="goBack">取消</el-button>
          <el-button type="primary" @click="handleSave">提交</el-button>
        </template>
      </div>
    </template>
  </sc-app-page>
</template>

<script lang="ts" setup>
import { Plus, Minus } from '@element-plus/icons-vue';
import { useResetRef } from '@toy/v-use';
import { ElForm, ElMessage, TableColumnCtx } from 'element-plus';
import { computed, onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { auditCraftComponentGetById, auditCraftComponentSaveComponent } from '../api';
import { IAuditCraftComponentSaveComponentReqStructuralsItem } from '../api/type';
import { v4 as uuid } from 'uuid';

const route = useRoute();
const router = useRouter();
const componentId = route.params.id || '';
const formRef = ref<InstanceType<typeof ElForm>>();
const isView = computed(() => {
  return route.name === 'BaseConfigAuditCraftComponentLibraryDetail';
});

interface IListItem {
  id: string;
  parentId: string;
  /** 版型结构分解 */
  structuralDes: string;
  /** 车缝工艺要求 */
  sewingRequiresDes: string;
}

interface IFormData {
  /** 工序部件名称 */
  componentName: string;
  /** 工序部件ID */
  componentId: string;
  list: IListItem[];
}

const [formData, resetForm] = useResetRef<IFormData>({
  componentName: '',
  componentId: '',
  list: [],
});

const rules = {
  componentName: [{ required: true, message: '请输入工序部件', trigger: 'blur' }],
};
interface SpanMethodProps {
  row: IListItem;
  column: TableColumnCtx<IListItem>;
  rowIndex: number;
  columnIndex: number;
}
const spanMethod = ({ row, column, rowIndex, columnIndex }: SpanMethodProps) => {
  console.log(row, column, rowIndex, columnIndex);
  if (columnIndex === 0) {
    const currentValue = formData.value.list[rowIndex].parentId;
    // 如果不是第一个出现的 `id`，返回 [0, 0]，表示合并到上一行
    if (rowIndex > 0 && formData.value.list[rowIndex - 1].parentId === currentValue) {
      return [0, 0];
    }
    let span = 1;

    for (let i = rowIndex + 1; i < formData.value.list.length; i++) {
      if (formData.value.list[i].parentId === currentValue) {
        span += 1;
      } else {
        break;
      }
    }
    return [span, 1]; // 返回合并的行数和列数
  }
  return [1, 1];
};

// 判断是否有剩余相同部件名称
const showComponentDel = computed(() => {
  const nameArr = formData.value?.list.map((item: IListItem) => item.parentId);
  const nameSet = Array.from(new Set(nameArr));
  return nameSet.length > 1;
});

const handleAddComponent = () => {
  const id = String(Date.now());
  formData.value.list?.push({
    id,
    parentId: id,
    structuralDes: '',
    sewingRequiresDes: '',
  });
};

// 删除部件
const handleRemoveComponent = (index: number, row: IListItem) => {
  console.log(row);
  formData.value.list = formData.value.list.filter(item => item.parentId !== row.parentId);
};

const handleAddSameComponent = (index: number, row: IListItem) => {
  formData.value.list?.splice(index + 1, 0, {
    id: String(Date.now()),
    parentId: row.parentId,
    structuralDes: row.structuralDes,
    sewingRequiresDes: '',
  });
};

const isShowDelProcessRequireDes = (row: IListItem) => {
  const arr = formData.value?.list.filter((n) => {
    return n.parentId === row.parentId;
  });
  return arr.length > 1;
};

const handleRemoveSameComponent = (index: number) => {
  formData.value.list?.splice(index, 1);
};

const goBack = () => {
  resetForm();
  router.replace({
    name: 'BaseConfigAuditCraftComponentLibrary',
  });
};

const handleSave = async () => {
  console.log(formData.value);
  await formRef.value?.validate();
  const { componentId: componentIdStr, componentName, list } = formData.value;
  const structurals: IAuditCraftComponentSaveComponentReqStructuralsItem[] = [];
  const map = new Map<string, { structuralDes: string; processRequireDesList: string[]; }>();
  list.forEach((item) => {
    const { parentId, structuralDes, sewingRequiresDes } = item;
    if (!map.has(parentId)) {
      map.set(parentId, {
        structuralDes,
        processRequireDesList: [sewingRequiresDes],
      });
    } else {
      const obj = map.get(parentId)!;
      obj.processRequireDesList.push(sewingRequiresDes);
    }
  });
  map.forEach((value, key) => {
    structurals.push({
      desc: value.structuralDes,
      sewingRequires: value.processRequireDesList.map(item => ({
        desc: item,
      })),
    });
  });
  await auditCraftComponentSaveComponent({
    componentId: componentIdStr,
    componentName,
    structurals,
  });
  ElMessage.success('操作成功');
  goBack();
};

const getDetail = async () => {
  const { data } = await auditCraftComponentGetById(componentId as string);
  formData.value.componentId = data.componentId;
  formData.value.componentName = data.componentName;
  formData.value.list = [];
  data.structurals.forEach((item) => {
    const { desc, sewingRequires } = item;
    const parentId = uuid();
    sewingRequires.forEach((sewing) => {
      formData.value.list.push({
        id: uuid(),
        parentId,
        structuralDes: desc,
        sewingRequiresDes: sewing.desc,
      });
    });
  });
};

onBeforeMount(() => {
  if (componentId) {
    // TODO: 获取详情接口
    getDetail();
  } else {
    handleAddComponent();
  }
});

</script>

<style lang="scss" scoped>
//
</style>
