import type { DebouncedFunc } from 'lodash-es';
import { debounce } from 'lodash-es';
import { getCategoryList } from '@/api/scm';
import type { ICategoryListReq } from '@/api/scm/types';
import type {
  Task,
  Fn,
  opsDictRes,
  scmDictRes,
  // BASIC_DATA_TYPE,
  basicCodes,
  Dictionary_,
} from '@/hooks-transfer/dictionary/types';
import { getDictValueBatchList } from '@/api/dictionary';
import { IGetDictValueBatchListRes } from '@/api/dictionary/types';
import { IdictValuesItem } from '@/api/dict/types';
// import * as basicAPI from '@/api/basis/index';

/*
  基础资料数据类型 <=> api方法
*/
// const mapApiMethod: Record<BASIC_DATA_TYPE, (...arg: any[]) => Promise<any>> = {
//   [BASIC_DATA_TYPE.DELIVERY]: basicAPI.deliveryList,
//   [BASIC_DATA_TYPE.TAG]: basicAPI.getClothingTag,
//   [BASIC_DATA_TYPE.PARTS]: basicAPI.clothesPartsSize,
// };
export default class Request {
  base: Dictionary_;

  processState: boolean;

  processParams: string[];

  tasks: Set<Task>;

  trigger: DebouncedFunc<Fn>;

  api: Fn;

  [k: string]: any;

  constructor(base: Dictionary_) {
    this.base = base;
    this.api = this[`${base.system}GetData`] || (async () => []);
    this.callbackHandle = this[`${base.system}CallbackHandle`] || (() => null);
    this.processState = false;
    this.processParams = [];
    this.tasks = new Set();
    this.trigger = debounce(this.callback, 30);
  }

  tasksCleaning() {
    const resCodes = [...this.tasks].reduce((res, current) => {
      current.params.forEach((code) => { res.add(code); });
      return res;
    }, new Set());
    return [...resCodes] as string[];
  }

  add(task: Task) {
    this.tasks.add(task);
    this.trigger();
  }

  async callback() {
    const params = this.tasksCleaning();
    // eslint-disable-next-line no-console
    console.log(`[${this.base.system} request]`, params.length, [...this.tasks]);
    this.tasks.clear();
    this.callbackHandle(params);
  }

  async OPSCallbackHandle(params: string[]) {
    const response = await this.getData(params);
    // eslint-disable-next-line no-console
    console.log(`[${this.base.system} response]`, params.length, response.length);
    this.base?.instance?.acceptResponse?.({
      params,
      response,
    });
  }

  async SCMCallbackHandle(params: string[]) {
    this.batchGetDataHandle(params);
  }

  async BASCallbackHandle(params: basicCodes[]) {
    this.batchGetDataHandle(params);
  }

  batchGetDataHandle(params: string[]) {
    params.forEach(async (code) => {
      const response = await this.getData(code);
      // eslint-disable-next-line no-console
      console.log(`[${this.base.system} response]`, params.length, response.length);
      this.base?.instance?.acceptResponse?.({
        params: [code],
        response,
      });
    });
  }

  isStoreHas(params: string[] | string) {
    const codes = typeof params === 'string' ? [params] : params;
    const isStoreHas = this.base?.instance?.store.every(codes);
    if (isStoreHas) {
      // eslint-disable-next-line no-console
      console.log('request 本地复用', codes);
    }
    return isStoreHas;
  }

  async getData(params: string[] | string) {
    if (this.isStoreHas(params)) return [];
    const response = await this.api(params);
    return response;
  }

  /**
   * ops 批量获取字典数据
   * @param dictCodes 字典code
   * @returns
   */
  public async OPSGetData(dictCodes: string[]) {
    let response: opsDictRes = [];
    this.processState = true;
    this.processParams = dictCodes;
    try {
      const { data = [] } = await getDictValueBatchList(dictCodes);
      this.processState = false;
      this.processParams = [];
      const format = (arr: IGetDictValueBatchListRes, valueParentCode: string, dictCode: string): IdictValuesItem[] => {
        return arr.map(v => ({
          valueParentCode,
          valueCode: v.dictCode,
          remark: '',
          dictValueId: v.id,
          dictCode,
          value: v.dictName,
          isEnable: v.state,
          isEnabled: v.state,
          children: format(v.children ?? [], v.dictCode, dictCode),
          attributes: v.attributes
        }));
      };
      response = (data ?? []).map(v => ({
        dictCode: v.dictCode,
        dictName: v.dictName,
        dictValues: format(v.children ?? [], '', v.dictCode)
      }));
    } catch (e) {
      console.error('getOPS error', e);
      this.processState = false;
      this.processParams = [];
      response = [];
    }
    return response;
  }

  /* 商品库，辅料、工艺 级联数据 */
  /**
   * @param type 10 辅料 、20 工艺
   */
  async SCMGetData(type: ICategoryListReq | string) {
    let response: scmDictRes = [];
    this.processState = true;
    this.processParams = [type];
    try {
      const { data = [] } = await getCategoryList(type as ICategoryListReq);
      this.processState = false;
      this.processParams = [];
      response = data;
    } catch (e) {
      console.error('error getCategory', e);
      this.processState = false;
      this.processParams = [];
      response = [];
    }
    return response;
  }

  async BASGetData(code: basicCodes) {
    // eslint-disable-next-line no-console
    console.log('get', code, this);
    return [];
  }
}
