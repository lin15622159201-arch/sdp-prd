<template>
  <el-dialog
    v-model="show"
    title="取消款号"
    width="440px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    append-to-body
    @closed="close()"
  >
    <el-form
      ref="formRef"
      label-width="95px"
      :model="form"
      :rules="rules"
    >
      <el-form-item label="取消原因：" prop="cancelReason">
        <el-select
          v-model="form.cancelReason"
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in reasonList"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          />
        </el-select>
      </el-form-item>
      <span class="tw-color-danger">SKC取消后将不可恢复，是否确认取消？</span>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent, ref, nextTick } from 'vue';
import type { ElForm } from 'element-plus';
import { ElMessage } from 'element-plus';
import { IListItem } from '../types';
import { postWebV1PrototypeManageCancelApi } from '../../../api';
import { PostWebV1PrototypeManageCancelApiReq } from '../../../api/types';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: true,
      require: true,
    },
    selection: {
      type: Array as PropType<IListItem[]>,
      default: () => [],
    },
  },
  emits: ['update:visible', 'updateList'],
  setup(props, { emit }) {
    const formRef = ref<InstanceType<typeof ElForm> | null>(null);
    const form = ref({ cancelReason: '' });

    const rules = {
      cancelReason: [{ required: true, message: '原因不能为空' }],
    };
    const show = computed({
      get: () => props.visible,
      set: (value: boolean) => emit('update:visible', value),
    });
    const close = () => {
      show.value = false;
      nextTick(() => {
        formRef.value?.resetFields();
      });
    };
    const save = async () => {
      await formRef.value?.validate();
      const params: PostWebV1PrototypeManageCancelApiReq = {
        ...form.value,
        prototypeId: props.selection[0].prototypeId as unknown as number,
      };
      await postWebV1PrototypeManageCancelApi(params);
      ElMessage.success('款号取消成功');
      emit('updateList');
      close();
    };
    const { getDictionaryOptions } = useDictionary();
    const reasonList = computed(() => getDictionaryOptions(DICTIONARY_KEY.SKC_CANCEL_REASON));
    return {
      formRef,
      rules,
      close,
      form,
      show,
      save,
      reasonList,
    };
  },
});
</script>
