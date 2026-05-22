import { JSEncrypt } from 'jsencrypt';

//  加密
export const encryptedData = (publicKey: string, data: string) => {
  // 新建JSEncrypt对象
  const encryptor = new JSEncrypt();
  // 设置公钥
  encryptor.setPublicKey(publicKey);
  // 加密数据
  return encryptor.encrypt(data);
};

//  解密
export const decryptedData = (publicKey: string, data: string) => {
  // 新建JSEncrypt对象
  const encryptor = new JSEncrypt();
  // 设置公钥
  encryptor.setPublicKey(publicKey);
  // 加密数据
  return encryptor.decrypt(data);
};
