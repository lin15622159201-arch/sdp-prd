<script lang="tsx">
import type { PropType } from 'vue';
import { defineComponent, computed, ref } from 'vue';
import { userQueryFindPage as getUserListApi } from './api';
import { IUserQueryFindPageResListItem as UserItem } from './api/type';

export default defineComponent({
  name: 'UserSelect',
  props: {
    modelValue: {
      type: [String, Number, Array] as PropType<string | number | (string | number)[]>,
      default: '',
    },
    placeholder: {
      type: String,
      default: '请输入',
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
  setup(props, { emit, expose }) {
    const value = computed({
      get() {
        return props.modelValue;
      },
      set(_val: string | number | (string | number)[]) {
        const info = options.value.find(i => i.id === _val);
        emit('update:modelValue', _val);
        emit('change', info);
      },
    });
    const options = ref<UserItem[]>([]);
    const loading = ref(false);

    // 在不需要查询接口情况下，使用此api来设置下拉回显
    const setOptions = (list: UserItem[]) => {
      options.value = list ?? [];
    };

    const remoteMethod = async (query: string) => {
      query = query.trim();
      if (!query) return;
      try {
        loading.value = true;
        const { data: { list } } = await getUserListApi({
          filters: {
            code: '',
            name: query,
          },
          pageNum: 1,
          pageSize: 999,
        });
        options.value = list;
      } finally {
        loading.value = false;
      }
    };

    expose({
      setOptions,
    });

    return {
      value,
      options,
      loading,
      remoteMethod,
      setOptions,
    };
  },
  render() {
    const getLabel = (item: UserItem) => {
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
        placeholder={this.placeholder}
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
