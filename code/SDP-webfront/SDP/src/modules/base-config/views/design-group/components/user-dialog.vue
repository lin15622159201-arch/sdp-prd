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
        label="员工姓名"
        prop="userId"
        class="user-add"
      >
        <el-select
          v-model="formData.userId"
          filterable
          remote
          clearable
          reserve-keyword
          placeholder="请输入关键字选择用户"
          :remote-method="remoteMethod"
          @change="handleChangeUserId"
        >
          <el-option
            v-for="item in users"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item
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
import { defineComponent, ref, reactive } from 'vue';
import { designerSave } from '../api';
import { fuzzyQueryUser } from '@/api/user/index';
import type { IUserQueryFindPageResListItem } from '@/api/user/index.d';
import { YES_NO_STRING_ENUM } from '@/constant';
import useDialogVisible from '@/hooks-transfer/use-dialog-visible';

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
    designerGroupCode: {
      type: String,
      required: true,
    },
    designerGroupName: {
      type: String,
      required: true,
    },
  },
  emits: ['refreshList', 'update:modelValue'],
  setup(props, { emit }) {
    const { visible: selfVisible } = useDialogVisible(props, emit);
    const title = '员工新增';
    const isContinue = ref(YES_NO_STRING_ENUM.NO);
    const formRef = ref();
    const formData = reactive({
      userId: '',
      userInfo: {} as IUserQueryFindPageResListItem
    });

    const users = ref<IUserQueryFindPageResListItem[]>([]);
    const remoteMethod = async (keyword: string) => {
      if (!keyword) {
        users.value = [];
        return;
      }
      const { data } = await fuzzyQueryUser({ keyword });
      users.value = data?.list ?? [];
    };
    const handleChangeUserId = (userId: string) => {
      formData.userInfo = users.value.find(v => v.id === userId)!;
    };
    // 关闭弹窗
    const handleClose = () => {
      selfVisible.value = false;
      formRef.value.resetFields();
      isContinue.value = YES_NO_STRING_ENUM.NO;
    };
    const saveUser = async () => {
      const {
        id: userId,
        name: userName,
        code: userCode,
        phone
      } = formData.userInfo!;
      await designerSave({
        designerId: userId,
        designerCode: userCode!,
        mobilePhone: phone,
        designerName: userName,
        designerGroupCode: props.designerGroupCode,
        designerGroupName: props.designerGroupName,
      });
    };

    // 确认保存
    const handleConfirm = async () => {
      await formRef.value.validate();

      await saveUser();

      if (isContinue.value === YES_NO_STRING_ENUM.NO) {
        selfVisible.value = false;
      }
      formRef.value.resetFields();
      emit('refreshList');
    };

    return {
      handleChangeUserId,
      formRef,
      selfVisible,
      formData,
      isContinue,
      handleClose,
      handleConfirm,
      title,
      rules: {
        userId: [{ required: true, message: '请输入员工姓名', trigger: ['blur'] }],
      },
      remoteMethod,
      users,
      YES_NO_STRING_ENUM,
    };
  },
});
</script>

<style lang="scss" scoped>

.user-add{
  :deep(.el-select){
    width: 100%;
  }
}

</style>
