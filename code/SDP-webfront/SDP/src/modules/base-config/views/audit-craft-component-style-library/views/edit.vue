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
        <ScResponsiveRow
          :gutter="5"
        >
          <el-form-item label="模板名称" prop="templateName">
            <el-input
              v-model="formData.templateName"
              clearable
              placeholder="请输入"
            />
          </el-form-item>
          <el-form-item label="版房品类" prop="categoryCodes">
            <el-select
              v-model="formData.categoryCodes"
              placeholder="请选择板房品类"
              multiple
              clearable
            >
              <el-option
                v-for="item in PROTOTYPE_CATEGORY_OPTIONS"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="引用的工艺模板" prop="referenceTemplateId">
            <div class="tw-flex tw-w-full">
              <query-select
                v-model="formData.referenceTemplateId"
                placeholder='请输入'
                :method="auditCraftTemplateQueryByPage"
                clearable
                :needInitSearch="true"
                :config="{
                  labelKey: 'templateName',
                  valueKey: 'templateId',
                  keywordQueryKey: 'templateName',
                  valueQueryKey: 'templateId',
                  dataKey: 'data.list',
                  codeKey: 'templateId',
                }"
                :queryParams="{ pageNum: 1, pageSize: 1000 }"
              />
              <el-button
                class="tw-w-[88px] tw-flex-1 tw-ml[6px]"
                type="primary"
                @click="handleSizeReference()"
              >引用</el-button>
            </div>
          </el-form-item>
        </ScResponsiveRow>
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
              <span class="required">部件名称</span>
            </template>
            <template #default="{ row, $index }">
              <el-form-item
                :prop="`list[${$index}].componentName`"
                :rules="{ required: true, message: '请输入' }"
              >
                <div class="tw-w-full">
                  <el-autocomplete
                    class="tw-w-full"
                    v-model="row.componentName"
                    placeholder="请输入"
                    :maxlength="50"
                    :fetch-suggestions="(queryString, cb) => {
                      getComponentList(queryString, cb);
                    }"
                    value-key="componentName"
                    clearable
                    @select="(val) => {
                      handleSelectComponent(val as IAuditCraftComponentQueryByPageResListItem, row);
                    }"
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
                      v-if="isShowDelComponent"
                      @click="handleDelComponentOrStruct($index, row)"
                    >删除</el-button>
                  </div>
                </div>
              </el-form-item>
            </template>
          </el-table-column>
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
                  <el-autocomplete
                    class="tw-w-full"
                    v-model="row.structuralDes"
                    clearable
                    type="textarea"
                    resize="none"
                    :autosize="{ minRows: 3, maxRows: 5 }"
                    :maxlength="500"
                    placeholder="请输入"
                    :fetch-suggestions="(queryString, cb) => {
                      getStructuralDesList(queryString, cb, row);
                    }"
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
                      @click="handleDelComponentOrStruct($index, row)"
                    >删除</el-button>
                  </div>
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
                :prop="`list[${$index}].sewingRequires`"
                :rules="{ required: true, message: '请输入', trigger: ['blur'] }"
              >
                <el-autocomplete
                  type="textarea"
                  v-model="row.sewingRequires"
                  resize="none"
                  :autosize="{ minRows: 3, maxRows: 5 }"
                  :maxlength="500"
                  clearable
                  placeholder="请输入"
                  :fetch-suggestions="(queryString, cb) => {
                    getSewingRequireDesList(queryString, cb, row);
                  }"
                  @select="(val) => {
                    handleSelectSewingRequireDes(val as IComponentListItem, row);
                  }"
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
                @click="handleAddProcessRequireDes($index, row)"
              >
                <el-icon><Plus /></el-icon>
              </el-button>
              <el-button
                text
                type="danger"
                :disabled="!isShowDelProcessRequireDes(row)"
                @click="handleDelProcessRequireDes($index)"
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
import { ElForm, ElMessage } from 'element-plus';
import { computed, onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { IAuditCraftTemplateSaveTemplateReqComponentsItem } from '../api/type';
import { auditCraftTemplateGetDetailById, auditCraftTemplateSaveTemplate, auditCraftTemplateQueryByPage } from '../api';
import useForm from '../hooks/use-form';
import { v4 as uuid } from 'uuid';
import { IAuditCraftComponentQueryByPageResListItem } from '../../audit-craft-component-library/api/type';
import { auditCraftComponentGetById, auditCraftComponentQueryByPage } from '../../audit-craft-component-library/api';
import { IComponentListItem, IListItem } from '../hooks/use-form/type';
import { YES_NO_ENUM } from '@/constant';

const { getDictionaryOptions } = useDictionary();
const PROTOTYPE_CATEGORY_OPTIONS = computed(() => {
  return getDictionaryOptions(DICTIONARY_KEY.PROTOTYPE_CATEGORY, 3, 1, true);
});
const route = useRoute();
const router = useRouter();
const sewingComponentId = route.params.id || '';
const formRef = ref<InstanceType<typeof ElForm>>();

const isView = computed(() => {
  return route.name === 'BaseConfigAuditCraftComponentStyleLibraryDetail';
});

const {
  formData,
  rules,
  isShowDelStruct,
  isShowDelProcessRequireDes,
  resetForm,
  spanMethod,
  convertToTree,
  handleAddComponent,
  handleAddStructural,
  handleAddProcessRequireDes,
  handleDelComponentOrStruct,
  handleDelProcessRequireDes,
} = useForm();

/**
 * @description 引用模板
 */
const handleSizeReference = async () => {
  const { referenceTemplateId } = formData.value;
  if (!referenceTemplateId) {
    ElMessage.warning('请选择模板');
    return;
  }
  const { data } = await auditCraftTemplateGetDetailById(formData.value.referenceTemplateId);
  if (!data.detailJson.length) {
    ElMessage.warning('对应模板已失效，请选择其他模板进行引用');
    return;
  }
  const list: IListItem[] = [];
  data.detailJson?.forEach((item) => {
    const { componentId, componentName, structurals = [] } = item;
    const firstId = uuid();
    structurals.forEach((structural) => {
      const secondId = uuid();
      const { desc, sewingRequires = [] } = structural;
      sewingRequires?.forEach((sewingRequire) => {
        list.push({
          id: uuid(),
          parentId: `${firstId},${secondId}`,
          structuralDes: desc,
          sewingRequires: sewingRequire.desc,
          componentName,
          selectedComponentId: componentId,
          selectedStructuralId: '',
          componentId,
        });
      });
    });
  });
  formData.value.list = formData.value.list.concat(list);
};

/**
 * @description 展示部件名称的删除按钮
 * @returns 只有一个时候不展示删除按钮
 */
const isShowDelComponent = computed(() => {
  const firstIds = formData.value?.list.map((item: any) => item.parentId.split(',')[0]);
  const nameSet = Array.from(new Set(firstIds));
  return nameSet.length > 1;
});

/**
 * @description 获取部件名称列表
 */
const getComponentList = async (queryString: string, cb:(arg: any) => void) => {
  const { data } = await auditCraftComponentQueryByPage({
    pageNum: 1,
    pageSize: 10000,
    componentName: queryString,
    state: YES_NO_ENUM.YES
  });
  // call callback function to return suggestions
  cb(data.list || []);
};

const handleSelectComponent = (item: IAuditCraftComponentQueryByPageResListItem, row: IListItem) => {
  console.log('item=', item);
  row.selectedComponentId = item.componentId;
  row.componentName = item.componentName;
  row.componentId = item.componentId;
  const [firstId] = row.parentId.split(',');
  formData.value.list.forEach((n) => {
    if (n.parentId.includes(firstId)) {
      n.selectedComponentId = item.componentId;
      n.componentName = item.componentName;
      n.componentId = item.componentId;
    }
  });
};

const getStructuralDesList = async (queryString: string, cb: any, row: IListItem) => {
  const { selectedComponentId } = row;
  if (!selectedComponentId) {
    cb([]);
    return;
  }
  const { data } = await auditCraftComponentGetById(selectedComponentId);
  if (data.state === YES_NO_ENUM.NO) {
    cb([]);
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
  cb(results);
};

const handleSelectStructuralDes = (item: IComponentListItem, row: IListItem) => {
  row.selectedStructuralId = item.value;
  row.structuralDes = item.value;
  const secondId = row.parentId.split(',')[1];
  formData.value.list.forEach((n) => {
    if (n.parentId.includes(secondId)) {
      n.selectedStructuralId = item.value;
      n.structuralDes = item.value;
    }
  });
};

const getSewingRequireDesList = async (queryString: string, cb: any, row: IListItem) => {
  const { selectedComponentId, selectedStructuralId } = row;
  if (!selectedComponentId) {
    cb([]);
    return;
  }
  const { data } = await auditCraftComponentGetById(selectedComponentId);
  if (data.state === YES_NO_ENUM.NO) {
    cb([]);
    return;
  }
  const selectStruct = data.structurals.filter(n => n.desc === selectedStructuralId);
  let list: IComponentListItem[] = [];
  if (!selectStruct.length) {
    cb([]);
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
  cb(results);
};

const handleSelectSewingRequireDes = (item: IComponentListItem, row: IListItem) => {
  row.sewingRequires = item.value;
};

const goBack = () => {
  resetForm();
  router.replace({
    name: 'BaseConfigAuditCraftComponentStyleLibrary',
  });
};

const handleSave = async () => {
  console.log(formData.value);
  await formRef.value?.validate();
  const { templateId, templateName, categoryCodes, list } = formData.value;
  const roomCategorys = categoryCodes.map((item) => {
    const n = PROTOTYPE_CATEGORY_OPTIONS.value.find(m => m.value === item);
    return {
      roomCategory: item,
      roomCategoryName: n?.label || '',
    };
  });
  // const map = new Map<string, >();
  console.log('000=', convertToTree(list));
  const componentList = convertToTree(list);
  const components: IAuditCraftTemplateSaveTemplateReqComponentsItem[] = [];
  componentList.forEach((item) => {
    const obj: IAuditCraftTemplateSaveTemplateReqComponentsItem = {
      componentId: item.componentId,
      componentName: item.componentName,
      structurals: [],
    };
    item.children.forEach((child) => {
      obj.structurals.push({
        desc: child.structuralDes,
        sewingRequires: child.children.map(n => ({ desc: n.sewingRequires })) || [],
      });
    });
    components.push(obj);
  });

  await auditCraftTemplateSaveTemplate({
    templateId,
    templateName,
    roomCategorys,
    components,
  });
  ElMessage.success('操作成功');
  goBack();
};

const getDatail = async () => {
  formData.value.referenceTemplateId = '';
  formData.value.list = [];
  const { data } = await auditCraftTemplateGetDetailById(sewingComponentId as string);
  formData.value.templateId = data.templateId;
  formData.value.templateName = data.templateName;
  formData.value.categoryCodes = data.roomCategorys?.map(n => n.roomCategory) || [];
  data.detailJson?.forEach((item) => {
    const { componentId, componentName, structurals = [] } = item;
    const firstId = uuid();
    structurals.forEach((structural) => {
      const secondId = uuid();
      const { desc, sewingRequires = [] } = structural;
      sewingRequires?.forEach((sewingRequire) => {
        formData.value.list.push({
          id: uuid(),
          parentId: `${firstId},${secondId}`,
          structuralDes: desc,
          sewingRequires: sewingRequire.desc,
          componentName,
          selectedComponentId: componentId,
          selectedStructuralId: desc,
          componentId,
        });
      });
    });
  });
  console.log('formData.value=', formData.value.list);
};

onBeforeMount(() => {
  if (sewingComponentId) {
    getDatail();
  } else {
    handleAddComponent();
  }
});

</script>

<style lang="scss" scoped>
//
</style>
