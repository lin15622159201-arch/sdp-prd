<script lang="tsx">
import type { PropType } from 'vue';
import { defineComponent, computed, ref, watchEffect } from 'vue';
import { fuzzyQueryUser as getUserListApi } from '@/api/user';
import { LRUCache } from '@/core/utils/lru-cache';
import { useCacheDataByChange, REGISTER_ID_ENUM } from '@/hooks-transfer/use-cache-data-by-change';
import { IUserQueryFindPageResListItem } from '@/api/user/index.d';

const cacheData = new LRUCache<string, IUserQueryFindPageResListItem[]>();

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
    showCode: {
      type: Boolean,
      default: true,
    },
    defaultOptions: {
      type: Array as PropType<IUserQueryFindPageResListItem[]>,
      default: () => [],
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
    const options = ref<IUserQueryFindPageResListItem[]>(props.defaultOptions || []);
    const loading = ref(false);
    const {
      handleChange,
      getCacheData,
      hasCache,
    } = useCacheDataByChange(REGISTER_ID_ENUM.USER_SELECT, {
      emit,
      options,
      optionKey: 'id',
    });

    const remoteMethod = async (query: string) => {
      query = query.trim();

      if (cacheData.has(query)) {
        options.value = cacheData.get(query)!;
        return;
      }

      try {
        loading.value = true;
        const { data } = await getUserListApi({
          keyword: query,
        });
        options.value = data.list ?? [];
        cacheData.set(query, data.list!);
      } finally {
        loading.value = false;
      }
    };

    const getLabel = () => {
      return options.value.find(item => item.id === value.value)?.name || '';
    };

    watchEffect(() => {
      const flag = !options.value.length
        && (Array.isArray(value.value) ? value.value.length : value.value);

      if (flag && hasCache()) {
        options.value = getCacheData(value.value);
      }
    });

    return {
      getLabel,
      value,
      options,
      loading,
      remoteMethod,
      handleChange,
    };
  },
  render() {
    const getLabel = (item: IUserQueryFindPageResListItem) => {
      if (!item.code || !this.$props.showCode) {
        return item.name;
      }
      return `${item.name} (${item.code})`;
    };

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
          /**
           *  + (item.userCode ? `（${item.userCode}）` : '')
           */
          this.options.map((item) => {
            return (
              <el-option
                key={item.id}
                value={item.id}
                label={getLabel(item)}
              />
            );
          })
        }
      </el-select>
    );
  },
});
</script>
