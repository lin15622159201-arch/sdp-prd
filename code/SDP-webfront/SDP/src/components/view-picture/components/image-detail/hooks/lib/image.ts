// 获取图片名字
export const getImgName = (v: string) => {
  if (v) {
    const arr = v.split('/');
    const names = arr[arr.length - 1].split('.');
    return `${names[0]}`;
  }
  return '';
};

export const getImgTaskName = (taskCode: string, index: number) => {
  return `${taskCode}-${index + 1}`;
};
