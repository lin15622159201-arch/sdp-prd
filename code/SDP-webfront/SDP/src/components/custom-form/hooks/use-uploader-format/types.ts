export type CustomObj<T = any> = Record<string, T>;

export interface fileItem extends CustomObj {
  url?: string;
}

/* files 原始值格式 */
export type Format =
  'joinString' // 'http://x.com/a.jpg,http://x.com/b.jpg'
  | 'stringArr' // ['http://x.com/a.jpg', 'http://x.com/b.jpg']
  | 'objectArr' // [ { url:'http://x.com/a.jpg' }, { url:'http://x.com/a.jpg' } ]
  | 'JSONstringArr' // "[\"http://x.com/a.jpg\",\"http://x.com/b.jpg\"]"
  | 'JSONobjectArr' // "[{\"url\":\"http://x.com/a.jpg\"},{\"url\":\"http://x.com/a.jpg\"}]"
  | 'unknown'; // ???

/* files 原始值类型 */
export type MayType = string | string[] | CustomObj[];

export interface UseFormatState {
  files: fileItem[]; // 【响应原始值】转为【files】，提供【uploader】使用
  origin: MayType; // 【origin】（【files】映射原始值格式），提供接口参数
}

export interface FormatUtils extends CustomObj {
  fileUrlReg: RegExp;
  isJSON: (str: string) => boolean | CustomObj;
  everyType: (list: (string | fileItem)[], typeStr: 'string' | 'object') => boolean;
  check: (list: string | string[] | CustomObj[]) => Format;
  fileListFillUrl: (list: fileItem[], urlAlias: string) => fileItem[];
  format: (list: string | string[] | CustomObj[]) => fileItem[];
  formatterMap: {
    [propsName in Format]: (...arg: any[]) => fileItem[]
  };
  origin: (type: Format, files: fileItem[]) => MayType;
  originMap: {
    [propsName in Format]: (...arg: any[]) => MayType
  };
}
