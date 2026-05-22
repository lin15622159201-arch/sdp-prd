<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, computed, ref, watchEffect } from 'vue';
import { clothingRoomList } from '@/api/basis';
import { LRUCache } from '@/core/utils/lru-cache';
import { useCacheDataByChange, REGISTER_ID_ENUM } from '@/hooks-transfer/use-cache-data-by-change';
import type { IListNameItem as _IListNameItem } from '@/api/basis/types';

interface IListNameItem extends _IListNameItem {
  label: string;
  value: string;
}

const innerData = Object.freeze({
  label: '内部', value: '1',
});

const cacheData = new LRUCache<string, IListNameItem[]>();

export default defineComponent({
  name: 'UserSelect',
  props: {
    modelValue: {
      type: [String, Number, Array] as PropType<string | number | (string | number)[]>,
      default: '',
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    filterable: {
      type: Boolean,
      default: true,
    },
    remote: {
      type: Boolean,
      default: true,
    },
    inner: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const value = computed({
      get() {
        return props.modelValue;
      },
      set(_val: string | number | (string | number)[]) {
        emit('update:modelValue', _val);
      },
    });
    const options = ref<IListNameItem[]>([]);
    const loading = ref(false);

    const {
      handleChange,
      getCacheData,
      hasCache,
    } = useCacheDataByChange(REGISTER_ID_ENUM.CLOTHING_ROOM_SELECT, {
      emit,
      options,
      optionKey: 'roomId',
    });

    const setOptions = (data: IListNameItem[]) => {
      return [
        ...(
          props.inner
            ? [
              innerData,
            ]
            : []
        ) as IListNameItem[],
        ...data,
      ];
    };

    const remoteMethod = async (query: string) => {
      query = query.trim();

      if (cacheData.has(query)) {
        options.value = setOptions(cacheData.get(query)!);
        return;
      }

      try {
        loading.value = true;
        const { data } = await clothingRoomList({
          enable: 'YES',
          name: query,
        });
        data.forEach((_item) => {
          const item = _item as IListNameItem;

          item.value = item.roomId;
          item.label = item.roomName;
        });

        options.value = setOptions(data as IListNameItem[]);
        cacheData.set(query, data! as IListNameItem[]);
      } finally {
        loading.value = false;
      }
    };

    watchEffect(() => {
      const flag = !options.value.length
        && (Array.isArray(value.value) ? value.value.length : value.value);

      if (flag && hasCache()) {
        options.value = getCacheData(value.value);
      }
    });

    return {
      value,
      options,
      loading,
      remoteMethod,

      handleChange,
    };
  },
});
</script>

<template>
  <el-select
    v-model="value"
    collapse-tags
    v-bind="$props"
    :clearable="clearable"
    :filterable="filterable"
    :remote="remote"
    :loading="loading"
    :remote-method="remoteMethod"
    :options="options"
    :on-change="handleChange"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>
