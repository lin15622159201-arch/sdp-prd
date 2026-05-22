import { computed, inject, toRef } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { uploaderKey } from '../utils/token';
import logger from '../utils/logger';
import { exportByBlob } from '@/core/utils/file-download';

import type { IFileData } from '../types';
import type { IScope } from '@/components/image-viewer';

interface FilePropsData {
  list: IFileData[];
  showListTypeImg?: Boolean;
  [k: string]: unknown;
}

export default function useFileList(props: FilePropsData) {
  const uploaderRef = inject(uploaderKey)!;
  const listRef = toRef(props, 'list');

  // 图片、文件混合时，删除时需要使用url比对找到下标
  const isListTypeImg = computed(() => props.showListTypeImg);

  const handleMove = async (
    canMove: boolean,
    nextIndex: number,
    currIndex: number,
    file: IFileData,
  ) => {
    if (canMove && uploaderRef.move) {
      try {
        if (typeof uploaderRef.onMove === 'function') {
          await uploaderRef.onMove(nextIndex, currIndex, file);

          uploaderRef.emit('change', listRef.value);
        } else {
          const _list = [...listRef.value];
          const currItem = _list.splice(currIndex, 1);
          _list.splice(nextIndex, 0, currItem[0]);
          uploaderRef.emit('update:modelValue', _list);

          uploaderRef.emit('change', _list);
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleDel = async (i: number, file: IFileData) => {
    try {
      if (typeof uploaderRef.onRemove === 'function') {
        await uploaderRef.onRemove(i, file);

        uploaderRef.emit('update:modelValue', listRef.value);
        uploaderRef.emit('change', listRef.value);
        uploaderRef.emit('delete', file);
      } else {
        ElMessageBox.confirm('是否确认删除该文件?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            const _list = listRef.value.filter(item => !item.fake);
            const realIndex = isListTypeImg.value
              ? _list.findIndex(item => item.url === file.url)
              : i;

            _list.splice(realIndex, 1);

            uploaderRef.emit('update:modelValue', _list);

            uploaderRef.emit('change', _list);
            uploaderRef.emit('delete', file);

            ElMessage.success('操作成功');
          })
          .catch(() => {});
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handlePreview = async (uploadFile: IFileData, index: number, view?: IScope['view']) => {
    if (typeof uploaderRef.onPreview !== 'function') {
      view?.(index);
      return;
    }
    try {
      const res = await uploaderRef.onPreview(uploadFile, index);
      if (res === false) return;
      view?.(index);
    } catch (e) {
      logger.error(e);
    }
  };

  const handleDownload = (url: string, filename?: string) => {
    exportByBlob({
      url,
      filename,
      method: 'get',
    });
  };

  return {
    uploaderRef,
    handleDel,
    handleMove,
    handlePreview,
    handleDownload,
  };
}
