import { ref, onBeforeUnmount } from 'vue';
import { IProps } from '../type';
// eslint-disable-next-line
import Worker from './worker?worker';

export const useCompress = (props: IProps) => {
  const workers = ref<Array<Worker | null>>([]);
  // 判断是否是可用canvas绘制的图片类型
  const isImage = (file: File) => {
    return (
      file.type.indexOf('image') !== -1
      && (file.type.indexOf('png') !== -1 || file.type.indexOf('jpeg') !== -1 || file.type.indexOf('jpg') !== -1)
    );
  };
  /** *
   * 图片压缩
   */
  const handleCompress = (file: File) => {
    return new Promise<File>((resolve, reject) => {
      if (!isImage(file)) {
        resolve(file);
        return;
      }
      const {
        compress,
        maskContent,
        needMask
      } = props;
      const worker = new Worker();
      workers.value.push(worker);
      worker.postMessage({ file, compress, needMask, maskContent }, []);
      worker.addEventListener('message', (e: any) => {
        const { files, type } = e.data;
        worker.terminate();
        if (type === 'success') {
          files.name = file.name;
          resolve(e.data.files);
        } else if (type === 'error') {
          reject();
        }
      });
    });
  };
  onBeforeUnmount(() => {
    if (workers.value.length) {
      workers.value.forEach((v) => {
        v?.terminate();
      });
    }
  });
  return {
    handleCompress,
    isImage,
  };
};
