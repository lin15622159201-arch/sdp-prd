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
        label="纸样组别"
        prop="groupCode"
        class="user-transfor"
      >
        <el-select v-model="formData.groupCode" placeholder="请选择">
          <el-option
            v-for="item in groups"
            :key="item.groupCode"
            :label="item.groupName"
            :value="item.groupCode"
          />
        </el-select>
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
import type { PropType, ComputedRef } from 'vue';
import { defineComponent, ref, computed, reactive } from 'vue';
import { groupUserTransfer } from '../api';
import { paperGroupUserTransfor } from '../../../utils/index';
import type { IGroupPageListItem } from '../api/type';
import useDialogVisible from '@/hooks-transfer/use-dialog-visible';

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    groupLists: {
      type: Array as PropType<IGroupPageListItem[]>,
      required: true,
    },
    groupCode: {
      type: String,
      required: true,
    },
  },
  emits: ['refreshList', 'update:modelValue'],
  setup(props, { emit }) {
    const { visible: selfVisible } = useDialogVisible(props, emit);
    const title = '转移纸样组别';
    const formRef = ref();
    const formData = reactive({
      groupCode: '',
      groups: [],
    });

    let groups: ComputedRef<IGroupPageListItem[]> = computed(() => []);

    groups = computed(() => {
      return props.groupLists.filter((it) => {
        return it.groupCode !== props.groupCode;
      });
    });

    // 关闭弹窗
    const handleClose = () => {
      selfVisible.value = false;
      formRef.value.resetFields();
    };

    const transforUser = () => {
      const selectGroup: IGroupPageListItem | undefined = groups.value?.find((it) => {
        return it.groupCode === formData.groupCode;
      });
      return paperGroupUserTransfor({
        groupUserId: props.id,
        groupCode: selectGroup?.groupCode,
        api: groupUserTransfer,
      });
    };

    // 确认保存
    const handleConfirm = async () => {
      await formRef.value.validate();
      await transforUser();
      formRef.value.resetFields();
      emit('refreshList');
      selfVisible.value = false;
    };

    return {
      formRef,
      selfVisible,
      formData,
      handleClose,
      handleConfirm,
      title,
      rules: {
        groupCode: [{ required: true, message: '请选择纸样组别', trigger: ['blur'] }],
      },
      groups,
    };
  },
});
</script>

<style lang="scss" scoped>
.user-transfor{
  :deep(.el-select){
    width: 100%;
  }
}
</style>
