<template>
  <div class="tw-flex tw-w-full">
    <query-select
      ref="querySelectRef"
      v-model="queryValue"
      @change="handleUpdate"
      placeholder="请输入"
      clearable
    />
    <div class="btn-me" @click="handleSeeMe()">只看我的</div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { useAccountStore } from '@/store/account';
import QuerySelect from './main.vue';
import { IUserQueryFindPageResListItem } from './api/type';

const props = withDefaults(defineProps<{
  modelValue: string;
  modelType?: 'name' | 'id';
}>(), {
  modelType: 'id',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'handleSearch'): void;
}>();

const queryValue = ref('');
const querySelectRef = ref<InstanceType<typeof QuerySelect> | null>(null);
const accountStore = useAccountStore();

const handleUpdate = (row: IUserQueryFindPageResListItem) => {
  let res = row?.id ?? '';
  if (props.modelType === 'name') res = row?.name ?? '';
  emit('update:modelValue', res);
};

watch(() => props.modelValue, (val: string) => {
  if (val !== queryValue.value) {
    queryValue.value = val;
  }
});

const handleSeeMe = () => {
  const { account } = accountStore;
  if (account) {
    const userName = account.account?.name!;
    const { id } = account;
    const row = { id, name: userName, code: '' };
    querySelectRef.value?.setOptions?.([{ id, name: userName, code: '' }]);
    queryValue.value = id;
    handleUpdate(row);
    emit('handleSearch');
  }
};

defineExpose({
  handleSeeMe
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
