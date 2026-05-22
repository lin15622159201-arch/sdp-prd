<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { computed, isRef, ref, shallowRef, watch, type Ref } from 'vue';
import { addSysAdminWebDict, updateSysAdminWebDict, baseAllColorCategoryApi } from '../api';
import type { FormRules, ElForm } from 'element-plus';
import type { IAddSysAdminWebDictReq, ISysAdminWebDictResItem } from '../api/types';
import { IColorPageItem } from '../hooks/use-table';
import { SYS_ADMIN_WEB_ATTRIBUTE_CODE_ENUM } from '../constant';
import { IFileData } from '@/components/uploader/packages/types';


interface FormData extends IAddSysAdminWebDictReq {
  /** 示意图 */
  colorDiagramUrl: IFileData[];
  /**
   * 色号
   */
  colorNumber: string;
  /**
   * 英文翻译
   */
  englishName: string;
  /**
   * 英文缩写
   */
  englishAbbreviation: string;
  /**
   * PLM映射色号
   */
  mapColorCode: string;
}

interface IProps {
  colorCateList: Ref<ISysAdminWebDictResItem[]>;
  isEdit?: boolean;
  parentId?: string;
  dictObj?: IColorPageItem;
}
interface IEmit {
  (event: 'success'): void;
}
const getNodeNameByCode = (treeData: any, targetCode: any): any => {
  if (!Array.isArray(treeData) || treeData.length === 0) {
    return null;
  }
  /* eslint-disable no-restricted-syntax */
  for (const node of treeData) {
    if (node.code === targetCode) {
      return node.name;
    }
    if (Array.isArray(node.colorRespList) && node.colorRespList.length > 0) {
      const childName = getNodeNameByCode(node.colorRespList, targetCode);
      if (childName) {
        return childName;
      }
    }
  }
  return null;
};
const props = withDefaults(
  defineProps<IProps>(),
  {
    isEdit: false,
  },
);
const colorCateList = computed(() => {
  return isRef(props.colorCateList) ? props.colorCateList.value : props.colorCateList;
});

const colorCodeReg = /^[a-zA-Z0-9-]+$/;
const emit = defineEmits<IEmit>();
const formRef = shallowRef<InstanceType<typeof ElForm>>();
const visible = ref(false);
const baseData:FormData = {
  parentId: '',
  /**
   * 示意图
   */
  colorDiagramUrl: [],
  /**
   * 色号
   */
  colorNumber: '',
  englishName: '',
  englishAbbreviation: '',
  mapColorCode: '',
  dictName: '',
  dictCode: '',
  sorted: 0
};
const formData = ref<FormData>({
  ...baseData,
});

const getDefaultRule = (message?: string) => {
  return [
    {
      required: true,
      message,
      trigger: ['change', 'blur'],
    },
  ];
};

const rules: FormRules = {
  parentId: getDefaultRule('请选择颜色类别'),
  dictName: getDefaultRule('请输入颜色名称'),
  englishName: getDefaultRule('请输入英文翻译'),
  englishAbbreviation: getDefaultRule('请输入英文缩写'),
  mapColorCode: getDefaultRule('请选择PLM映射色号'),
  colorNumber: [
    {
      ...getDefaultRule()[0],
      validator(_, __, callback) {
        if (!formData.value.colorNumber) {
          callback(new Error('请输入色号'));
        } else if (!colorCodeReg.test(formData.value.colorNumber)) {
          callback(new Error('色号允许输入 数字、英文字母、特殊符号“-”'));
        } else {
          callback();
        }
      },
    },
  ],
  // colorDiagramUrl: getDefaultRule('请上传示意图'),
};

const title = computed(() => {
  return props.isEdit ? '编辑颜色' : '新增颜色';
});

const handleOpen = async () => {
  const { parentId, dictObj } = props;
  formData.value.parentId = parentId || '';
  if (dictObj) {
    formData.value.dictCode = dictObj.dictCode;
    formData.value.dictName = dictObj.dictName;
    formData.value.sorted = dictObj.sorted || 0;
    formData.value.attributes = dictObj.attributes ?? [];
    dictObj.attributes?.forEach((d) => {
      if (d.code === SYS_ADMIN_WEB_ATTRIBUTE_CODE_ENUM.SH) {
        formData.value.colorNumber = d.name;
      }
      if (d.code === SYS_ADMIN_WEB_ATTRIBUTE_CODE_ENUM.YWFY) {
        formData.value.englishName = d.name;
      }
      if (d.code === SYS_ADMIN_WEB_ATTRIBUTE_CODE_ENUM.YWSX) {
        formData.value.englishAbbreviation = d.name;
      }
      if (d.code === SYS_ADMIN_WEB_ATTRIBUTE_CODE_ENUM.YSSH) {
        formData.value.mapColorCode = d.remark;
      }
      if (d.code === SYS_ADMIN_WEB_ATTRIBUTE_CODE_ENUM.SYT) {
        formData.value.colorDiagramUrl = d.name ? [{ url: d.name }] : [];
      }
    });
  }
  visible.value = true;
};

const handleConfirm = async () => {
  await formRef.value!.validate();
  const { isEdit, dictObj } = props;
  const {
    dictName,
    sorted = 0,
    colorNumber,
    englishName,
    englishAbbreviation,
    mapColorCode,
    attributes = [],
    colorDiagramUrl,
    parentId,
  } = formData.value;
  const imgUrl = colorDiagramUrl.length > 0 ? colorDiagramUrl[0].url : '';
  if (!isEdit) {
    await addSysAdminWebDict({
      dictName,
      dictCode: dictName,
      sorted: sorted || 0,
      parentId,
      attributes: [
        {
          code: SYS_ADMIN_WEB_ATTRIBUTE_CODE_ENUM.SYT,
          name: imgUrl,
          id: '',
          remark: '示意图',
        },
        {
          code: SYS_ADMIN_WEB_ATTRIBUTE_CODE_ENUM.SH,
          name: colorNumber,
          id: '',
          remark: '色号',
        },
        {
          code: SYS_ADMIN_WEB_ATTRIBUTE_CODE_ENUM.YWFY,
          name: englishName,
          id: '',
          remark: '英文翻译',
        },
        {
          code: SYS_ADMIN_WEB_ATTRIBUTE_CODE_ENUM.YWSX,
          name: englishAbbreviation,
          id: '',
          remark: '英文缩写',
        },
        {
          code: SYS_ADMIN_WEB_ATTRIBUTE_CODE_ENUM.YSSH,
          name: getNodeNameByCode(mapColorCodeList.value, mapColorCode),
          id: '',
          remark: mapColorCode,
        },
      ],
      labels: [],
      remark: '',
    });
    ElMessage.success('新建成功');
  } else {
    let imgId = '';
    let colorNumberId = '';
    let englishNameId = '';
    let englishAbbreviationId = '';
    let mapColorCodeId = '';
    attributes.forEach((a) => {
      if (a.code === SYS_ADMIN_WEB_ATTRIBUTE_CODE_ENUM.SYT) {
        imgId = a.id;
      }
      if (a.code === SYS_ADMIN_WEB_ATTRIBUTE_CODE_ENUM.SH) {
        colorNumberId = a.id;
      }
      if (a.code === SYS_ADMIN_WEB_ATTRIBUTE_CODE_ENUM.YWFY) {
        englishNameId = a.id;
      }
      if (a.code === SYS_ADMIN_WEB_ATTRIBUTE_CODE_ENUM.YWSX) {
        englishAbbreviationId = a.id;
      }
      if (a.code === SYS_ADMIN_WEB_ATTRIBUTE_CODE_ENUM.YSSH) {
        mapColorCodeId = a.id;
      }
    });
    await updateSysAdminWebDict({
      id: dictObj?.id ?? '',
      dictName,
      sorted,
      attributes: [
        {
          code: SYS_ADMIN_WEB_ATTRIBUTE_CODE_ENUM.SYT,
          name: imgUrl,
          id: imgId,
          remark: '示意图',
        },
        {
          code: SYS_ADMIN_WEB_ATTRIBUTE_CODE_ENUM.SH,
          name: colorNumber,
          id: colorNumberId,
          remark: '色号',
        },
        {
          code: SYS_ADMIN_WEB_ATTRIBUTE_CODE_ENUM.YWFY,
          name: englishName,
          id: englishNameId,
          remark: '英文翻译',
        },
        {
          code: SYS_ADMIN_WEB_ATTRIBUTE_CODE_ENUM.YWSX,
          name: englishAbbreviation,
          id: englishAbbreviationId,
          remark: '英文缩写',
        },
        {
          code: SYS_ADMIN_WEB_ATTRIBUTE_CODE_ENUM.YSSH,
          id: mapColorCodeId,
          name: getNodeNameByCode(mapColorCodeList.value, mapColorCode),
          remark: mapColorCode,
        },
        
      ],
      labels: [],
      remark: '',
    });
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
const mapColorCodeList = ref<any>([]);
const initMapColorCodeDataa = async () => {
  const { data } = await baseAllColorCategoryApi();
  mapColorCodeList.value = data;
};
initMapColorCodeDataa();
const pimsCategoryProps = ref<any>({
  label: 'name',
  value: 'code',
  children: 'colorRespList',
  emitPath: false,
  multiple: false,
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
      label-width="100px"
    >
      <el-form-item label="颜色类别" prop="parentId">
        <el-select
          v-model="formData.parentId"
          placeholder="请选择颜色类别"
          :disabled="isEdit"
          style="width: 100%"
        >
          <el-option
            v-for="item in colorCateList"
            :key="item.id"
            :value="item.id"
            :label="item.dictName"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="颜色名称" prop="dictName">
        <el-input
          v-model.trim="formData.dictName"
          placeholder="请输入颜色名称"
          maxlength="100"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="色号" prop="colorNumber">
        <el-input
          v-model.trim="formData.colorNumber"
          placeholder="请输入色号"
        />
      </el-form-item>
      <el-form-item label="英文翻译" prop="englishName">
        <el-input
          v-model.trim="formData.englishName"
          placeholder="请输入英文翻译"
        />
      </el-form-item>
      <el-form-item label="英文缩写" prop="englishAbbreviation">
        <el-input
          v-model.trim="formData.englishAbbreviation"
          placeholder="请输入英文缩写"
        />
      </el-form-item>
      <el-form-item label="PLM映射色号" prop="mapColorCode">
        <el-cascader
          class="tw-w-100%"
          style="margin-left: auto;"
          placeholder="PLM映射色号"
          v-model="formData.mapColorCode"
          clearable
          :options="mapColorCodeList as any"
          :show-all-levels="false"
          :props="pimsCategoryProps"
        />
      </el-form-item>
      <el-form-item label="示意图" prop="colorDiagramUrl">
        <uploader
          v-model="formData.colorDiagramUrl"
          :limit="1"
          accept=".png, .jpg, .jpeg"
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
