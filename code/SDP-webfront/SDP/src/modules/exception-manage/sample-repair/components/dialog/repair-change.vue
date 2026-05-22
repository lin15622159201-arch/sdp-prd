<!--排单变更-->
<template>
  <el-dialog
    v-model="show"
    title="排单变更"
    width="440px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    append-to-body
    @closed="close()"
  >
    <p class="hint">
      {{ $filters.getEnumLabel(ALLOT_DIALOG_TEXT_LIST, selection?.repairTypeSecond) }}
    </p>
    <el-form
      ref="formRef"
      label-width="95px"
      :model="form"
      :rules="rules"
      class="app-fheader-custom-form"
    >
      <el-form-item label="返修人：" prop="repairmanId">
        <el-select
          v-model="form.repairmanId"
          filterable
          remote
          placeholder="请输入关键词"
          :remote-method="fuzzyRemoteMethod"
          :loading="fuzzyLoading"
        >
          <el-option
            v-for="item in fuzzyResponse"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
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
import { computed, defineComponent, ref, nextTick } from 'vue';
import type { ElForm } from 'element-plus';
import { useDictionary } from '@/hooks-transfer/use-dict';
import { useFuzzy } from '@/components/custom-form';
import { fuzzyQueryUser } from '@/api/user/index';
import type {
  IUserQueryFindPageReq,
  IUserQueryFindPageRes,
  IUserQueryFindPageResListItem,
} from '@/api/user/index.d';
import { ALLOT_DIALOG_TEXT_LIST } from '@/modules/exception-manage/exception-handle/constant';

export default defineComponent({
  name: 'RepairChange',
  props: {
    visible: {
      type: Boolean,
      default: true,
      require: true,
    },
    selection: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['update:visible', 'submit'],
  setup(props, { emit }) {
    const formRef = ref<InstanceType<typeof ElForm> | null>(null);
    const form = ref({ repairmanId: '' });

    // 字典相关
    const {
      batchDictListMap,
    } = useDictionary([
      'plm_cancel_purchase_reason',
    ]);

    const rules = {
      repairmanId: [{ required: true, message: '返修人不能为空' }],
    };
    const show = computed({
      get: () => props.visible,
      set: (value: boolean) => emit('update:visible', value),
    });

    const {
      fuzzyLoading,
      fuzzyResponse,
      fuzzyRemoteMethod,
    } = useFuzzy<IUserQueryFindPageReq & { keyword?: string; }, IUserQueryFindPageRes>({
      params: { keyword: '' },
      keywordKey: 'keyword',
      API: fuzzyQueryUser,
      beforeResponse(res) {
        return res.data?.list?.map((user: IUserQueryFindPageResListItem) => {
          const { name: label, id: value } = user;
          return { ...user, label, value };
        });
      },
    });

    const close = () => {
      show.value = false;
      nextTick(() => {
        formRef.value?.resetFields();
      });
    };
    const save = async () => {
      await formRef.value?.validate();
      const selectedObj = {
        label: fuzzyResponse.value.find(item => item.id === form.value.repairmanId)?.label,
        value: form.value.repairmanId,
      };
      emit('submit', selectedObj);
      close();
    };
    return {
      formRef,
      rules,
      close,
      form,
      show,
      save,
      fuzzyLoading,
      fuzzyResponse,
      fuzzyRemoteMethod,
      batchDictListMap,
      ALLOT_DIALOG_TEXT_LIST,
    };
  },
});
</script>

<style scoped lang="scss">
// @import "@/modules/exception-manage/styles/index.scss";
.hint{
  margin: 0 0 8px 8px;
  color: #e6a23c;
}
</style>
