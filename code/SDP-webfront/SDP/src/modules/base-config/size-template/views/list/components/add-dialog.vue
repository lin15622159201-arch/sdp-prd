<template>
  <el-dialog
    v-model="selfVisible"
    :title="dialogTitle"
    width="800px"
    :show-close="true"
    custom-class="el-dialog-inner-scroll"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    append-to-body
    top="10vh"
    @close="onClose"
    @open="onOpen"
  >
    <el-form
      ref="formRef"
      class="form-box"
      :model="formData"
      label-width="100px"
      :rules="formRules"
    >
      <el-form-item prop="templateName" label="模板名称">
        <el-input
          class="tw-w-400px"
          v-model.trim="formData.templateName"
          placeholder="请输入模板名称"
          clearable
          maxlength="20"
          show-word-limit
        />
      </el-form-item>
      <el-form-item prop="catId" label="关联平台品类">
        <el-cascader
          v-model="formData.catId"
          :options="categoryTree"
          class="tw-w-400px"
          placeholder="请选择"
          :props="{
            emitPath: false,
          }"
          @change="getPartOptisons()"
        />
      </el-form-item>
      <el-form-item
        v-if="formData.catId"
        prop="parts"
        label="尺码参数"
      >
        <el-checkbox-group v-if="partOptions?.length" v-model="formData.parts">
          <el-checkbox
            v-for="item in partOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            :disabled="Number(item.required) === 1"
          />
        </el-checkbox-group>
        <span v-else class="tw-text-red">该品类暂无可选尺码参数</span>
      </el-form-item>
      <el-form-item
        prop="groupCode"
        label="尺码"
      >
        <div>
          <DictionarySelect
            v-model="formData.groupCode"
            :dictionary="DICTIONARY_KEY.PLM_STANDARY_SIZE"
            class="tw-w-400px!"
          />
        </div>
      </el-form-item>
      <el-form-item
        v-if="formData.groupCode"
        prop="sizes"
      >
        <template #label>
          <el-checkbox
            v-model="isAllChecked"
            :indeterminate="isIndeterminate"
          >
            全选
          </el-checkbox>
        </template>
        <el-checkbox-group v-model="sortedSizes">
          <el-checkbox
            v-for="item in sizeOptions"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-checkbox-group>
      </el-form-item>
      <!-- 每次打开重新渲染SizeTable -->
      <SizeTable
        v-if="selfVisible"
        ref="sizeTableRef"
        :sizes="formData.sizes"
        :parts="selectedPartOptions"
        :default-sizes="formData.sizeReqs"
        :default-diffs="groupSizeDiffs"
      />
    </el-form>

    <template #footer>
      <el-button @click="onClose">取消</el-button>
      <el-button type="primary" @click="handleConfirm">提交</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed, toRef, watch } from 'vue';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import { ISizeTempCreateReq, ISizeTempPageResItem } from '../../../api/types';
import { useCheckAll } from '../hooks/use-check-all';
import SizeTable from './size-table.vue';
import { CUSTOM_DICTIONARY_KEY, DICTIONARY_KEY } from '@/constant/dictionary';
import { useDictionary } from '@/hooks/use-dictionary';
import { fetchSizeTempBatchCreate, fetchSizeTempEdit } from '../../../api';
import { ITemuPartRes } from '@/api/temu/type';
import { fetchTemuPart } from '@/api/temu';
import { cloneDeep } from 'lodash-es';
import { fetchSizeDiffPage } from '@/modules/base-config/size-diff/api';
import { ISizeDiffEditDiffItem } from '@/modules/base-config/size-diff/api/types';

interface Props {
  modelValue: boolean;
  data?: ISizeTempPageResItem;
  operationType?: 'add' | 'edit' | 'copy';
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void;
  (e: 'success'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const { getDictionaryOptions, getDictionaryOptionsSync } = useDictionary();

const isEdit = computed(() => props.operationType === 'edit');
const dialogTitle = computed(() => (isEdit.value ? '编辑尺寸模板' : '新增尺寸模板'));

const selfVisible = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
});

const sizeTableRef = ref<InstanceType<typeof SizeTable>>();
const formRef = ref<FormInstance>();

const initFormData: ISizeTempCreateReq = {
  templateName: '',
  catId: '',
  parts: [],
  sizes: [],
  groupCode: '',
  groupName: '',
  sizeReqs: []
};
const formData = reactive(cloneDeep(initFormData));

const formRules: FormRules<ISizeTempCreateReq> = {
  templateName: [{ required: true, message: '请输入模板名称', trigger: 'change' }],
  catId: [{ required: true, message: '请选择关联品类', trigger: 'change' }],
  parts: [{ required: true, message: '请选择尺码参数', trigger: 'change' }],
  groupCode: [{ required: true, message: '请选择尺码组', trigger: 'change' }],
  sizes: [{ required: true, message: '请选择尺码', trigger: 'change' }],
};

const partOptions = ref<ITemuPartRes>([]);
const selectedPartOptions = computed(() => {
  return partOptions.value.filter((part: { id: string; }) => (formData?.parts ?? []).some((id: string) => id === part.id));
});
const standardSizes = computed(() => getDictionaryOptions(DICTIONARY_KEY.PLM_STANDARY_SIZE));
const categoryOptions = computed(() => getDictionaryOptions(CUSTOM_DICTIONARY_KEY.TEMU_CATEGORY));
const sizeOptions = computed(() => {
  const selected = standardSizes.value.find(item => item.value === formData.groupCode)?.children?.[0];
  const list = selected?.label?.split(',') || [];
  return list.map((size) => {
    // 如果在 attributes 中找到对应的尺码名称，对尺码进行映射
    const attr = selected?.attributes?.find(item => item.code === size);
    return attr ? attr.name : size;
  });
});

/** 将列表转换为树形结构 */
const buildTree = (list: any[], parentId: string | null = '0'): any[] => {
  return list
    .filter(item => item.parentId === parentId)
    .map(item => ({
      ...item,
      children: buildTree(list, item.value)
    }))
    .map(item => (item.children.length > 0 ? item : { ...item, children: undefined }));
};
const categoryTree = computed(() => {
  const tree = buildTree(categoryOptions.value);
  // 从第三级开始展示
  return tree[0]?.children?.[0]?.children || [];
});


// 缓存部位选项，避免重复请求
const partOptionsCache = ref<{ [catId: string]: ITemuPartRes; }>({});
// 获取部位选项
const getPartOptisons = async (values?: string[]) => {
  const { catId } = formData;
  if (!catId) {
    partOptions.value = [];
    return;
  }
  if (partOptionsCache.value[catId]) {
    partOptions.value = partOptionsCache.value[catId];
  } else {
    const { data } = await fetchTemuPart(catId);
    partOptions.value = data || [];
    partOptionsCache.value[catId] = partOptions.value;
  }
  if (values) {
    formData.parts = values;
    return;
  }
  const newParts: string[] = [];
  partOptions.value.forEach((part) => {
    if (Number(part.required) === 1) {
      newParts.push(part.id);
    }
  });
  formData.parts = newParts;
};

const { isAllChecked, isIndeterminate } = useCheckAll(sizeOptions, toRef(formData, 'sizes'));

// 用computed代理formData.sizes，保证顺序
const sortedSizes = computed({
  get: () => formData.sizes,
  set: (val: string[]) => {
    formData.sizes = sizeOptions.value.filter(item => val.includes(item));
  }
});

const onClose = () => {
  formRef.value?.resetFields();
  Object.assign(formData, cloneDeep(initFormData));
  sizeTableRef.value?.reset();
  selfVisible.value = false;
};

const handleConfirm = async () => {
  if (!formRef.value) return;
  await formRef.value.validate();
  const { catId, ...restFormData } = formData;
  const sizeReqs = sizeTableRef.value?.getSizeValues() || [];

  // 校验 sizeReqs 的 values 中不能有空值
  const isEmpty = (val: number | null | undefined) => (val === null || val === undefined);
  const hasEmptyValue = sizeReqs.some(item => item.values.some(v => isEmpty(v.value)));
  if (hasEmptyValue) {
    ElMessage.warning('尺码参数值不能为空，请完善尺码信息');
    return;
  }

  const params = {
    ...restFormData,
    catId,
    groupName: standardSizes.value.find(item => item.value === restFormData.groupCode)?.label || '',
    catName: categoryOptions.value.find(item => item.value === catId)?.label || '',
    sizeReqs,
  };
  if (isEdit.value) {
    await fetchSizeTempEdit({
      templateId: props.data!.templateId,
      ...params,
    });
    ElMessage.success('编辑成功');
  } else {
    await fetchSizeTempBatchCreate([params]);
    ElMessage.success('创建成功');
  }
  selfVisible.value = false;
  emit('success');
};

const onOpen = async () => {
  // 编辑模式：回填数据
  if (props.data) {
    Object.keys(formData).forEach((key) => {
      if (key === 'sizeReqs' || key === 'sizes') return;
      // @ts-ignore
      formData[key] = props.data?.[key];
    });
    if (formData.catId) {
      getPartOptisons(formData.parts);
    }
    await getDictionaryOptionsSync(DICTIONARY_KEY.PLM_STANDARY_SIZE);
    const { temps, sizes } = props.data;
    if (sizes?.length) {
      // 过滤掉不在当前尺码组的尺码
      formData.sizes = sizes.filter(item => sizeOptions.value.includes(item)) || [];
    }
    if (temps?.length) {
      // 过滤掉不在当前尺码组的尺码
      formData.sizeReqs = temps.filter(item => sizeOptions.value.includes(item.size)) || [];
    }
  }
};

const groupSizeDiffs = ref<ISizeDiffEditDiffItem[]>([]);

watch(() => formData.groupCode, async () => {
  formData.sizes = [];
  if (!formData.groupCode) {
    groupSizeDiffs.value = [];
    return;
  }
  const { data } = await fetchSizeDiffPage({
    pageNum: 1,
    pageSize: 1,
    sizeCode: formData.groupCode,
  });
  groupSizeDiffs.value = data.list?.[0]?.diffs || [];
});
</script>
