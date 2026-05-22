<script lang="tsx">
import type { PropType } from 'vue';
import { defineComponent, computed, ref, watchEffect } from 'vue';
import { designerUserList, desigGroupDataList } from '@/api/basis';
import { LRUCache } from '@/core/utils/lru-cache';
import { useCacheDataByChange, REGISTER_ID_ENUM } from '@/hooks-transfer/use-cache-data-by-change';
import type {
  IDesignerListItem,
  IDesignerGroupDataListItem,
} from '@/api/basis/types';
import { useAccountStore } from '@/store/account';

interface IDesignerPropKey {
  label?: string;
  value?: string;
}

enum DESIGNER_TYPE {
  DESIGNER = 'designer',
  DESIGNER_GROUP = 'designer-group',
}
type TOpts<T> = T extends DESIGNER_TYPE.DESIGNER ? IDesignerListItem[] : IDesignerGroupDataListItem[];

const cacheData = new LRUCache<string, IDesignerListItem[] | IDesignerGroupDataListItem[]>();

export default defineComponent({
  props: {
    modelValue: {
      type: [Number, String, Array] as PropType<number | string | (string | number)[]>,
      default: '',
    },
    remote: {
      type: Boolean,
      default: true,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    filterable: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
    },
    /** 是否展示只看我的按钮 */
    showReadMeBtn: {
      type: Boolean,
      default: false,
    },
    /**
     * 使用类型
     * designer | designer-ground
     */
    type: {
      type: String,
      default: 'designer',
    },
    prop: {
      type: Object as PropType<IDesignerPropKey>,
    },
    /**
     * 请求的key
     */
    paramsKey: {
      type: String,
    },
    /**
     * 第一次focus就将所有数据加载，后续输入关键字在当前本地数据中搜索
     */
    isFirstLoadCache: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const val = computed({
      get() {
        return props.modelValue;
      },
      set(_val: string | number | (string | number)[]) {
        emit('update:modelValue', _val);
      },
    });

    function getTypeArg<T, U>(arg1: T, arg2: U) {
      return props.type === DESIGNER_TYPE.DESIGNER
        ? arg1
        : arg2;
    }

    const placeholderComp = computed(() => {
      return props.placeholder
        || getTypeArg('请输入设计师', '请输入设计组别');
    });

    const propKeyOpts = computed(() => {
      const defaultProp = getTypeArg({
        label: 'designerName',
        value: 'designerId',
      }, {
        label: 'designerGroupName',
        value: 'designerGroupCode',
      });

      return (defaultProp || props.prop) ? { ...defaultProp, ...props.prop }
        : defaultProp;
    });

    const paramsKey = computed(() => {
      return props.paramsKey
        || getTypeArg('designerName', 'designerGroupName');
    });

    const loading = ref(false);

    const options = ref<TOpts<typeof props.type>>([]);

    const {
      handleChange,
      getCacheData,
      hasCache,
    } = useCacheDataByChange(
      props.type === DESIGNER_TYPE.DESIGNER
        ? REGISTER_ID_ENUM.DESIGNER_SELECT : REGISTER_ID_ENUM.DESIGNER_GROUP_SELECT,
      {
        emit,
        options,
        optionKey: propKeyOpts.value.value as any,
      }
    );

    const remoteMethod = async (query: string) => {
      query = query.trim();

      const handleApi = async () => {
        const params = {
          [paramsKey.value]: query,
        };

        if (props.type === DESIGNER_TYPE.DESIGNER) {
          const { data } = await designerUserList(params);
          return data;
        }
        const { data } = await desigGroupDataList(params);
        return data;
      };
      const cachKey = `${props.type}_${query}`;

      if (cacheData.has(query)) {
        options.value = cacheData.get(cachKey)!;
        return;
      }

      try {
        loading.value = true;

        const list = await handleApi();
        cacheData.set(cachKey, list);
        options.value = list;
      } finally {
        loading.value = false;
      }
    };

    watchEffect(() => {
      const flag = !options.value.length
        && (Array.isArray(val.value) ? val.value.length : val.value);

      if (flag && hasCache()) {
        options.value = getCacheData(val.value);
      }
    });

    const handleFocus = async () => {
      if (props.isFirstLoadCache && options.value.length === 0) {
        await remoteMethod('');
      }
    };
    // 只看我的
    const accountStore = useAccountStore();
    const handleSeeMe = () => {
      const label = accountStore.account?.account?.name ?? '';
      const value = accountStore.account?.id ?? '';
      if (props.multiple) {
        emit('update:modelValue', [value]);
        emit('change', [value]);
      } else {
        emit('update:modelValue', value);
        emit('change', value);
      }
      if (!options.value.some((v: any) => v[propKeyOpts.value.value] === value)) {
        options.value.push({
          [propKeyOpts.value.value]: value,
          [propKeyOpts.value.label]: label
        } as any);
      }
    };
    return {
      handleSeeMe,
      val,
      loading,
      options,
      placeholderComp,
      remoteMethod,
      propKeyOpts,
      handleFocus,
      handleChange,
    };
  },
  render() {
    const handleOpt = (item: IDesignerListItem | IDesignerGroupDataListItem) => {
      const labelKey = this.propKeyOpts.label as keyof typeof item;
      const valueKey = this.propKeyOpts.value as keyof typeof item;
      const label = item[labelKey];
      const value = item[valueKey];

      return (
        <el-option
          key={value}
          label={label}
          value={value}
        />
      );
    };
    const optsRender = () => {
      /**
       * -.-
       * 兼容恶心的ts检查
       * 收敛类型
       */
      if (this.$props.type === DESIGNER_TYPE.DESIGNER) {
        const list = this.options as TOpts<DESIGNER_TYPE.DESIGNER>;
        return list?.map(handleOpt) ?? [];
      }
      const list = this.options as TOpts<DESIGNER_TYPE.DESIGNER_GROUP>;
      return list?.map(handleOpt) ?? [];
    };
    const handleIsFirstLoadCacheRender = () => {
      return (
        <el-select
          v-model={this.val}
          collapse-tags
          {...this.$props}
          clearable={this.clearable}
          multiple={this.multiple}
          loading={this.loading}
          placeholder={this.placeholderComp}
          filterable={this.filterable}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
        >
          {
            optsRender()
          }
        </el-select>
      );
    };
    return (
      <div class='tw-flex tw-flex-items-center tw-w-full'>
        {this.$props.isFirstLoadCache
          ? handleIsFirstLoadCacheRender()
          : (
            <el-select
              v-model={this.val}
              {...this.$props}
              remote={this.remote}
              clearable={this.clearable}
              multiple={this.multiple}
              loading={this.loading}
              placeholder={this.placeholderComp}
              filterable={this.filterable}
              remote-method={this.remoteMethod}
              collapse-tags
              onChange={this.handleChange}
            >
              {
                optsRender()
              }
            </el-select>
          )}
        {this.showReadMeBtn && (
          <div
            class='btn-me'
            onClick={this.handleSeeMe}
          >
            只看我的
          </div>
        )}
      </div>
    );
  },
});
</script>
<style scoped lang="scss">
.btn-me {
  // height: 32px;
  // line-height: 32px;
  height: 24px;
  line-height: 24px;
  padding: 0 6px;
  margin-left: -2px;
  border-radius: 0 var(--el-border-radius-base) 0 var(--el-border-radius-base);
  border: 1px solid #E1E4ED;
  border-left: none;
  white-space: nowrap;
  background-color: #F2F4FA;
  color: #606166;
  cursor: pointer;
}
</style>
