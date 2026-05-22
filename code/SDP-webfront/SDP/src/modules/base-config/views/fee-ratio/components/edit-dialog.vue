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
        label="外发版房类型"
        prop="roomExternalTypes"
      >
        <el-checkbox-group
          v-model="formData.roomExternalTypes"
          :disabled="isEditModal"
        >
          <el-checkbox
            v-for="item in ROOM_TYPE_LIST"
            :key="item.value"
            :label="item.value"
          >
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item
        label="外发纸样倍率"
        prop="designExternalRatio"
      >
        <NumberBasis
          v-model="formData.designExternalRatio"
          placeholder="请输入1000.00以内的外发纸样倍率"
          :min="0"
          :max="1000"
          :precision="2"
        />
      </el-form-item>
      <el-form-item
        label="外发车缝倍率"
        prop="makeExternalRatio"
      >
        <NumberBasis
          v-model="formData.makeExternalRatio"
          placeholder="请输入1000.00以内的外发车缝倍率"
          :min="0"
          :max="1000"
          :precision="2"
        />
      </el-form-item>
      <el-form-item
        v-if="showContinueItem"
        label="是否继续添加"
        placeholder="请输入内容"
        style="margin-top:20px"
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
import { YES_NO_STRING_ENUM } from '@/constant';
import { addEditionFee, editEditionFee } from '../api';
import type { IRoomEditionFeePageListItem } from '../api/type';
import useDialogVisible from '@/hooks-transfer/use-dialog-visible';
import { FormRules } from 'element-plus';
import { Callback } from '@/modules/base-config/api/type';
import { ROOM_TYPE_LIST } from '@/modules/base-config/constant';

export default defineComponent({
  components: {
  },
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Object as PropType<IRoomEditionFeePageListItem>,
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
      return `外发版费倍率 ${isEdit.value ? '修改' : '新增'}`;
    });
    const showContinueItem = computed(() => {
      return !isEdit.value;
    });
    const isContinue = ref(YES_NO_STRING_ENUM.NO);
    const formRef = ref();
    const defaultData = {
      id: '',
      roomExternalTypes: [''],
      designExternalRatio: '',
      makeExternalRatio: '',
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
    // 请求接口，新增或修改
    const requestApi = () => {
      const {
        roomExternalTypes,
        designExternalRatio,
        makeExternalRatio,
        id,
      } = formData;
      if (isEdit.value) {
        return editEditionFee({
          id,
          designExternalRatio,
          makeExternalRatio,
        });
      }
      // 新增
      return addEditionFee({
        roomExternalTypes,
        designExternalRatio,
        makeExternalRatio,
      });
    };

    const setFormData = (val: IRoomEditionFeePageListItem) => {
      formData.id = val.id;
      formData.roomExternalTypes = val.roomExternalType ? [val.roomExternalType] : [];
      formData.designExternalRatio = val.designExternalRatio;
      formData.makeExternalRatio = val.makeExternalRatio;
    };

    // 确认保存
    const handleConfirm = async () => {
      await formRef.value.validate();

      await requestApi();

      if (isContinue.value === YES_NO_STRING_ENUM.NO || isEdit.value) {
        selfVisible.value = false;
      }
      formRef.value.resetFields();
      setFormData(defaultData as IRoomEditionFeePageListItem);
      emit('refreshList');
    };

    watch(
      () => props.data,
      (val) => {
        setFormData(val);
      },
    );

    const validateDesignExternalRatio = (rule: FormRules, value: string, callback: Callback) => {
      // 新增，未输入时,不提示
      if (value === undefined) {
        return callback();
      }
      if (!value) {
        return callback(new Error('请输入外发纸样倍率'));
      }
      if (parseInt(value, 10) > 1000) {
        return callback(new Error('请输入1000.00以内的外发纸样倍率'));
      }
      return callback();
    };

    const validateMakeExternalRatio = (rule: FormRules, value: string, callback: Callback) => {
      // 新增，未输入时,不提示
      if (value === undefined) {
        return callback();
      }
      if (!value) {
        return callback(new Error('请输入外发车缝倍率'));
      }
      if (parseInt(value, 10) > 1000) {
        return callback(new Error('请输入1000.00以内的外发车缝倍率'));
      }
      return callback();
    };

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
        roomExternalTypes: [{ required: true, message: '请选择外发版房类型', trigger: ['blur'] }],
        designExternalRatio: [{ required: true, validator: validateDesignExternalRatio, trigger: ['blur', 'change'] }],
        makeExternalRatio: [{ required: true, validator: validateMakeExternalRatio, trigger: ['blur', 'change'] }],
      } as FormRules,
      YES_NO_STRING_ENUM,
      isEditModal: isEdit,
      ROOM_TYPE_LIST,

    };
  },
});
</script>

<style lang="scss" scoped>
.oprate{
  color: var(--el-color-primary);
  cursor: pointer;
}
.cur_p{
  cursor: pointer;
}
</style>
