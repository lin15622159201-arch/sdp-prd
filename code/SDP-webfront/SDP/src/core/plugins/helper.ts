import { isEmpty, isURL } from '@toy/utils';

// 是否视频文件
const videoTypes = ['mp4', 'webm', 'ogg', 'mov'];
const isVideoType = (url: string) => {
  const _type = url?.split('.')?.pop()?.toLowerCase?.();
  return (_type && videoTypes.includes(_type)) || false;
};
// 是否图片文件
const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
const isImageType = (url: string) => {
  const _type = url?.split('.')?.pop()?.toLowerCase?.();
  return (_type && imageTypes.includes(_type)) || false;
};
/**
 * 缩放图片
 * 目前配置限制 100M，超过会报错
 */
export const resizeImgByWidth = (url: string = '', w = 96) => {
  if (isEmpty(url)) return url;
  if (!isURL(url)) return url;
  // 目前知道能处理的只有这两个域名 后面有再补吧
  const ossDomains = [
    'oss-datawork-cdn.tiangong.tech',
    'oss-datawork.oss',
    'oss.yunbanfang.cn',
    'ext-pic.oss-ap-southeast-1.aliyuncs.com',
    'common-oss-cdn.tiangong.tech',
    'chuangxin-oss-cdn.tiangong.tech',
  ];
  if (!ossDomains.some(v => url.includes(v))) return url;
  const isVideo = isVideoType(url);
  const isImage = isImageType(url);
  if (!isVideo && !isImage) return url;
  let queryStr = `x-oss-process=image/resize,w_${w},m_lfit&image_process=quality,q_95`;
  if (isVideo) {
    queryStr = `x-oss-process=video/snapshot,t_0,f_jpg,m_fast,w_${w}`;
  }
  if (url.includes('?')) {
    return `${url}&${queryStr}`;
  }
  return `${url}?${queryStr}`;
};
