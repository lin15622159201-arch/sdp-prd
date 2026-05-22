import type { StyleValue } from 'vue';
import type Uploader from './uploader.vue';

/**
 * 基础file对象属性
 */
export interface IFile {
  url: string;
  name?: string;
  size?: string | number;
  type?: string;
  file?: File;
}

export interface IFakeFileData extends IFile {
  loading?: boolean;
  progress?: string;
  fake?: true;
  id?: string | number;
  /** 文件夹名称 */
  dir?: string;
}

export interface IFileData extends Partial<IFakeFileData> {
  url: string;
  [k: string]: unknown;
}

export type TOnMove = (nextIndex: number, currIndex: number, file: IFileData) => void | Promise<void>;

export type TOnRemove = (index: number, file: IFileData) => void | Promise<void>;

export type TElement = JSX.Element | JSX.Element[];
export type RenderFn = () => TElement;

/**
 * 自定义Preview操作
 * 返回 false 则中断默认查看大图操作
 */
export type TOnPreview = (uploadFile: IFileData, index: number) => void | boolean | Promise<void | boolean>;

export type UploaderInstanceType = InstanceType<typeof Uploader>;

export interface UploaderContext {
  size: 'medium' | 'small' | 'mini' | 'tiny';
  direction: string;
  name: string;
  preview: boolean;
  pasteAutoUpload: boolean;
  multiple: boolean;
  disabled: boolean;
  move: boolean;
  remove: boolean;
  download: boolean;
  emit: (evt: 'change' | 'update:modelValue' | 'delete', ...args: any[]) => void;
  uploadFiles(files: FileList): Promise<void>;
  onMove?: TOnMove;
  onRemove?: TOnRemove;
  onPreview?: TOnPreview;
}

/**
 * 设置 file item 样式
 *
 * @param itemData 每项 file 的数据, 如上传中的数据则是 `IFakeFileData`
 * @param index 每项 file 的下标
 */
export type TSetFileWrapperStyle = (itemData: IFileData, index: number) => StyleValue | undefined;
