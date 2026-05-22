import { buildProps } from 'element-plus/es/utils/vue/props/runtime';
import { PropType } from 'vue';

export enum VALUE_TYPE {
  HTML = 'html',
  TEXT = 'text',
}

// 默认配置
export type MENU_CONFIG_TYPE =
  | 'head'
  | 'bold'
  | 'fontSize'
  | 'fontName'
  | 'italic'
  | 'underline'
  | 'strikeThrough'
  | 'indent'
  | 'lineHeight'
  | 'foreColor'
  | 'backColor'
  | 'link'
  | 'list'
  | 'todo'
  | 'justify'
  | 'quote'
  | 'emoticon'
  | 'image'
  | 'video'
  | 'table'
  | 'code'
  | 'splitLine'
  | 'undo'
  | 'redo';

export interface EditorOptions {
  height?: number;
  zIndex?: number;
  placeholder?: string;
  excludeMenus?: MENU_CONFIG_TYPE[];

  // [propName: string]: any;
}

export const defaultOptions = {
  height: 300,
  zIndex: 1000, // 默认是 10000，重置为 1000
  placeholder: '请输入内容',
  // menu 和 excludeMenus 两个配置不能同时使用，一般常用去除不要的配置，故可传入不需要的配置
  excludeMenus: ['video', 'link', 'todo'] as MENU_CONFIG_TYPE[],
};

export const editorProps = buildProps({
  modelValue: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  valueType: {
    type: String as PropType<VALUE_TYPE>,
    default: VALUE_TYPE.HTML,
  },
  options: {
    type: Object as PropType<EditorOptions>,
    default: () => defaultOptions,
  },
});
