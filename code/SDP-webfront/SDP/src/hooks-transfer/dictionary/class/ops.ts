import { Dictionary } from '@/hooks-transfer/dictionary/core/base';
import type { Ref } from 'vue';
import { ref } from 'vue';
import OpsFormat from '../format/ops-format';
import * as config from '../config/ops/index';
import type * as Types from '@/hooks-transfer/dictionary/types';
import { isUndefined, isPlainObject } from 'lodash-es';
import { YES_NO_NUMBER_ENUM } from '@/constant';

type TIsEnableData = Record<string /** 字典code */, boolean | null>;

export interface FilterOpts {
  /**
   * 用于过滤字典的状态 默认true
   *
   * true 为启用的
   *
   * false 为停用的
   *
   * null 为全部
   *
   * 当该字段为对象时， 属性则为字典code，表示只有该字典code使用该过滤规则
   */
  isEnable?: boolean | null | TIsEnableData;
}

/* ops-字典管理 */
export class OpsDict extends Dictionary implements Types.DictIns {
  /* 初始化、store过期：获取默认配置字典 ? */
  isReset: boolean;

  /* 字典对象 */
  batchDictListMap: Ref<Types.BatchDictListMap>;

  /* 字典格式对象 */
  format: OpsFormat;

  /* 默认参数 */
  defaultParams: string[];

  /** 回调 */
  cbs: Types.CallBack[];

  /* 对外方法 */
  mapCodes: OpsFormat['mapCodes'];

  mapLabels: OpsFormat['mapLabels'];

  static instance = {} as OpsDict;

  public constructor(system: Types.System, isReset = false) {
    super(system);
    this.cbs = [];
    this.isReset = isReset;
    this.instance = this;
    this.defaultParams = [];
    this.batchDictListMap = ref<Types.BatchDictListMap>({});
    this.format = new OpsFormat({
      cutting: '-',
      batchDictListMap: this.batchDictListMap,
    });
    this.mapCodes = this.format.mapCodes.bind(this.format);
    this.mapLabels = this.format.mapLabels.bind(this.format);
    this.init();
    // if (OpsDict.instance instanceof OpsDict) return OpsDict.instance;
    OpsDict.instance = this;
  }

  /* 来自 request 响应数据 */
  acceptResponse(info: Types.RequestSendInfo): void {
    const {
      // params,
      response,
    } = info;
    this.sycnDictsToStore(response as Types.opsDictRes);
    this.sycnDictsToMap(response as Types.opsDictRes);
    while (this.cbs && this.cbs.length) {
      const cb = this.cbs.shift();
      cb && cb(this.batchDictListMap);
    }
  }

  /**
   * 检查选择启用
   * @param item
   * @returns
   */
  private enableCheck(item: Types.dictItem, opts?: FilterOpts) {
    let { isEnable } = opts || {};

    if (isUndefined(isEnable)) {
      isEnable = this.isEnable;
    }

    if (isEnable === null) return true;
    if (isEnable && item.isEnable === YES_NO_NUMBER_ENUM.YES) return true;
    if (!isEnable && item.isEnable === YES_NO_NUMBER_ENUM.NO) return true;
    return false;
  }

  private filterNotEnableItem(
    dictValues: Types.dictItem[],
    code: string,
    opts?: FilterOpts,
  ) {
    let _opts = opts;
    if (
      opts
      && isPlainObject(opts.isEnable)
      && Object.hasOwnProperty.call(opts.isEnable, code)
    ) {
      // opts.isEnable
      _opts = {
        isEnable: (opts.isEnable as TIsEnableData)[code],
      };
    }

    return dictValues.filter(opt => this.enableCheck(opt, _opts));
  }

  /**
   * 服务端数据同步 store
   * @param response
   * @returns
   */
  private sycnDictsToStore(response: Types.opsDictRes = []) {
    return response.reduce((store, dict) => {
      const {
        dictCode = '',
        dictValues = [],
      } = dict;
      const isSet = dictCode;

      if (isSet) {
        this.store?.put(
          dictCode,
          dictValues,
        );
      }
      return store;
    }, this.store!);
  }

  /**
   * 服务端数据同步 字典集合
   * @param response
   * @param batchDictListMap
   * @returns
   */
  private sycnDictsToMap(response: Types.opsDictRes = []) {
    return response.reduce((map, dict) => {
      const {
        dictCode = '',
        dictValues = [],
      } = dict;
      const isSet = dictCode;

      if (isSet) {
        map.value[dictCode] = this.filterNotEnableItem(dictValues, dictCode);
      }
      return map;
    }, this.batchDictListMap);
  }

  /**
   * store数据同步 字典集合
   * @param dictCodes
   * @param batchDictListMap
   * @returns
   */
  private sycnStoreToMap(dictCodes: string[], opts?: FilterOpts) {
    return dictCodes.reduce((map, code) => {
      const dictValues = this.store?.get(code) || [];
      map.value[code] = this.filterNotEnableItem(dictValues as Types.dictItem[], code, opts);
      return map;
    }, this.batchDictListMap);
  }

  /* 申请更新字典 */
  needUpdateDicts(dictCodes_: string[]) {
    this.request.add({
      params: dictCodes_,
      type: 'OPS',
    });
  }

  /**
   * 获取字典集合
   * @param dictCodes
   * @returns { Ref<BatchDictListMap> }
   */
  public getDicts(dictCodes: string[], cb?: Types.CallBack, opts?: FilterOpts) {
    const dictCodes_ = dictCodes.filter(Boolean);
    /* 是否存在store */
    const isStoreHas = this.store?.every(dictCodes_);
    /* 本地复用 */
    if (isStoreHas) {
      this.sycnStoreToMap(dictCodes_, opts);
      cb && cb(this.batchDictListMap);
      return this.batchDictListMap;
    }

    /* 远程更新 map */
    this.needUpdateDicts(dictCodes_);
    cb && this.cbs.push(cb);

    if (opts && !isUndefined(opts.isEnable) && opts.isEnable !== this.isEnable) {
      this.cbs.push(() => {
        this.sycnStoreToMap(dictCodes_, opts);
      });
    }

    return this.batchDictListMap;
  }

  /**
   * 获取 code , 转换为tree级联数据
   * @param codeOpt 级联code配置
   * @returns
   */
  public getCascader(codeOpt: Types.CasacaderOpt, opts?: FilterOpts) {
    const {
      code = '',
      comma = false,
      maxLayer,
    } = codeOpt;
    const batchDictListMap = this.getDicts([code], undefined, opts);
    return OpsFormat.conversion({
      batchDictListMap,
      code,
      comma,
      maxLayer,
    });
  }

  public getDefautDicts() {
    if (!this.isReset) return;
    this.defaultParams = Dictionary.getConfigParams(config);
    this.getDicts(this.defaultParams);
  }

  public init() {
    this.getDefautDicts();
  }
}

export const opsDict = new OpsDict('OPS', true);
