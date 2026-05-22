import md5 from 'md5';

export const getFileMd5 = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event) return;
      const arrayBuffer = event.target!.result;
      if (!arrayBuffer) return;
      const uint8Array = new Uint8Array(arrayBuffer as ArrayBuffer);
      console.log(uint8Array);
      resolve(md5(uint8Array));
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsArrayBuffer(file);
  });
};
