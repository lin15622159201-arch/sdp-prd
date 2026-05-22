<script lang="tsx">
import type { PropType } from 'vue';
import { defineComponent, computed, ref, onMounted } from 'vue';
import { IDesignerGroupDataListItem, IDesignerListItem } from '../api/types';
import { DESIGNER_TYPE } from '../constant';
import { desigGroupDataList, designerUserList } from '../api';

interface IDesignerPropKey {
  label?: string;
  value?: string;
}

type TOpts<T> = T extends DESIGNER_TYPE.DESIGNER ? IDesignerListItem[] : IDesignerGroupDataListItem[];

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
    filterable: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
    },
    /**
     * 使用类型
     * designer | designer-ground
     */
    type: {
      type: String as PropType<DESIGNER_TYPE>,
      default: DESIGNER_TYPE.DESIGNER,
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

      return { ...defaultProp, ...props.prop };
    });

    const paramsKey = computed(() => {
      return props.paramsKey
        || getTypeArg('designerName', 'designerGroupName');
    });

    const loading = ref(false);

    const options = ref<TOpts<typeof props.type>>([]);

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

      try {
        loading.value = true;

        const list = await handleApi();
        options.value = list;
      } finally {
        loading.value = false;
      }
    };

    onMounted(async () => {
      // query传空字符串返回全部
      if (props.isFirstLoadCache) {
        await remoteMethod('');
      }
    });

    return {
      val,
      loading,
      options,
      placeholderComp,
      remoteMethod,
      propKeyOpts,
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
          loading={this.loading}
          placeholder={this.placeholderComp}
          filterable={this.filterable}
        >
          {
            optsRender()
          }
        </el-select>
      );
    };
    return this.$props.isFirstLoadCache
      ? handleIsFirstLoadCacheRender()
      : (
        <el-select
          v-model={this.val}
          {...this.$props}
          remote={this.remote}
          clearable={this.clearable}
          loading={this.loading}
          placeholder={this.placeholderComp}
          filterable={this.filterable}
          remote-method={this.remoteMethod}
          collapse-tags
        >
          {
            optsRender()
          }
        </el-select>
      );
  },
});
</script>
