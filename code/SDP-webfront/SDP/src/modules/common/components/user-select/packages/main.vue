<script lang="tsx">
import type { PropType } from 'vue';
import { defineComponent, computed, ref } from 'vue';
import { fuzzyQueryUser as getUserListApi } from './api';
import { IUserQueryFindPageResListItem } from '@/api/user/index.d';

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
    const options = ref<IUserQueryFindPageResListItem[]>([]);
    const loading = ref(false);

    const remoteMethod = async (query: string) => {
      query = query.trim();
      if (!query) return;
      try {
        loading.value = true;
        const { data } = await getUserListApi({
          keyword: query,
        });
        options.value = data.list ?? [];
      } finally {
        loading.value = false;
      }
    };

    return {
      value,
      options,
      loading,
      remoteMethod,
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
