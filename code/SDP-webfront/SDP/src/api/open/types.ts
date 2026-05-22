export interface FileUploadResponseItem {
  /**
   * 文件名称
   */
  name: string;
  /**
   * 原始文件名称
   */
  originFileName: string;
  /**
   * 文件大小 单位b
   */
  size: string;
  /**
   * 文件地址
   */
  url: string;
  ossPath: string;
}
