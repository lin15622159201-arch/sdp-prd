import type { Ref } from 'vue';
import { isRef, isReactive, watchEffect, watch, reactive, unref } from 'vue';
import type { CustomObj, UseFormatState, MayType, Format } from './types';
import { get } from 'lodash-es';
import { formatUtils } from './utils';

const unkownMess = `useUploaderFormat : 
    parameter : 'data' is not control range, use reactive(data) or ref(data)`;

/**
 * uploader 格式转换
 * 提供：回显 files 和 origin（映射原始值格式）
 * @param { Ref<Obj> | Reactive<Obj> } data 数据来源
 * @param { string } fileKeyPath 图片列表的访问路径 'pictures' 、 'data.pictures'
 * @param { string } urlAlias  fileItem 中 `url` key的别名（默认为url）
 * @returns { UseFormatState }
 */
export function useUploaderFormat<T = any>(
  data: Ref<T | CustomObj> | T,
  fileKeyPath: string,
  urlAlias: string = 'url',
): UseFormatState {
  // state 映射
  const state = reactive<UseFormatState>({
    files: [],
    origin: '',
  });

  // 响应类型检查
  let type: 'ref' | 'reactive' | '' | string = '';
  const controlRange = [isRef, isReactive].some((check) => {
    type = check(data) ? (check.name.replace('is', '').toLowerCase() || '') : '';
    return type;
  });
  if (!controlRange) {
    console.warn(unkownMess);
    return state;
  }

  // files 代理回显
  // console.log(type, fileKeyPath);
  let formatType: Format = 'unknown';
  watchEffect(() => {
    const currentList = get(
      // type === 'ref' ? (data as Ref<T | CustomObj>).value : data, （有bug...）
      unref(data),
      fileKeyPath,
    ) as MayType;
    state.origin = currentList;

    formatType = formatUtils.check(currentList);
    const list = formatUtils.formatterMap[formatType](currentList);
    state.files = urlAlias === 'url' ? list : formatUtils.fileListFillUrl(list, urlAlias);
    // console.log('watchEffect update (unref)', state);
  });

  // files 映射原始值格式
  watch(() => state.files, (newFiles) => {
    state.origin = formatUtils.origin(formatType, newFiles);
  });

  return state;
}

/* static methods */
useUploaderFormat.utils = formatUtils;
