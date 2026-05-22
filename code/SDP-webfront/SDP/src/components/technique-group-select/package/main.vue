<script lang="tsx">
import type { PropType } from 'vue';
import { defineComponent, ref, computed, watchEffect } from 'vue';
import { getWebV1TechniqueGroupPageApi } from './api';
import { LRUCache } from '@/core/utils/lru-cache';
import { useCacheDataByChange, REGISTER_ID_ENUM } from '@/hooks-transfer/use-cache-data-by-change';
import type { getWebV1TechniqueGroupPageApiResListResItem } from './api/types';

const cacheData = new LRUCache<string, getWebV1TechniqueGroupPageApiResListResItem[]>();

export default defineComponent({
  name: 'TechniqueGroupSelect',
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

    const loading = ref(false);
    const options = ref<getWebV1TechniqueGroupPageApiResListResItem[]>([]);
    const {
      handleChange,
      getCacheData,
      hasCache,
    } = useCacheDataByChange(REGISTER_ID_ENUM.TECHNIQUE_GROUP_SELECT, {
      emit,
      options,
      optionKey: 'techniqueGroupCode',
    });

    const remoteMethod = async (query: string) => {
      query = query.trim();

      if (cacheData.has(query)) {
        options.value = cacheData.get(query)!;
        return;
      }

      try {
        loading.value = true;
        const { data } = await getWebV1TechniqueGroupPageApi({
          techniqueGroupName: query,
          isEnabled: '1',
          pageNum: '1',
          pageSize: '1000',
        });
        cacheData.set(query, data.list || []);
        options.value = data.list || [];
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
      loading,
      options,

      remoteMethod,
      handleChange,
    };
  },
  render() {
    return (
      <el-select
        v-model={this.value}
        collapse-tags
        {...this.$props}
        clearable={this.clearable}
        filterable={this.filterable}
        remote={this.remote}
        loading={this.loading}
        remote-method={this.remoteMethod}
        onChange={this.handleChange}
      >
        {
          this.options.map((item) => {
            return (
              <el-option
                key={item.techniqueGroupCode}
                value={item.techniqueGroupCode}
                label={item.techniqueGroupName}
              />
            );
          })
        }
      </el-select>
    );
  },
});
</script>
