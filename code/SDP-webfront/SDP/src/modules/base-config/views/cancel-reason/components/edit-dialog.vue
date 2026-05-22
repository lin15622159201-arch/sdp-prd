<template>
  <el-dialog
    v-model="selfVisible"
    :title="title"
    custom-class="el-dialog-inner-scroll"
    center
    :show-close="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    append-to-body
  >
    <el-form
      ref="formRef"
      :model="formData"
      label-width="130px"
      :rules="rules"
    >
      <el-form-item
        label="取消原因"
        prop="cancelReason"
      >
        <el-input
          v-model="formData.cancelReason"
          placeholder="请输入取消原因"
          class="size-input-row"
        />
      </el-form-item>
      <el-form-item
        label="是否收费"
        prop="isCharge"
      >
        <el-radio-group v-model="formData.isCharge">
          <el-radio :label="YES_NO_ENUM.YES">
            是
          </el-radio>
          <el-radio :label="YES_NO_ENUM.NO">
            否
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        v-if="showContinue"
        label="是否继续添加"
      >
        <el-radio-group v-model="isContinue">
          <el-radio :label="YES_NO_ENUM.YES">
            是
          </el-radio>
          <el-radio :label="YES_NO_ENUM.NO">
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
import { YES_NO_ENUM } from '@/constant';
import type { PropType } from 'vue';
import { defineComponent, watch, toRefs, ref, computed } from 'vue';
import type { ICancelReasonPageListItem } from '../api/type';
import { addCancelReason, updateCancelReason } from '../api/index';
import useDialogVisible from '@/hooks-transfer/use-dialog-visible';

export default defineComponent({
  props: {
    isEdit: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Object as PropType<ICancelReasonPageListItem | object >,
      required: true,
    },
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  // 自定义事件
  // refreshList调用父组件的handleSearch方法
  emits: ['refreshList', 'update:modelValue'],
  setup(props, { emit }) {
    // 对传递的visible进行处理
    const { visible: selfVisible } = useDialogVisible(props, emit);
    const { isEdit } = toRefs(props);
    // 获取弹窗标题
    const title = computed(() => {
      return `取消原因 ${isEdit.value ? '编辑' : '新建'}`;
    });
    // 是否显示继续添加
    const showContinue = computed(() => {
      // 为编辑时不显示继续添加列项
      return !isEdit.value;
    });
    // 初始化表单数据
    const defaultData = {
      id: '',
      cancelReason: '',
      isCharge: '',
    };
    const formData = ref({ ...defaultData });
    const formRef = ref();
    const isContinue = ref(YES_NO_ENUM.NO);
    // 赋值表单数据
    const setFormData = (val: ICancelReasonPageListItem) => {
      formData.value.id = val.id;
      formData.value.cancelReason = val.cancelReason;
      formData.value.isCharge = val.isCharge;
    };
    // 监听父组件传递的data变化
    watch(() => props.data, () => {
      setFormData(props.data as ICancelReasonPageListItem);
    });
    // 关闭弹窗
    const handleClose = () => {
      selfVisible.value = false;
      // 清空表单
      formRef.value.resetFields();
      // 设置是否继续添加默认值
      isContinue.value = YES_NO_ENUM.NO;
    };
    // 获取新增和编辑请求接口
    const requestApi = () => {
      const { id, cancelReason, isCharge } = formData.value;
      // 编辑接口
      if (isEdit.value) {
        return updateCancelReason({
          id,
          cancelReason,
          isCharge,
        });
      }
      return addCancelReason({
        cancelReason,
        isCharge,
      });
    };
    // 确认保存
    const handleConfirm = async () => {
      await formRef.value.validate();
      await requestApi();
      // 若不继续添加和为编辑时，直接关闭弹窗
      if (isContinue.value === YES_NO_ENUM.NO || isEdit.value) {
        selfVisible.value = false;
      }
      formRef.value.resetFields();
      setFormData(defaultData as ICancelReasonPageListItem);
      emit('refreshList');
    };

    return {
      YES_NO_ENUM,
      selfVisible,
      title,
      showContinue,
      isContinue,
      formData,
      formRef,
      rules: {
        cancelReason: [{ required: true, message: '请输入取消原因', trigger: ['blur'] }],
        isCharge: [{ required: true, message: '请选择是否收费', trigger: ['blur'] }],
      },
      handleClose,
      handleConfirm,
    };
  },
});
</script>

<style lang="scss" scoped>
//
</style>
