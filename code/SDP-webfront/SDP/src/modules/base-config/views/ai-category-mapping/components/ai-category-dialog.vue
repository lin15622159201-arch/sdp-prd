<template>
  <el-dialog
    v-model="visible"
    width="600"
    :title="`${titleType}品类映射关系`"
    @open="handelOpen"
    @close="handleCanceDialog"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="120px"
    >
      <el-form-item
        label="类型"
        prop="type"
      >
        <el-select
          class="tw-w-100%"
          v-model="formData.type"
          placeholder="请选择"
          clearable
        >
          <el-option
            v-for="item in TYPE_MAPPING_LIST"
            :key="item.value"
            :label="item.label"
            :value="item.value || ''"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="AI品类"
        prop="aiCategoryCodeArr"
      >
        <el-cascader
          v-model="formData.aiCategoryCodeArr"
          clearable
          class="tw-w-full"
          :options="(aiCategoryList as any)"
          :props="{
            label: 'value',
            value: 'code',
          }"
        />
      </el-form-item>
      <el-form-item
        label="内部品类"
        prop="innerCategoryCodeArr"
      >
        <el-cascader
          v-model="formData.innerCategoryCodeArr"
          clearable
          class="tw-w-full"
          :options="(categoryTreeList as any)"
          :props="{
            label: 'label',
            value: 'value',
          }"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCanceDialog">取 消</el-button>
        <el-button
          type="primary"
          @click="save"
        >确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ElForm } from 'element-plus';
import { computed, nextTick, ref } from 'vue';
import { IAiCategoryMappingAiCategoryListItem, IAiCategoryMappingPageResListItem } from '../api/type';
import { useDict } from '../hooks/use-dict';
import { getAiCategoryMappingDetail, updateAiCategoryMapping } from '../api';
import { treeFindPath } from '@/core/utils/array';
import { IDictionaryItem } from '@/hooks/use-dictionary/types';
import { useResetRef } from '@toy/v-use';
import { TYPE_MAPPING_LIST } from '../constant/index';

const { categoryTreeList, aiCategoryList } = useDict();
interface IFormDataItem extends IAiCategoryMappingPageResListItem {
  aiCategoryCodeArr?: string[];
  innerCategoryCodeArr?: string[];
}
const props = defineProps({
  aiCategoryMappingId: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['success']);

const titleType = computed(() => {
  return props.aiCategoryMappingId ? '编辑' : '新增';
});
const formRef = ref<InstanceType<typeof ElForm> | null>();
const [formData, resetForm] = useResetRef<IFormDataItem>({
  aiCategoryCode: '',
  aiCategoryName: '',
  categoryCode: '',
  categoryName: '',
  aiCategoryMappingId: '',
  remark: '',
  creatorId: '',
  creatorName: '',
  createdTime: '',
  reviserId: '',
  reviserName: '',
  revisedTime: '',
  innerCategoryCodeArr: [],
  aiCategoryCodeArr: [],
  type: 'STANDARD_SIZE',
});
const formRules = {
  aiCategoryCodeArr: [
    { required: true, message: '不能为空' },
  ],
  innerCategoryCodeArr: [
    { required: true, message: '不能为空' },
  ],
  type: [
    { required: true, message: '不能为空' },
  ],
};

const visible = defineModel('visible', {
  type: Boolean,
  default: false,
});

const handelOpen = async () => {
  const { aiCategoryMappingId } = props;
  if (!aiCategoryMappingId) return;
  const { data } = await getAiCategoryMappingDetail(aiCategoryMappingId);
  formData.value.aiCategoryMappingId = data.aiCategoryMappingId;
  if (data.aiCategoryCode?.includes('-')) {
    formData.value.aiCategoryCodeArr = data.aiCategoryCode.split('-');
  } else {
    const arr = treeFindPath<IAiCategoryMappingAiCategoryListItem>(
      aiCategoryList.value,
      'children',
      d => d.code === data.aiCategoryCode,
    ).map(item => item.code);
    formData.value.aiCategoryCodeArr = arr || [];
  }
  formData.value.innerCategoryCodeArr = data.categoryCode ? data.categoryCode.split('-') : [];
  formData.value.aiCategoryName = data.aiCategoryName;
  formData.value.categoryName = data.categoryName;
  formData.value.type = data.type;
  nextTick(() => {
    formRef.value?.clearValidate();
  });
};
const handleCanceDialog = () => {
  resetForm();
  visible.value = false;
};

const save = async () => {
  await formRef.value?.validate();
  const { innerCategoryCodeArr = [], aiCategoryCodeArr = [], aiCategoryMappingId, type } = formData.value;
  const lastAiNodeId = aiCategoryCodeArr[aiCategoryCodeArr.length - 1];
  const aiCategoryName = treeFindPath<IAiCategoryMappingAiCategoryListItem>(
    aiCategoryList.value,
    'children',
    data => data.code === lastAiNodeId,
  ).map(item => item.value).join('-');

  const lastNodeId = innerCategoryCodeArr[innerCategoryCodeArr.length - 1];
  const categoryName = treeFindPath<IDictionaryItem>(
    categoryTreeList.value,
    'children',
    data => data.value === lastNodeId,
  ).map(item => item.label).join('-');
  const data = {
    aiCategoryCode: aiCategoryCodeArr[aiCategoryCodeArr.length - 1],
    aiCategoryName,
    categoryCode: innerCategoryCodeArr.join('-'),
    categoryName,
    aiCategoryMappingId,
    type,
  };
  await updateAiCategoryMapping(data);
  handleCanceDialog();
  emit('success');
};

</script>

<style lang="scss" scoped>
//
</style>
