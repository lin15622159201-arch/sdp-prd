<template>
  <el-cascader
    v-model="addressList"
    :options="addressListOptions"
    :props="{
      expandTrigger: 'hover',
      multiple: true,
      value: 'label',
    }"
    filterable
    collapse-tags
    collapse-tags-tooltip
    clearable
    separator=" "
    placeholder="请选择"
    style="width: 100%"
  />
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from 'vue';
import { getAreaTree } from '@/api/open';

export default defineComponent({
  name: 'AddressCascader',
  props: {
    modelValue: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },

  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const addressList = computed({
      get: () => {
        return props.modelValue;
      },
      set: (value) => {
        emit('update:modelValue', value);
      },
    });

    const addressListOptions = ref();
    const getAddressOptions = async () => {
      const { data } = await getAreaTree({
        t: Date.now(),
      });

      const childrenKey = ['cities', 'areas', ''];
      const labelKey = ['provinceName', 'cityName', 'areaName'];
      function recursive(children: any, i: number) {
        children.forEach((item: any) => {
          item.value = item.code;
          item.label = item[labelKey[i]];
          if (childrenKey[i]) {
            item.children = item[childrenKey[i]];
            recursive(item.children, i + 1);
          }
        });
      }
      recursive(data, 0);
      addressListOptions.value = data;
    };
    getAddressOptions();

    return {
      addressList,
      addressListOptions,
    };
  },
});
</script>
