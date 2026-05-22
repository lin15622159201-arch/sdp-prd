import { ref } from 'vue';
import useFileUploader from '@/components/uploader/packages/hooks/use-file-uploader';
import { paste } from './paste';
import { drop } from './drop';
import { UploadRes } from '@myna/file-uploader';
import { isFileExtensionsValid, isFileSizeExceeded } from './validator';
import { ElLoading } from 'element-plus';

export type UploadProps = {
  /**
   * 文件大小 MB
   */
  fileSize?: number;
  /**
   * 文件数量
   */
  fileCount?: number;
  /**
   * 允许的文件扩展名
   */
  allowedExtensions?: string[];
  /**
   * 上传失败回调
   */
  onUploadError?: (type: 'drop' | 'paste' | 'validator' | 'upload', errorMsg: string, error: Error) => void;
  /**
   * 所有上传成功回调
   */
  onAllUploadSuccess?: (result: UploadRes[]) => void;
  /**
   * 每次选择前是否清空
   */
  clearBeforeSelect?: boolean;
  /**
   * 当上传文件为图片时，限制的长宽大小
   */
  imageSize?: {
    maxWidth: number;
    maxHeight: number;
    minWidth?: number;
    minHeight?: number;
  };
};

type FileItem = {
  url: string;
  file?: File;
  fileName?: string;
};

export const useUpload = ({
  fileSize = 10,
  fileCount = 1,
  allowedExtensions = [],
  onUploadError,
  onAllUploadSuccess,
  clearBeforeSelect = false,
  imageSize,
}: UploadProps) => {
  const options = {
    fileSize,
    fileCount,
    allowedExtensions,
    onUploadError,
    onAllUploadSuccess,
    clearBeforeSelect,
  };

  const { fileUploader } = useFileUploader();

  const uploadedFiles = ref<FileItem[]>([]);

  const uploadLoading = ref(false);

  const uploadFiles = async (fileList: FileList) => {
    const list = clearBeforeSelect ? [] : uploadedFiles.value;
    if (fileCount !== -1 && fileList.length + list.length > fileCount) {
      onUploadError && onUploadError('validator', '文件数量超出限制', new Error('文件数量超出限制'));
      return;
    }

    // 文件大小
    if (isFileSizeExceeded(fileList, fileSize)) {
      onUploadError && onUploadError('validator', '文件大小超出限制', new Error('文件大小超出限制'));
      return;
    }

    // 文件
    if (allowedExtensions.length > 0 && !isFileExtensionsValid(fileList, allowedExtensions)) {
      onUploadError && onUploadError('validator', '文件格式不正确', new Error('文件格式不正确'));
      return;
    }

    const loading = ElLoading.service({
      lock: true,
      text: '上传中...',
      background: 'rgba(0, 0, 0, 0.7)',
    });
    const waitToUploadList = Array.from(fileList);
    const task = await fileUploader.upload(waitToUploadList, {
      onSuccess(data) {
        const { fileIndex, url, fileName } = data;
        list.push({
          url,
          file: waitToUploadList[fileIndex],
          fileName,
        });
        loading.close();
      },
      onFail(err, data) {
        console.log('err', err, data);
        loading.close();
        onUploadError && onUploadError('upload', '上传失败', err);
      },
    });

    if (clearBeforeSelect) {
      uploadedFiles.value = list;
    }
    loading.close();
    onAllUploadSuccess && onAllUploadSuccess(task);
  };

  const handleInputFile = async (e: Event) => {
    if (uploadLoading.value) return;
    const target = e.target as HTMLInputElement;
    console.log('target', target);
    if (target.files) {
      uploadLoading.value = true;
      try {
        await uploadFiles(target.files);
      } catch (error: any) {
        onUploadError && onUploadError('upload', '上传失败', error);
      } finally {
        uploadLoading.value = false;
      }
    }
    target.value = '';
  };

  const handlePaste = async (e: ClipboardEvent) => {
    if (uploadLoading.value) return;
    uploadLoading.value = true;
    try {
      await paste(e, uploadFiles);
    } catch (error: any) {
      onUploadError && onUploadError('paste', '粘贴图片失败', error);
    } finally {
      uploadLoading.value = false;
    }
  };

  const handleDrop = async (e: DragEvent) => {
    if (uploadLoading.value) return;
    uploadLoading.value = true;
    try {
      await drop(e, uploadFiles);
    } catch (error: any) {
      onUploadError && onUploadError('drop', '拖拽图片失败', error);
    } finally {
      uploadLoading.value = false;
    }
  };

  return {
    uploadedFiles,
    handleInputFile,
    handlePaste,
    handleDrop,
    uploadLoading,
  };
};
