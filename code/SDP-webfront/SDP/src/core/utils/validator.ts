import { hideFullScreenLoading, showFullScreenLoading } from '../http/helper';

/** 验证文本中是否存在手机号，固话, 连续11位数字也不行 */
export const hasMobilePhone = (text: string) => {
  const reg = /1[3-9]\d{9}/;
  const tel = /\d{3,4}[-]\d{7,8}/;
  const num = /\d{11}/;
  return reg.test(text) || tel.test(text) || num.test(text);
};

/** 名字中不能含有小姐、先生、老板、老板娘、手机号，固话，连续11位数字也不行 */
export const validUserName = (text: string) => {
  const phoneReg = /1[3-9]\d{9}/;
  const telReg = /\d{3,4}[-]\d{7,8}/;
  const nameReg = /小姐|先生|老板|老板娘/;
  const numReg = /\d{11}/;
  if (phoneReg.test(text)) {
    return false;
  }
  if (telReg.test(text)) {
    return false;
  }
  if (nameReg.test(text)) {
    return false;
  }
  if (numReg.test(text)) {
    return false;
  }
  return true;
};

/*
* 密码校验
*  */
export const validPassword = (password: string) => {
  // eslint-disable-next-line vue/max-len
  const reg = /((^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]))|(^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&$%*_]))|(^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#&$%*_])))(?!.*\s)(?!.*[\u4e00-\u9fa5]).{8,16}$/;
  return reg.test(password);
};

export type ValidImageSizeOptions = {
  /* 图片大小，单位MB */
  mbSize?: number;
  /* 图片最大宽度，默认4096px */
  maxWidth?: number;
  /* 图片最大高度，默认4096px */
  maxHeight?: number;
};
/**
 * 校验图片大小和尺寸
 */
export const validImageSize = (file: File, { mbSize, maxWidth, maxHeight }: ValidImageSizeOptions = {}) => {
  return new Promise((resolve, reject) => {
    if (file.type.indexOf('image') === -1) {
      reject('请选择图片文件');
      return;
    }
    if (mbSize && file.size > 1024 * 1024 * mbSize) {
      reject(`图片大小不能超过${mbSize}MB`);
      return;
    }
    showFullScreenLoading();
    const img = new Image();
    const fileReader = new FileReader();
    fileReader.onload = () => {
      img.src = fileReader!.result as string;
      img.onload = () => {
        hideFullScreenLoading();
        if (maxWidth && img.width > maxWidth) {
          reject(`图片的宽度不能超过${maxWidth}px，请重新上传`);
          return;
        }
        if (maxHeight && img.height > maxHeight) {
          reject(`图片的高度不能超过${maxHeight}px，请重新上传`);
          return;
        }
        resolve(true);
      };
      img.onerror = () => {
        hideFullScreenLoading();
        reject('图片加载失败，请重新上传');
      };
    };
    fileReader.onerror = () => {
      hideFullScreenLoading();
      reject('图片加载失败，请重新上传');
    };
    fileReader.readAsDataURL(file);
  });
};
