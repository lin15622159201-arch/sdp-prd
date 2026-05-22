import type { fileItem, CustomObj, Format, FormatUtils } from './types';

export const formatUtils: FormatUtils = {
  /* eslint-disable no-useless-escape */
  fileUrlReg: /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-.,@?^=%&:\/~+#]*[\w\-@?^=%&\/~+#])?,?/i,
  isJSON(str: string) {
    try {
      const obj = JSON.parse(str);
      if (obj && typeof obj === 'object') return obj;
    } catch (e) {
      // e;
    }
    return false;
  },
  everyType(list: (string | fileItem)[], typeStr: 'string' | 'object') {
    return list.every((item: string | fileItem) => typeof item === typeStr);
  },
  /**
   * 根据 urlAlias (url别名key) 同步设置 fileItem.url
   * @param urlAlias url别名key
   */
  fileListFillUrl(list: fileItem[], urlAlias: string) {
    return list.map((item) => {
      item.url = item.url || item[urlAlias] || '';
      return item;
    });
  },
  /**
   * @param list 检查对象
   * @returns {string} 类型
   */
  check(list: string | string[] | CustomObj[]): Format {
    /* JSONstringArr  or  JSONobjectArr */
    const jsonRes = this.isJSON(list as string);
    if (typeof list === 'string' && jsonRes) {
      const isArray = jsonRes instanceof Array;
      const isStringArray = isArray && this.everyType(jsonRes as (string | CustomObj)[], 'string');
      if (isStringArray) return 'JSONstringArr';
      const isObjectArray = isArray && this.everyType(jsonRes as (string | CustomObj)[], 'object');
      if (isObjectArray) return 'JSONobjectArr';
    }

    /* joinString */
    if (typeof list === 'string' && this.fileUrlReg.test(list.trim())) return 'joinString';

    /* stringArr or objectArr */
    if (list instanceof Array) {
      const isStringArray = this.everyType(list, 'string');
      if (isStringArray) return 'stringArr';
      const isObjectArray = this.everyType(list, 'object');
      if (isObjectArray) return 'objectArr';
    }

    return 'unknown';
  },
  /* 转换格式 */
  format(list: string | string[] | CustomObj[]) {
    return this.formatterMap[this.check(list)](list);
  },
  /* 格式转换集合 */
  formatterMap: {
    joinString(list: string) {
      return this.stringArr(list.split(',').filter(Boolean));
    },
    stringArr(list: string[]) {
      return list.map(url => ({ url }));
    },
    objectArr(list: fileItem[]) {
      return list;
    },
    JSONstringArr(json: string) {
      try {
        const res = JSON.parse(json);
        if (res === null) return this.unknown();
        return this.stringArr(res);
      } catch (e) {
        return this.unknown();
      }
    },
    JSONobjectArr(json: string) {
      try {
        const res = JSON.parse(json);
        if (res === null) return this.unknown();
        return res;
      } catch (e) {
        return this.unknown();
      }
    },
    unknown() {
      return [];
    },
  },
  origin(type: Format, files: fileItem[]) {
    return this.originMap[type](files);
  },
  /* 格式还原集合 */
  originMap: {
    joinString(files: fileItem[]) {
      return (this.stringArr(files) as string[]).join(',');
    },
    stringArr(files: fileItem[]) {
      return files.map(item => item.url || '').filter(Boolean);
    },
    objectArr(files: fileItem[]) {
      return files;
    },
    JSONstringArr(files: fileItem[]) {
      return JSON.stringify(this.stringArr(files));
    },
    JSONobjectArr(files: fileItem[]) {
      return JSON.stringify(files);
    },
    unknown() {
      return '';
    },
  },
};
