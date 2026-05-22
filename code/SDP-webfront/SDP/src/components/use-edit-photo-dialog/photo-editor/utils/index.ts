import md5 from 'md5';

export const getStringMd5 = (url: string) => {
  return md5(url);
};
export const base64ToBlob = (base64: string) => {
  const parts = base64.split(';base64,');
  const contentType = parts[0].split(':')[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);
  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  return new Blob([uInt8Array], { type: contentType });
};

// url转file
export const urlToFile: (url: string) => Promise<File> = (url: string) => {
  const imageName = url.substring(url.lastIndexOf('/') + 1);
  // 截取图片后缀名
  const suffixName = imageName.split('.')[1];
  return new Promise((resolve, reject) => {
    let blob: any | null = null;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader('Accept', 'image/jpeg');
    xhr.responseType = 'blob';
    xhr.onload = () => {
      blob = xhr.response;
      const imgFile = new File([blob], imageName, { type: `image/${suffixName}` });
      resolve(imgFile);
    };
    xhr.onerror = (e) => {
      reject(e);
    };
    xhr.send();
  });
};
// url转Base64
export const urlToBase64: (url: string) => Promise<string> = async (url: string) => {
  const file: File = await urlToFile(url);
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (v) => {
      resolve((v.target?.result as string) || '');
    };
  });
};

// 获取图片宽高
export interface ImageSize {
  width: number;
  height: number;
}
export const getImageSize = (url: string) => new Promise<ImageSize>((resolve) => {
  const img = new Image();
  img.onload = () => {
    resolve({
      width: img.width,
      height: img.height,
    });
  };
  img.src = url;
});
