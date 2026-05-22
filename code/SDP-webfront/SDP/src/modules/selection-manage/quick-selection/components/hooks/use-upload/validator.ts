export const isFileSizeExceeded = (fileList: FileList, maxSizeMB: number): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024; // 将 MB 转换为字节
  for (let i = 0; i < fileList.length; i++) {
    if (fileList[i].size > maxSizeBytes) {
      return true;
    }
  }
  return false;
};

export const isFileExtensionsValid = (fileList: FileList, allowedExtensions: string[]): boolean => {
  for (let i = 0; i < fileList.length; i++) {
    const fileExtension = fileList[i].name.split('.').pop()?.toLowerCase();
    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      return false;
    }
  }
  return true;
};

function isImageFile(file: File) {
  return file.type.startsWith('image/');
}

export const isImageSizeValid = (
  fileList: FileList,
  imageSize: { maxWidth: number; maxHeight: number; minWidth?: number; minHeight?: number; }
): boolean => {
  for (let i = 0; i < fileList.length; i++) {
    const file = fileList[i];
    if (isImageFile(file)) {
      const image = new Image();
      image.src = URL.createObjectURL(fileList[i]);
      if (image.width > imageSize.maxWidth || image.height > imageSize.maxHeight) {
        return false;
      }
      if (imageSize.minWidth && imageSize.minHeight
        && (image.width < imageSize.minWidth || image.height < imageSize.minHeight)) {
        return false;
      }
    }
  }
  return true;
};
