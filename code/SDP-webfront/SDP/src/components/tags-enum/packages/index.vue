<script lang="tsx">
import { computed, type Ref, defineComponent, PropType } from 'vue';
import { isBoolean, isFunction } from 'lodash-es';
import typeEnum from '../constant';
import { filters, LabelListItem } from '@/core/plugins/filter';

/**
 * 排除不需要显示的 tag
 * @param list
 * @param excludes
 */
// function enumFilter<T>(list: LabelListItem<T>[], excludes: T[]) {
//   return list.filter(v => !excludes.includes(v.value));
// }

interface OPTIONS_TYPE <T extends string | number> {
  /** 枚举集合key */
  listKey: keyof typeof typeEnum;
  /* 枚举值 */
  val: T;
  /* 类型 */
  type?: '' | 'success' | 'warning' | 'info' | 'danger';
  props?: Record<string, any>;
  isShow?: boolean | Ref<boolean> | (() => boolean | Ref<boolean>);
}

export default defineComponent({
  name: 'TagsEnum',
  props: {
    size: {
      type: String as PropType<'' | 'small' | 'default' | 'large'>,
      default: '',
    },
    options: {
      type: Array as PropType<OPTIONS_TYPE<any>[]>,
      default: () => [],
    },
  },
  setup(props) {
    const list = computed(() => {
      return props.options.map((item) => {
        return {
          ...item,
          list: typeEnum[item.listKey],
          type: item.type ?? 'warning',
        };
      });
    });
    const getIsShow = (data: OPTIONS_TYPE<any>) => {
      const { isShow } = data;
      if (isBoolean(isShow)) {
        return isShow;
      }
      if (isFunction(isShow)) {
        return isShow();
      }
      return true;
    };
    return {
      getIsShow,
      list
    };
  },
  render() {
    return this.list.map((item, index) => {
      const label = filters.getEnumLabel(item.list as LabelListItem<any>[], item.val);
      const type = item.type ?? 'warning';
      if (label) {
        return (
          <el-tag
            {...(item.props || {})}
            type={type}
            key={`${item.listKey}${index}`}
            class='tag-item'
            v-show={this.getIsShow(item)}
          >
            {label}
          </el-tag>
        );
      }
      return null;
    });
  },
});

</script>
