<template>
  <el-dialog
    v-model="show"
    title="取消物料"
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
      class="app-fheader-custom-form"
    >
      <el-form-item label="取消原因：" prop="cancelReason">
        <el-select
          v-model="form.cancelReason"
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in batchDictListMap[DICTIONARY_KEY.PLM_CANCEL_PURCHASE_REASON]"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <span class="tw-color-warning">物料取消后将不可恢复，是否确认取消？</span>
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
import { postMaterialPurchaseCancelMaterialApi } from '../../../api';
import type {
  PostMaterialPurchaseCancelMaterialApiReq,
  postMaterialPurchasePageListApiResListResItem,
} from '../../../api/types';
import { useDictionary } from '@/hooks-transfer/use-dict';
import { DICTIONARY_KEY } from '@/constant/dictionary';

export default defineComponent({
  name: 'CancelMaterial',
  emits: ['update:visible', 'updateList'],
  props: {
    visible: {
      type: Boolean,
      default: true,
      require: true,
    },
    selection: {
      type: Array as PropType<postMaterialPurchasePageListApiResListResItem[]>,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const formRef = ref<InstanceType<typeof ElForm> | null>(null);
    const form = ref({ cancelReason: '' });

    // 字典相关
    const {
      batchDictListMap,
    } = useDictionary([
      DICTIONARY_KEY.PLM_CANCEL_PURCHASE_REASON,
    ]);

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
      const params: PostMaterialPurchaseCancelMaterialApiReq = {
        cancelReason: form.value.cancelReason,
        materialPurchaseFollowId: props.selection[0].materialPurchaseFollowId || '',
      };
      await postMaterialPurchaseCancelMaterialApi(params);
      ElMessage.success('取消物料成功！');
      emit('updateList');
      close();
    };
    return {
      formRef,
      rules,
      close,
      form,
      show,
      save,
      batchDictListMap,
      DICTIONARY_KEY
    };
  },
});
</script>

<style scoped lang="scss">
// @import "@/modules/design-center/styles/index.scss";
</style>
