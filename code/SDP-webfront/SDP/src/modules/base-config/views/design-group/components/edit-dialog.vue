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
        label="设计组别"
        prop="designerGroupName"
      >
        <el-input
          v-model="formData.designerGroupName"
          placeholder="请输入"
          max-length="10"
        />
      </el-form-item>
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
import { YES_NO_STRING_ENUM } from '@/constant/global';
import { saveGroup, updateGroup } from '../api';
import type { IDesignerPageListItem } from '../api/type';
import useDialogVisible from '@/hooks-transfer/use-dialog-visible';

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Object as PropType<IDesignerPageListItem>,
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
      return `设计组别 ${isEdit.value ? '修改' : '新增'}`;
    });
    const showContinueItem = computed(() => {
      return !isEdit.value;
    });
    const isContinue = ref(YES_NO_STRING_ENUM.NO);
    const formRef = ref();
    const defaultData = {
      id: '',
      designerGroupName: '',
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
      const { designerGroupName, id } = formData;
      if (isEdit.value) {
        return updateGroup({
          id,
          designerGroupName,
        });
      }
      // 新增
      return saveGroup({
        designerGroupName,
      });
    };
    const setFormData = (val: IDesignerPageListItem) => {
      formData.id = val.id;
      formData.designerGroupName = val.designerGroupName;
    };
    // 确认保存
    const handleConfirm = async () => {
      await formRef.value.validate();

      await requestApi();

      if (isContinue.value === YES_NO_STRING_ENUM.NO || isEdit.value) {
        selfVisible.value = false;
      }
      formRef.value.resetFields();
      setFormData(defaultData as IDesignerPageListItem);
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
        designerGroupName: [{ required: true, message: '请输入设计组别', trigger: ['blur'] }],
      },
      YES_NO_STRING_ENUM,
    };
  },
});
</script>

<style lang="scss" scoped>
//
</style>
