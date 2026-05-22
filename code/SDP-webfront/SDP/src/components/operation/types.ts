import type { Ref } from 'vue';
import type { COMPONENT_TYPE } from './constant';

type TVal = string | number | boolean;

export interface IRadioCheckboxItem {
  label: TVal;
  value: TVal;
}

export interface IFormItemsBase <T = any> {
  /**
   * `el-form-item` `label` 属性
   */
  label?: string;
  /**
   * 渲染`key`, 作为`v-model`属性绑定的值, 也是唯一item凭证
   */
  key: keyof T;
  /**
   * 是否显示
   *
   * @default true
   */
  show?: boolean | (() => boolean) | Ref<boolean> | (() => Ref<boolean>);
}

export interface IFormItemsType<T = any> extends IFormItemsBase<T> {
  /**
   * 渲染的组件类型
   */
  type: COMPONENT_TYPE | 'radioCheckbox' | 'radioGroup' | 'radio-checkbox' | 'radio-group';
  /**
   * 给定渲染组件的options
   */
  options?: IRadioCheckboxItem[];
  /**
   * `<el-radio-group />` & `<radio-checkbox />` props
   */
  props?: Record<string, any>;
  // 以下为废弃属性
  /**
   * @deprecated 这是适配 custom-form 的字段, 其他只需要使用 `options`
   */
  radio?: IRadioCheckboxItem[];
  /**
   * @deprecated 这是适配 custom-form 的字段, 其他只需要使用 `options`
   */
  checkbox?: IRadioCheckboxItem[];
}

export interface IFormItemsSlot<T = any> extends IFormItemsBase<T> {
  /**
   * 插槽名称
   *
   * 注意：名称不能为`content`, 因为该组件已经使用
   *
   * @example
   * ```ts
   * import type { IFormConfig } from '@/components/operation/types';
   *
   * <script setup lang="ts">
   *  const modelObj = ref({
   *    aVal: '',
   *  })
   *  const formConfig = ref<IFormConfig<typeof modelObj['value']>>({
   *    items: [
   *      {
   *        key: 'aVal',
   *        slot: 'aSlot',
   *        label: 'a label',
   *      },
   *    ]
   *  })
   * </script>
   *
   * <template>
   *  <operation v-model="modelObj" :form-config="formConfig">
   *    <template #aSlot>
   *      <el-input v-model="modelObj.aVal" />
   *    </template>
   *  </operation>
   * </template>
   * ```
   */
  slot: string;
}

export interface IFormConfig <T> {
  /**
   * @deprecated 已经不建议使用, 使用 `v-model` 代替
   */
  model?: Ref<T>;
  /**
   * 用于 `el-form-item` 渲染配置项
   */
  items: (IFormItemsType<T> | IFormItemsSlot<T>)[];
  /**
   * 使用类型渲染时`IFormItemsType` 监听触发的change事件
   *
   * 使用`slot`的项不会触发, 需要自行处理
   *
   * @param prop string
   * @param value TVal
   */
  change?: (prop: string, value: TVal) => void;
}
