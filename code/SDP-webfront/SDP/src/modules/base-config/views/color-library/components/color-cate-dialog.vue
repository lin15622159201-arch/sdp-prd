<script setup lang="ts">
import { type FormRules, type ElForm, ElMessage } from 'element-plus';
import type { IAddSysAdminWebDictReq, ISysAdminWebDictResItem, IUpdateSysAdminWebDictReq } from '../api/types';
import {
  addSysAdminWebDict,
  updateSysAdminWebDict,
} from '../api';
import { computed, ref, shallowRef, watch } from 'vue';
import { SYS_ADMIN_WEB_ATTRIBUTE_CODE_ENUM } from '../constant';
import { IFileData } from '@/components/uploader/packages/types';

interface IFormData extends IAddSysAdminWebDictReq {
  /** 示意图 */
  colorCategoryDiagramUrl?: IFileData[];
}

interface IProps {
  /** 是否编辑 */
  isEdit?: boolean;
  /** 父级id */
  parentId?: string;
  /** 当前颜色类别详情 */
  dictObj?: ISysAdminWebDictResItem;
}
interface IEmit {
  (event: 'success'): void;
}

const props = withDefaults(
  defineProps<IProps>(),
  {
    isEdit: false,
  },
);
const emit = defineEmits<IEmit>();
const formRef = shallowRef<InstanceType<typeof ElForm>>();
const visible = ref(false);
const baseData: IFormData = {
  dictCode: '',
  dictName: '',
  parentId: '',
  sorted: 0,
  labels: [],
  attributes: [],
  colorCategoryDiagramUrl: [],
};
const formData = ref<IFormData>({
  ...baseData,
});

const getDefaultRule = (message: string) => {
  return [
    { required: true, message, trigger: ['change', 'blur'] },
  ];
};

const rules: FormRules = {
  dictName: getDefaultRule('请输入颜色类别'),
  // colorCategoryCode: getDefaultRule('请输入类别编码'),
  // colorCategoryDiagramUrl: getDefaultRule('请上传示意图'),
};

const title = computed(() => {
  return props.isEdit ? '编辑颜色类别' : '新增颜色类别';
});

const handleOpen = async () => {
  const { dictObj, parentId } = props;
  formData.value.parentId = parentId || '';
  if (dictObj) {
    formData.value.dictName = dictObj.dictName;
    formData.value.dictCode = dictObj.dictCode;
    formData.value.sorted = dictObj.sorted || 0;
    formData.value.attributes = dictObj.attributes ?? [];
    formData.value.colorCategoryDiagramUrl = [];
    const c = formData.value.attributes?.find(item => item.code === SYS_ADMIN_WEB_ATTRIBUTE_CODE_ENUM.SYT);
    if (c && c.name) {
      formData.value.colorCategoryDiagramUrl = [{ url: c.name }];
    }
  }
  visible.value = true;
};

const handleConfirm = async () => {
  await formRef.value!.validate();
  console.log('formData=', formData.value);

  const { isEdit, parentId, dictObj } = props;
  const { dictName, sorted = 0, colorCategoryDiagramUrl: imgUrl, attributes = [] } = formData.value;

  if (!isEdit) {
    const data: IAddSysAdminWebDictReq = {
      dictName,
      dictCode: dictName,
      sorted: sorted || 0,
      parentId,
      attributes: [
        {
          code: SYS_ADMIN_WEB_ATTRIBUTE_CODE_ENUM.SYT,
          name: imgUrl?.length ? imgUrl[0].url : '',
          id: '',
          remark: '示意图',
        }
      ],
      labels: [],
      remark: '',
    };
    await addSysAdminWebDict(data);
    ElMessage.success('新建成功');
  } else {
    let imgId = '';
    attributes.forEach((a) => {
      if (a.code === SYS_ADMIN_WEB_ATTRIBUTE_CODE_ENUM.SYT) {
        imgId = a.id;
      }
    });
    const data: IUpdateSysAdminWebDictReq = {
      id: dictObj?.id ?? '',
      dictName,
      sorted: sorted || 0,
      attributes: [
        {
          code: SYS_ADMIN_WEB_ATTRIBUTE_CODE_ENUM.SYT,
          name: imgUrl?.length ? imgUrl[0].url : '',
          id: imgId,
          remark: '示意图',
        }
      ],
      labels: [],
      remark: '',
    };
    await updateSysAdminWebDict(data);
    ElMessage.success('修改成功');
  }
  visible.value = false;
  emit('success');
};

watch(visible, (val) => {
  if (!val) {
    formData.value = { ...baseData };
    setTimeout(() => {
      formRef.value?.clearValidate();
    });
  }
});

defineExpose({
  handleOpen,
});

</script>

<template>
  <el-dialog
    v-model="visible"
    :title="title"
    custom-class="dialog-width-small el-dialog-inner-scroll"
    :close-on-click-modal="false"
    center
    append-to-body
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="颜色类别" prop="dictName">
        <el-input
          v-model.trim="formData.dictName"
          maxlength="100"
          show-word-limit
          placeholder="请输入颜色类别"
        />
      </el-form-item>
      <el-form-item label="排序" prop="sorted">
        <input-number
          v-model="formData.sorted"
          :max="999.99"
          :precision="0"
          placeholder="请输入排序"
        />
      </el-form-item>
      <el-form-item label="示意图" prop="colorCategoryDiagramUrl">
        <uploader
          v-model="formData.colorCategoryDiagramUrl"
          :limit="1"
          accept=".png,.jpg,.jpeg"
          :size-limit="20 * 1024 * 1024"
          tips="仅上传1 张图片, 支持png、jpg、jpeg图片格式"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">
        取 消
      </el-button>
      <el-button type="primary" @click="handleConfirm">
        确 定
      </el-button>
    </template>
  </el-dialog>
</template>
