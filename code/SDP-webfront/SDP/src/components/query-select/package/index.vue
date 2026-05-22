<script lang="tsx">
/*
 * @Descripttion:
 * @Author: weitongxue
 */
import { PropType, ref, defineComponent, watch, onMounted } from 'vue';
import { IOptionsItem, IRequestConfig } from './types';
import { get, isEqual, isEmpty, debounce } from 'lodash-es';

export default defineComponent({
  name: 'querySelect',
  emits: ['update:modelValue', 'change'],
  props: {
    /**
     * 请求携带额外参数
     */
    queryParams: {
      type: Object,
      default: () => ({}),
    },

    /**
     * 是否在初始化的时候查询数据
     */
    needInitSearch: {
      type: Boolean,
      default: false,
    },

    /**
     * 请求方式
     */
    method: {
      type: Function,
      default: () => {},
    },

    /**
     * key值解析
     */
    config: {
      type: Object as PropType<IRequestConfig>,
      default: () => ({}),
    },

    modelValue: {
      type: String,
      default: '',
      required: true,
    },

    readonly: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    clearable: {
      type: Boolean,
      default: false,
    },

    /**
     * 自定义格式化选项显示
     */
    formatFn: {
      type: Function,
      default: null,
    },

    findKey: {
      type: String,
      default: '',
    },

    /**
     * 查询值变化则置空选项
     */
    needInitOptions: {
      type: Boolean,
      default: false,
    },
    /**
     * 请求携带额外参数变化则重新请求
     */
    needSetOptionsByParams: {
      type: Boolean,
      default: false,
    },
    /**
     * 回显没有匹配options，是否清空v-model
    */
    isClearValue: {
      type: Boolean,
      default: false,
    }
  },

  setup(props, { emit }) {
    const options = ref<IOptionsItem[]>([]);
    const loading = ref(false);
    /**
     *
     * @param keyword 关键词
     * @param type 请求类型 valueSearch：通过valueSearchKey作为key值查询
     * @param type 请求类型 keywordSearch：通过keywordKey作为key值查询
     * @returns
     */
    const getData = debounce(async (keyword: string, type: 'keywordQuery' | 'valueQuery' = 'keywordQuery') => {
      try {
        if (loading.value) return;
        const { method, config } = props;
        const { labelKey, valueKey, dataKey, keywordQueryKey, valueQueryKey, codeKey, showCode }: IRequestConfig = {
          labelKey: 'label',
          valueKey: 'value',
          codeKey: 'value',
          dataKey: 'data.list',
          keywordQueryKey: 'keyword',
          valueQueryKey: 'keyword',
          pageSize: 20,
          ...config,
        };

        loading.value = true;
        const params = {
          ...props.queryParams,
        };

        if (type === 'keywordQuery') {
          params[keywordQueryKey] = keyword;
        } else {
          params[valueQueryKey] = keyword;
          // 绑定的id, 用传进来的名称去查询下拉列表（因为接口不支持id查询）
          if (props.findKey) {
            params[keywordQueryKey] = props.findKey;
          }
        }
        const res = await method(params);
        if (props.formatFn) {
          options.value = props.formatFn(res, dataKey, keyword);
        } else {
          options.value = get(res, dataKey).map((v: any) => ({
            label: showCode ? `${v[labelKey]}（${v[codeKey]}）` : v[labelKey],
            value: v[valueKey],
            row: v,
          }));
        }
      } catch (error) {
        console.log('搜索失败', error);
      } finally {
        loading.value = false;
      }
    }, 400);
    const remoteMethod = async (keyword: string) => {
      const inputValue = keyword.trim();
      if (!inputValue && !props.needInitSearch && !props.needSetOptionsByParams) return;
      getData(inputValue);
    };

    const onChange = (val: string) => {
      const option = options.value.find(v => v.value === val);
      if (option) {
        emit('update:modelValue', option.value);
        emit('change', option.value, option.row);
      } else {
        emit('change', '');
        emit('update:modelValue', '');
      }
    };
    watch(
      () => props.modelValue,
      () => {
        if (props.modelValue && !options.value.find(v => v.value === props.modelValue)) {
          debounce(async () => {
            await getData(props.modelValue, 'valueQuery');
            // 回显的时候，如果没有，就清空值
            if (props.isClearValue && options.value.findIndex(
              info => info.value === props.modelValue
            ) === -1) {
              emit('update:modelValue', '');
            }
          });
        }
      },
      {
        immediate: true,
      },
    );

    watch(
      () => props.queryParams,
      (n, o) => {
        if (props.needInitOptions && !isEqual(n, o)) {
          options.value = [];
        }
        if (props.needSetOptionsByParams && !isEqual(n, o)) {
          const noneIdx = Object.values(n).findIndex(v => isEmpty(v));
          if (noneIdx === -1) {
            getData(props.modelValue);
          }
        }
      },
      {
        immediate: true,
      },
    );

    onMounted(() => {
      if (props.needInitSearch) {
        getData('');
      }
    });

    // 刷新key
    const refreshKey = ref(false);
    const onFocus = () => {
      refreshKey.value = true;
    };

    // 在不需要查询接口情况下，使用此api来设置下拉回显
    const setOptions = (list: IOptionsItem[]) => {
      options.value = list ?? [];
    };
    return {
      setOptions,
      options,
      loading,
      refreshKey,
      remoteMethod,
      onChange,
      onFocus,
    };
  },
  render() {
    return (
      <>
        {this.readonly ? (
          this.$filters.getEnumLabel(this.options, this.modelValue)
        ) : (
          <el-select
            filterable
            clearable={this.clearable}
            disabled={this.disabled}
            {...this.$attrs}
            modelValue={this.modelValue}
            remote
            remote-method={this.remoteMethod}
            loading={this.loading}
            onChange={this.onChange}
            onFocus={this.onFocus}
            class='select-full'
          >
            {this.options.map((item) => {
              return (
                <el-option
                  key={item.value}
                  label={item.label}
                  value={item.value}
                  disabled={item.disabled}
                />
              );
            })}
          </el-select>
        )}
      </>
    );
  },
});

</script>
