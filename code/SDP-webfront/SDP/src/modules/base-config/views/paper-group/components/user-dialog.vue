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
        label="纸样师"
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
      <!-- <el-form-item
        label="所属区域"
        prop="regionId"
        class="region-select"
      >
        <el-select
          v-model="formData.regionId"
          placeholder="请选择所属区域"
        >
          <el-option
            v-for="item of REGION_LIST"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item> -->

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
import { groupUserAdd } from '../api';
import { fuzzyQueryUser } from '@/api/user/index';
import { YES_NO_STRING_ENUM, REGION_LIST } from '@/constant';
import { getLabelByVal } from '@/core/plugins/filter';
import useDialogVisible from '@/hooks-transfer/use-dialog-visible';
import { IUserQueryFindPageResListItem } from '@/api/user/index.d';

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
    groupCode: {
      type: String,
      required: true,
    },
    regionId: {
      type: String,
      // required: true,
    },

  },
  emits: ['refreshList', 'update:modelValue'],
  setup(props, { emit }) {
    const { visible: selfVisible } = useDialogVisible(props, emit);
    const title = '新增人员';
    const isContinue = ref(YES_NO_STRING_ENUM.NO);
    const formRef = ref();
    const formData = reactive({
      userId: '',
      regionId: '',
      userInfo: {} as IUserQueryFindPageResListItem
    });

    const users = ref<IUserQueryFindPageResListItem[]>([]);
    const remoteMethod = async (keyword: string) => {
      if (!keyword) {
        users.value = [];
        return;
      }
      const { data } = await fuzzyQueryUser({ keyword });
      users.value = data.list ?? [];
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
      await groupUserAdd({
        userId,
        userCode: userCode!,
        userName,
        groupCode: props.groupCode,
        groupType: 'GROUP_TYPE_PATTERN',
        phone,
        regionName: getLabelByVal(REGION_LIST, formData.regionId),
        regionId: formData.regionId,
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
        // regionId: [{ required: true, message: '请选择所属区域', trigger: ['blur'] }],
      },
      remoteMethod,
      users,
      YES_NO_STRING_ENUM,
      REGION_LIST,
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
.region-select{
:deep(.el-select){
    width: 100%;
  }
}

</style>
