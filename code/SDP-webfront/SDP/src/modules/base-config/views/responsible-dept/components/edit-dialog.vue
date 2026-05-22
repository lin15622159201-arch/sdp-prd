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
        label="责任部门"
        prop="departmentName"
      >
        <el-input
          v-model="formData.departmentName"
          placeholder="请输入"
          max-length="25"
        />
      </el-form-item>

      <el-form-item
        label="责任人"
        prop="responsibleName"
        class="responsible-name"
      >
        <el-select
          v-model="formData.responsibleName"
          filterable
          remote
          clearable
          reserve-keyword
          placeholder="请输入关键字选择用户"
          :remote-method="remoteMethod"
          @change="onSelectUser"
        >
          <el-option
            v-for="item in users"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        v-if="showContinueItem"
        label="是否继续添加"
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
import { addResponsibleDepartment, editResponsibleDepartment } from '../api';
import { YES_NO_STRING_ENUM } from '@/constant';
import type { IResponsibleDepartmentPageListItem } from '../api/type';
import { fuzzyQueryUser } from '@/api/user';
import type { IUserQueryFindPageResListItem } from '@/api/user/index.d';
import useDialogVisible from '@/hooks-transfer/use-dialog-visible';
import { SIZE_DIMESSION } from '@/modules/base-config/constant';

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Object as PropType<IResponsibleDepartmentPageListItem>,
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
      return `异常责任部门 ${isEdit.value ? '修改' : '新增'}`;
    });
    const showContinueItem = computed(() => {
      return !isEdit.value;
    });
    const isContinue = ref(YES_NO_STRING_ENUM.NO);
    const formRef = ref();
    const defaultData = {
      departmentId: '',
      departmentName: '',
      responsibleId: '',
      responsibleName: '',
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
      const { departmentName, responsibleId, responsibleName, departmentId } = formData;
      if (isEdit.value) {
        return editResponsibleDepartment({
          departmentId,
          departmentName,
          responsibleId,
          responsibleName,
        });
      }
      // 新增
      return addResponsibleDepartment({
        departmentName,
        responsibleId,
        responsibleName,
      });
    };
    const setFormData = (val: IResponsibleDepartmentPageListItem) => {
      formData.departmentId = val.departmentId;
      formData.departmentName = val.departmentName;
      formData.responsibleId = val.responsibleId;
      formData.responsibleName = val.responsibleName;
    };
    // 确认保存
    const handleConfirm = async () => {
      await formRef.value.validate();
      await requestApi();

      if (isContinue.value === YES_NO_STRING_ENUM.NO || isEdit.value) {
        selfVisible.value = false;
      }
      formRef.value.resetFields();
      setFormData(defaultData as IResponsibleDepartmentPageListItem);
      emit('refreshList');
    };

    const users = ref<IUserQueryFindPageResListItem[]>([]);
    const remoteMethod = async (keyword: string) => {
      if (!keyword) {
        users.value = [];
        return;
      }
      const { data } = await fuzzyQueryUser({
        keyword,
      });
      users.value = data.list ?? [];
    };

    const onSelectUser = (responsibleName: string) => {
      const selectObj = users.value.find((item) => {
        return item.name === responsibleName;
      });
      formData.responsibleId = selectObj!.id;
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
        departmentName: [{ required: true, message: '请输入责任部门', trigger: ['blur'] }],
        responsibleName: [{ required: true, message: '请输入责任人', trigger: ['blur'] }],
      },
      YES_NO_STRING_ENUM,
      SIZE_DIMESSION,
      remoteMethod,
      users,
      onSelectUser,
    };
  },
});
</script>

<style lang="scss" scoped>

.responsible-name{
  :deep(.el-select){
    width: 100%;
  }
}

</style>
