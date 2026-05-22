<template>
  <el-dialog
    v-model="selfVisible"
    :title="title"
    center
    :show-close="true"
    custom-class="el-dialog-inner-scroll"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    append-to-body
    @close="handleClose"
  >
    <el-form
      ref="formRef"
      :model="formData"
      label-width="130px"
      :rules="rules"
    >
      <el-form-item
        label="部位名称"
        prop="clothesPartsName"
      >
        <el-input
          v-model="formData.clothesPartsName"
          class="size-input-row"
          placeholder="请输入"
          max-length="25"
        />
      </el-form-item>
      <el-form-item
        label="尺寸维度"
        prop="sizeDimensions"
      >
        <el-radio-group v-model="formData.sizeDimensions">
          <el-radio label="1">
            {{ SIZE_DIMESSION.X1 }}
          </el-radio>
          <el-radio label="2">
            {{ SIZE_DIMESSION.X2 }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="允差范围（cm）"
        prop="errorRange"
      >
        <NumberBasis
          v-model="formData.errorRange"
          placeholder="请输入"
          :min="0.01"
          :max="9999.99"
          :precision="2"
        />
      </el-form-item>
      <template v-for="(item, index) in formData.measuringMethodList" :key="index">
        <el-form-item
          :label="index === 0 ? '量法' : ''"
          prop="measuringMethodList"
          class="size-input-item"
        >
          <el-input
            v-model="formData.measuringMethodList[index]"
            class="size-input-row"
            placeholder="请输入"
            max-length="50"
          />
          <el-icon
            class="row-icon"
            @click="addSizeInputRow()"
          >
            <Plus />
          </el-icon>
          <el-icon
            v-if="index > 0"
            class="row-icon"
            @click="deleteSizeInputRow(index)"
          >
            <Delete />
          </el-icon>
        </el-form-item>
      </template>

      <el-form-item
        v-if="showContinueItem"
        label="是否继续添加"
        placeholder="请输入内容"
      >
        <el-radio-group v-model="isContinue">
          <el-radio :label="YES_NO_STRING_ENUM.YES">
            是
          </el-radio>
          <el-radio :label="YES_NO_STRING_ENUM.NO">
            否
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleClose">
        取 消
      </el-button>
      <el-button type="primary" @click="handleConfirm">
        确 定
      </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, ref, toRefs, computed, reactive, watch } from 'vue';
import { SIZE_DIMESSION } from '@/modules/base-config/constant';
import { addClotheSize, editClotheSize } from '../api';
import { YES_NO_STRING_ENUM } from '@/constant/global';
import type {
  IClothesPartsSizePageListItem,
  IClothesPartsSizePagePartsMeasurementVOListItem as ImeasurementVOListItem
} from '../api/type';
import { Plus, Delete } from '@element-plus/icons-vue';
import NumberBasis from '@/components/number-basis';
import { ElMessage, FormRules } from 'element-plus';
import useDialogVisible from '@/hooks-transfer/use-dialog-visible';

interface ValidateError {
  message: string;
  field: string;
}

type FieldErrorList = Record<string, ValidateError[]>;

interface Callback {
  (isValid?: boolean | Error, invalidFields?: FieldErrorList): void;
}

export default defineComponent({
  components: {
    Plus,
    Delete,
    NumberBasis,
  },
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Object as PropType<IClothesPartsSizePageListItem>,
      required: true,
    },
    isEdit: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['refreshList', 'update:modelValue'],
  setup(props, { emit }) {
    const { visible: selfVisible } = useDialogVisible(props, emit);
    const { isEdit } = toRefs(props);
    const title = computed(() => {
      return `部位名称 ${isEdit.value ? '修改' : '新增'}`;
    });
    const showContinueItem = computed(() => {
      return !isEdit.value;
    });
    const isContinue = ref(YES_NO_STRING_ENUM.NO);
    const formRef = ref();
    const defaultData = {
      id: '',
      clothesPartsName: '',
      sizeDimensions: '',
      errorRange: '',
      measuringMethodList: [''] as string[],
    };
    const formData = reactive({
      ...defaultData,
    });
    // 关闭弹窗
    const handleClose = () => {
      selfVisible.value = false;
      formRef.value.resetFields();
      isContinue.value = YES_NO_STRING_ENUM.NO;
    };
    const filterEmptyMethod = (measuringMethodList: string[]) => {
      const _measuringMethodList = measuringMethodList.map((it: string) => it?.trim());
      return _measuringMethodList.filter((it: string) => it);
    };
    // 请求接口，新增或修改
    const requestApi = () => {
      const { clothesPartsName, sizeDimensions, errorRange, id, measuringMethodList } = formData;
      const _measuringMethodList = filterEmptyMethod(measuringMethodList);
      if (isEdit.value) {
        return editClotheSize({
          id,
          clothesPartsName,
          sizeDimensions,
          errorRange,
          measuringMethodList: _measuringMethodList,
        });
      }
      // 新增
      return addClotheSize({
        clothesPartsName,
        sizeDimensions,
        errorRange,
        measuringMethodList: _measuringMethodList,
      });
    };
    const getMeasuringMethodList = (partsMeasurementVOList: ImeasurementVOListItem[]) => {
      const arr = partsMeasurementVOList?.map(item => item.measuringMethod);
      return arr?.length > 0 ? arr : [''];
    };
    const setFormData = (val: IClothesPartsSizePageListItem) => {
      formData.id = val.id;
      formData.clothesPartsName = val.clothesPartsName;
      formData.sizeDimensions = val.sizeDimensions;
      formData.errorRange = val.errorRange;
      formData.measuringMethodList = getMeasuringMethodList(val.partsMeasurementVOList) || [''];
    };

    const checkMeasuringMethodList = (rule: FormRules, value: string[], callback: Callback) => {
      const isEmpty = value?.every((it: any) => {
        return !it;
      });
      if (isEmpty) {
        return callback(new Error('请输入量法'));
      }
      return callback();
    };

    const addSizeInputRow = () => {
      if (formData.measuringMethodList?.length >= 10) {
        ElMessage.warning('最多可设置10个量法，请删除后再添加');
        return;
      }
      formData.measuringMethodList.push('');
    };
    const deleteSizeInputRow = (index: number) => {
      formData.measuringMethodList.splice(index, 1);
    };

    // 确认保存
    const handleConfirm = async () => {
      await formRef.value.validate();
      await requestApi();

      if (isContinue.value === YES_NO_STRING_ENUM.NO || isEdit.value) {
        selfVisible.value = false;
      }
      formRef.value.resetFields();
      setFormData(defaultData as IClothesPartsSizePageListItem);
      emit('refreshList');
    };

    watch(
      () => props.data,
      (val) => {
        setFormData(val);
      },
    );

    return {
      formRef,
      selfVisible,
      formData,
      isContinue,
      handleClose,
      handleConfirm,
      showContinueItem,
      title,
      rules: {
        clothesPartsName: [{ required: true, message: '请输入部位名称', trigger: ['blur'] }],
        sizeDimensions: [{ required: true, message: '请选择尺寸维度', trigger: ['blur'] }],
        errorRange: [{ required: true, message: '请输入允差范围', trigger: ['blur'] }],
        measuringMethodList: [{ required: true, validator: checkMeasuringMethodList, trigger: ['blur'] }],
      } as FormRules,
      YES_NO_STRING_ENUM,
      SIZE_DIMESSION,
      addSizeInputRow,
      deleteSizeInputRow,
    };
  },
});
</script>

<style lang="scss" scoped>
  .size-input-item {
    :deep(.el-form-item__content){
      display: flex;
      align-items: center;
    }
  }
  .size-input-row {
    width: 80%;
  }
  .row-icon{
    padding:2px;
    margin-left: 15px;
    cursor: pointer;
    color: var(--el-color-primary);
  }
</style>
