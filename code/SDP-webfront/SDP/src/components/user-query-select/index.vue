<template>
  <div class="tw-flex tw-w-full">
    <el-select
      v-model="queryValue"
      collapse-tags
      collapse-tags-tooltip
      :multiple="multiple"
      placeholder="请输入"
      clearable
      filterable
      remote
      :loading="loading"
      :remote-method="remoteMethod"
    >
      <el-option
        v-for="item in options"
        :key="item.id"
        :value="item.id"
        :label="item.name"
      />
    </el-select>
    <div class="btn-me" @click="handleSeeMe()">只看我的</div>
  </div>
</template>
<script lang="ts" setup>
import { useAccountStore } from '@/store/account';
import { useFetchUsers } from './hooks/use-fetch-users';

const queryValue = defineModel<string | string[]>();

const props = withDefaults(defineProps<{
  multiple?: boolean;
}>(), {
  multiple: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'handleSearch'): void;
}>();

const { options, loading, setOptions, remoteMethod } = useFetchUsers();

const accountStore = useAccountStore();

const handleSeeMe = () => {
  const { account } = accountStore;
  if (account) {
    const userName = account.account?.name!;
    const { id } = account;
    const row = { id, name: userName, code: '' };
    setOptions([row]);
    queryValue.value = props.multiple ? [id] : id;
    emit('handleSearch');
  }
};

const defaultSeeMe = () => {
  const { account } = accountStore;
  if (account) {
    const userName = account.account?.name!;
    const { id } = account;
    const row = { id, name: userName, code: '' };
    setOptions([row]);
    queryValue.value = props.multiple ? [id] : id;
  }
};

defineExpose({
  defaultSeeMe
});

</script>
<style lang="scss" scoped>
.btn-me {
  height: 24px;
  line-height: 24px;
  padding: 0 12px;
  border: 1px solid #E1E4ED;
  border-left: none;
  white-space: nowrap;
  background-color: #F2F4FA;
  color: #606166;
  cursor: pointer;
}
</style>
