// eslint-disable-next-line vue/max-len
const w = '?x-oss-process=image/watermark,text_RmFzaGlvbk1pbmQ=,fill_1,padx_240,pady_240,t_30,rotate_315,size_30,color_F2F4FA';
// 添加水印
export const getImgWithWatermark = (v: string) => {
  const reg = /.(png|jpg|jpeg|webp)$/;
  if (reg.test(v)) {
    return `${v}${w}`;
  }
  return v;
};

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
