import type { CustomObj } from '../../types';
import type { FormItem, Option } from '../../Form';
import type Form from '../../Form';
import type { PropType } from 'vue';
import { watchEffect, onBeforeUnmount, defineComponent, computed } from 'vue';

/**
 * 对象值 get \ set
 * @param data 对象
 * @param key  key-path  'data' , 'data.list’
 * @param newValue 非 undefined , 则设置当前值
 * @returns { value | null }  返回当前值
 */
export const operation = (data: CustomObj, key: string, newValue?: any) => {
  if (!key) return data;
  const keys = key.split('.');
  return keys.reduce((pass: any, k: string, i: number) => {
    if (pass[k] === undefined && i <= keys.length - 1) pass[k] = {};
    const isSet = i === keys.length - 1 && typeof newValue !== 'undefined';
    if (isSet) pass[k] = newValue;
    return pass[k];
  }, data);
};

/**
 * 数组扁平
 * @param arr
 * @returns
 */
export function flatten(arr: any[]): any[] {
  return arr.reduce((flat, current) => {
    return flat.concat(Array.isArray(current) ? flatten(current) : current);
  }, []);
}

export const toKebabCase = (camelCasedName: string) => {
  const hyphenateRE = /([^-])([A-Z])/g;
  return camelCasedName
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase();
};

export const toCamelCased = (kebabCaseName: string) => {
  const hyphenateRE = /([a-z])-([a-z])/ig;
  return kebabCaseName
    .replace(hyphenateRE, (str: string, $1: string, $2: string) => `${$1}${$2.toUpperCase()}`);
};

/* 一些控件，初始值 undefined 会抛错 */
const fixInitValueTypes = ['checkbox-group', 'cascader'];

/* form-item template 扩展 */
const linkKeyValue = defineComponent({
  props: {
    item: {
      required: true,
      type: Object as PropType<FormItem>,
      default: () => ({}),
    },
    model: {
      required: true,
      type: Object as PropType<CustomObj>,
      default: () => ({}),
    },
    form: {
      required: true,
      type: Object as PropType<Form>,
      default: () => ({}),
    },
  },
  beforeCreate() {
    const { item } = this;
    const model = computed(() => this.model);
    const form = computed(() => this.form);
    /*
       远程选项
       option 、 radio 、 checkbox
       到达后覆盖本地选项
    */
    ['option', 'radio', 'checkbox'].forEach((optType: string) => {
      const methodName = toCamelCased(`remote-${optType}`);
      const method = item[methodName];
      method
        && typeof method === 'function'
        && item[methodName]()
          .then((opt: Option[]) => { item[optType] = opt || []; });
    });

    const stop = watchEffect(() => {
      /*
        undefined 重置 []
      */
      if (fixInitValueTypes.includes(item.type as string)) {
        model.value[item.key] = this.model[item.key] || [];
      }

      /* props 默认混入 */
      item.props = {
        disabled: form.value.disabled,
        clearable: true,
        ...item.props,
      };
      if (form.value.disabled.value) {
        item.props = { ...item.props, placeholder: ' ' };
      }
      /*
        事件 默认触发
      */
      if (item.customParams?.initChange) {
        item.change
          && typeof item.change === 'function'
          && item.change(model[item.key as keyof typeof model], form.value);
      }
    });
    onBeforeUnmount(() => {
      stop();
    });
  },
});

export default linkKeyValue;
