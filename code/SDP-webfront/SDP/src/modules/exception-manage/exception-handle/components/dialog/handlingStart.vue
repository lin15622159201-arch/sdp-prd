<!--开始处理-->
<template>
  <el-dialog
    v-model="show"
    title="开始处理"
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
      <el-form-item label="处理人：" prop="handlerId">
        <el-select
          v-model="form.handlerId"
          filterable
          remote
          placeholder="请输入关键词"
          :remote-method="fuzzyRemoteMethod"
          :loading="fuzzyLoading"
        >
          <el-option
            v-for="item in (fuzzyResponse as any)"
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
import { useFuzzy } from '@toy/v-use';
import { fuzzyQueryUser } from '@/modules/common/components/user-select/packages/api';

export default defineComponent({
  name: 'HandlingStart',
  props: {
    visible: {
      type: Boolean,
      default: true,
      require: true,
    },
  },
  emits: ['update:visible', 'submit'],
  setup(props, { emit }) {
    const formRef = ref<InstanceType<typeof ElForm> | null>(null);
    const form = ref({ handlerId: '' });
    const rules = {
      handlerId: [{ required: true, message: '处理人不能为空' }],
    };
    const show = computed({
      get: () => props.visible,
      set: (value: boolean) => emit('update:visible', value),
    });

    const {
      fuzzyLoading,
      fuzzyResponse,
      fuzzyRemoteMethod,
    } = useFuzzy({
      params: { keyword: '' },
      keywordKey: 'keyword',
      api: fuzzyQueryUser,
      beforeResponse(res) {
        return res.data?.list?.map((user) => {
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
      console.log(fuzzyResponse.value);
      const selectedObj = {
        label: (fuzzyResponse as any).value.find((item: any) => item.userId === form.value.handlerId)?.username,
        value: form.value.handlerId,
      };
      // TODO 待优化
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
    };
  },
});
</script>

<style scoped lang="scss">
//
</style>
