import Store from './store';
import Request from './request';
import type * as Types from '@/hooks-transfer/dictionary/types';

/* 基础支持 */
export class Dictionary {
  /* 系统 */
  system: Types.System;

  /* 子类实例 */
  instance: Types.Instance | null;

  createTime: number;

  /* 请求对象 */
  request: Request;

  /* 字典缓存对象 */
  store: Store;

  /*
      true 只显示启用
      false 只显示未启用
      null 都显示
  */
  isEnable?: boolean | null;

  [k: string]: any;

  public constructor(system: Types.System) {
    this.system = system;
    this.instance = null;
    this.createTime = +new Date();
    this.request = new Request(this);
    this.store = new Store(this, { length: 1000 });
    this.isEnable = true;
  }

  log() {
    // eslint-disable-next-line no-console
    console.log({
      size: this.store.cache.size,
      createTime: this.store.createTime,
    });
  }

  static proxyFnToIns(ins: Types.Instance, proxyPath: string, proxyKeys: string[]) {
    proxyKeys.forEach((key) => {
      Object.defineProperty(ins, key, {
        get() {
          return ins[proxyPath][key].bind(ins[proxyPath]);
        },
      });
    });
  }

  public static getConfigParams(config: Record<string, Types.ModulesOpts>) {
    return Object.keys(config)
      .map((key) => {
        const module = config[key];
        return module.reduce((mCodes, current) => {
          mCodes.push(...current.codes);
          return mCodes;
        }, [] as string[]);
      })
      .reduce((codes, current) => {
        codes.push(...current);
        return codes;
      }, [] as string[]);
  }
}
