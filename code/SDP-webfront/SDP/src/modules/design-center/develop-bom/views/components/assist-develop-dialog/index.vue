<script lang="ts" setup>
/**
 * 辅料开发dialog
 */
import useDialogVisible from '@/hooks-transfer/use-dialog-visible';
import { PropType, ComputedRef, ref, reactive, computed, toRaw } from 'vue';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import {
  DESIGN_MATERIAL_TYPE_ENUM,
  IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM,
  IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM_LIST,
} from '../../../constant';
import type {
  IBomOrderMaterialItem,
} from '../../edit/types';
import { cloneDeep } from 'lodash-es';
import type { IFormModel, IEditStore, IEmitConfirmedData } from './types';
import { PURPOSE_TYPE_ENUM } from './types';
import type { IdictValuesItem } from '@/api/dict/types';
import { usePrototypeNameSort } from '../../hooks/use-prototype-name-sort';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  materialList: {
    type: Array as PropType<IBomOrderMaterialItem[]>,
    default: () => [],
  },
  purpose: {
    type: String as PropType<keyof typeof PURPOSE_TYPE_ENUM>,
    default: PURPOSE_TYPE_ENUM.ADD,
    required: true,
  },
  // 如果purpose是PURPOSE_TYPE_ENUM.EDIT,需要传这个prop
  editStore: {
    type: Object as PropType<IEditStore>,
    default: () => {
      return {};
    },
  },
  assistAlphabetOptions: {
    type: Array as PropType<IdictValuesItem[]>,
    default: () => [],
  },
});
const { getDictionaryOptions } = useDictionary();

const emit = defineEmits(['update:modelValue', 'confirmed']);

const { visible: selfVisible } = useDialogVisible(props, emit);

/**
 * form相关
 */
const formRef = ref<FormInstance>();
const formModel = reactive<IFormModel>({
  // __f_selectedPrototypeMaterialNameRelatedBomMaterialId: '',
  __f_selectedPrototypeMaterialNameRelatedprototypeMaterialName: '',
  __f_demandCount: '',
  __f_demandCountUnit: '',
  __f_isMatchColorOrPackMaterial: IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM.NONE,
  __f_matchColorOrPackMaterialTargetRelatedBomMaterialId: '',
  __f_matchColorOrPackMaterialTargetRelatedprototypeMaterialName: '',
  __f_pictureList: [],
  __f_demandRemark: '',
});
const formRules = reactive<FormRules>(
  {
    __f_selectedPrototypeMaterialNameRelatedprototypeMaterialName: [
      { required: true, message: '必填', trigger: 'change' },
    ],
    __f_demandCount: [
      { required: true, message: '必填', trigger: 'change' },
    ],
    __f_demandCountUnit: [
      { required: true, message: '必填', trigger: 'change' },
    ],
    __f_isMatchColorOrPackMaterial: [
      { required: true, message: '必填', trigger: 'change' },
    ],
    __f_matchColorOrPackMaterialTargetRelatedBomMaterialId: [
      { required: true, message: '必填', trigger: 'change' },
    ],
    __f_pictureList: [
      { required: true, message: '必填', trigger: 'change' },
    ],
  },
);
/**
 * 辅料项目可选项
 */
const assistItemOptions = computed(() => {
  console.log('props.materialList', props.materialList, props.assistAlphabetOptions);
  const usableOptions = props.assistAlphabetOptions.filter((option) => {
    if (
      props.purpose === PURPOSE_TYPE_ENUM.EDIT
      && props.editStore?.initFormModel?.__f_selectedPrototypeMaterialNameRelatedprototypeMaterialName === option.value
    ) {
      return true;
    }
    return props.materialList.findIndex(v => option.label === v.prototypeMaterialName) < 0;
  });
  // if (props.purpose === PURPOSE_TYPE_ENUM.EDIT) {
  //   usableOptions?.unshift({
  //     value: props.editStore?.initFormModel?.__f_selectedPrototypeMaterialNameRelatedprototypeMaterialName,
  //   });
  // }
  return usableOptions;
});
const demandCountUnitOptions = computed(() => {
  return getDictionaryOptions(DICTIONARY_KEY.UNIT) || [];
});
const matchColorOrPackMaterialTargetOptions = computed(() => {
  return usePrototypeNameSort(props.materialList?.filter((v) => {
    return (v.demandType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST || v.demandType === DESIGN_MATERIAL_TYPE_ENUM.FABRIC)
    && v.prototypeMaterialName
    && v.bomMaterialId !== props.editStore?.__f_sourceBomMaterialId;
  }) || []);
});
const handleConfirm = async () => {
  const isValid = await formRef.value?.validate();
  if (isValid) {
    emit('confirmed', {
      __f_sourceBomMaterialId: props.purpose === PURPOSE_TYPE_ENUM.EDIT
        ? props.editStore?.__f_sourceBomMaterialId : undefined,
      demandData: {
        ...cloneDeep(toRaw(formModel)),
        ...{
          __f_matchColorOrPackMaterialTargetRelatedprototypeMaterialName: matchColorOrPackMaterialTargetOptions.value
            ?.find(v => v.bomMaterialId === formModel.__f_matchColorOrPackMaterialTargetRelatedBomMaterialId)
            ?.prototypeMaterialName || '',
        },
      },
    } as IEmitConfirmedData, props.purpose === PURPOSE_TYPE_ENUM.EDIT);
    ElMessage.success('操作成功');
    selfVisible.value = false;
  }
};

const resetVar = () => {
  // formModel.__f_selectedPrototypeMaterialNameRelatedBomMaterialId = '';
  formModel.__f_selectedPrototypeMaterialNameRelatedprototypeMaterialName = '';
  formModel.__f_demandCount = '';
  formModel.__f_demandCountUnit = '';
  formModel.__f_isMatchColorOrPackMaterial = IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM.NONE;
  formModel.__f_matchColorOrPackMaterialTargetRelatedBomMaterialId = '';
  formModel.__f_matchColorOrPackMaterialTargetRelatedprototypeMaterialName = '';
  formModel.__f_pictureList = [];
  formModel.__f_demandRemark = '';
  formRef.value?.clearValidate();
};
const handleOpen = async () => {
  resetVar();
  if (props.purpose === PURPOSE_TYPE_ENUM.EDIT) {
    Object.assign(formModel, props.editStore?.initFormModel);
  } else {
    // 默认设置第一个
    const assistAlphabetOptionsAvatar = cloneDeep(toRaw(props.assistAlphabetOptions)) || [];
    props.materialList.forEach((v) => {
      if (v.demandType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST) {
        if (v.prototypeMaterialName) {
          assistAlphabetOptionsAvatar
            .splice(assistAlphabetOptionsAvatar.findIndex(e => e.value === v.prototypeMaterialName), 1);
        }
      }
    });
    if (assistAlphabetOptionsAvatar?.length) {
      formModel.__f_selectedPrototypeMaterialNameRelatedprototypeMaterialName = assistAlphabetOptionsAvatar?.[0].value;
    }
  }
};
const handleClose = () => {
  resetVar();
};

</script>
<template>
  <el-dialog
    v-model="selfVisible"
    width="600px"
    title="辅料开发"
    append-to-body
    @open="handleOpen"
    @close="handleClose"
  >
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="formRules"
      label-position="right"
      label-width="112px"
    >
      <el-form-item
        label="辅料项目"
        prop="__f_selectedPrototypeMaterialNameRelatedprototypeMaterialName"
      >
        <el-select
          v-model="formModel.__f_selectedPrototypeMaterialNameRelatedprototypeMaterialName"
          clearable
          placeholder="请选择"
          class="common-width"
        >
          <el-option
            v-for="option in assistItemOptions"
            :key="option.value"
            :label="option.value"
            :value="option.value"
          />
        </el-select>
      </el-form-item>
      <el-row>
        <el-col :span="14">
          <el-form-item
            label="需求数量"
            prop="__f_demandCount"
          >
            <!-- <el-select
              v-model="formModel.__f_demandCount"
              clearable
              placeholder="请选择"
              class="common-width"
            >
              <el-option
                v-for="num in [...new Array(20).keys()].map(item => (item + 1).toString())"
                :key="num"
                :label="num"
                :value="num"
              />
            </el-select> -->
            <number-basis
              v-model="formModel.__f_demandCount"
              placeholder="请输入"
              :max="99999.99"
              :min="0.01"
              :precision="2"
              clearable
              class="common-width"
            />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item
            prop="__f_demandCountUnit"
            label-width="0px"
          >
            <el-select
              v-model="formModel.__f_demandCountUnit"
              clearable
              placeholder="请选择单位"
            >
              <el-option
                v-for="option in demandCountUnitOptions"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="14">
          <el-form-item
            label="是否对色/包料"
            prop="__f_isMatchColorOrPackMaterial"
          >
            <el-radio-group
              v-model="formModel.__f_isMatchColorOrPackMaterial"
              style="padding-left: 2px"
            >
              <el-radio
                v-for="option in IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM_LIST"
                :key="option.label"
                :label="option.value"
              >
                {{ option.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item
            v-if="formModel.__f_isMatchColorOrPackMaterial !== IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM.NONE"
            prop="__f_matchColorOrPackMaterialTargetRelatedBomMaterialId"
            label-width="0px"
          >
            <el-select
              v-model="formModel.__f_matchColorOrPackMaterialTargetRelatedBomMaterialId"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="option in matchColorOrPackMaterialTargetOptions"
                :key="option.bomMaterialId"
                :label="option.prototypeMaterialName"
                :value="option.bomMaterialId"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item
        label="图片"
        prop="__f_pictureList"
        :rules="{
          required: true,
          trigger: ['change', 'blur'],
          message: '请至少上传一张图片',
        }"
      >
        <Uploader
          v-model="formModel.__f_pictureList"
          style="width:100%"
          move
          :limit="9"
          accept=".jpg,.jpeg,.png"
          :check-accept="true"
          tips="最多可以上传9张图片, 支持png、jpg、jpeg图片格式，单个文件不能超过20MB"
          :size-limit="20"
        />
      </el-form-item>
      <el-form-item
        label="需求备注"
      >
        <el-input
          v-model="formModel.__f_demandRemark"
          type="textarea"
          row="6"
          placeholder="请输入"
          maxlength="100"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="selfVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="handleConfirm"
        >提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style lang="scss" scoped>
.label {
    font-weight: bold;
}
.margin-left-30 {
    margin-left: 30px;
}
.margin-bottom-8 {
    margin-bottom: 8px;
}
:deep(.el-form-item__label) {
    font-weight: bold;
}
.common-width{
    width: 206px;
}
</style>
