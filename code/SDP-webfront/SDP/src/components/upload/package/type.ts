import { ElImage, ElMessage } from 'element-plus';
import type { InjectionKey, PropType, ExtractPropTypes } from 'vue';

export interface IFile {
  url: string;
  name?: string;
  id?: string;
  size?: number | string;
  type?: string;
  progress?: number;
}

export type ImageEl = InstanceType<typeof ElImage>;

export interface ICompress {
  /** 是否压缩 */
  isCompress: boolean;
  /** 压缩后的图片宽度 （按照比例压缩） */
  compressWidth: number;
}

export const baseProps = {
  needMask: {
    type: Boolean,
    default: false,
  },

  maskContent: {
    type: String,
    default: '致景科技 创新BG',
  },

  /**
   * 文本提示
   */
  tip: {
    type: String,
    default: '',
  },

  /**
   * fileList：文件列表
   * imageList：图片列表
   */
  type: {
    type: String as PropType<'fileList' | 'imageList'>,
    default: 'imageList',
  },

  modelValue: {
    type: Array as PropType<IFile[]>,
    default: () => [],
  },

  /**
   * 是否显示粘贴上传
   */
  paste: {
    type: Boolean,
    default: false,
  },

  /**
   * 禁用编辑
   */
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * 上传数量限制， 0为不限制
   */
  limit: {
    type: Number,
    default: Infinity,
  },

  /**
   * 是否支持多选文件
   */
  multiple: {
    type: Boolean,
    default: true,
  },

  name: {
    type: String,
    default: 'file',
  },

  accept: {
    type: String,
    default: 'image/png,image/jpeg,image/jpg',
  },

  /**
   * 样式大小
   */
  size: {
    type: String as PropType<'medium' | 'small' | 'mini'>,
    viladator: (val: string) => {
      return ['medium', 'small', 'mini'].indexOf(val) !== -1;
    },
    default: 'small',
  },

  /**
   * 文件超出个数限制时的钩子
   */
  onExceed: {
    type: Function,
    default: () => {
      ElMessage.warning('上传数量超过限制');
    },
  },

  sizeLimit: {
    type: Number,
    default: Infinity,
  },

  canDownload: {
    type: Boolean,
    default: true,
  },

  // 图片压缩参数
  compress: {
    type: Object as PropType<ICompress>,
    default: () => ({}),
  },

  /**
   * 是否粘贴、拖放到面板立即上传
   */
  pasteAutoUpload: {
    type: Boolean,
    default: false,
  },
};

export type IProps = ExtractPropTypes<typeof baseProps>;

export interface UploaderContext extends IProps {
  size: 'medium' | 'small' | 'mini';
  name: string;
  pasteAutoUpload: boolean;
  multiple: boolean;
  disabled: boolean;
  emit: (evt: 'change' | 'update:modelValue', ...args: any[]) => void;
  uploadFiles(files: FileList): Promise<void>;
}

export const uploaderKey: InjectionKey<UploaderContext> = 'uploader' as any;
