import { Dictionary } from '@/hooks-transfer/dictionary/core/base';
import type { Ref } from 'vue';
import { ref } from 'vue';
import type * as Types from '@/hooks-transfer/dictionary/types';

/* BAS-基础资料 */
export class BasDict extends Dictionary implements Types.DictIns {
  /* 基础资料数据 */
  basicData: Ref<Types.BasicData>;

  static instance = {} as BasDict;

  constructor(system: Types.System) {
    super(system);
    this.basicData = ref({});

    // if (BasDict.instance instanceof BasDict) return BasDict.instance;
    BasDict.instance = this;
  }

  // acceptResponse() {
  //   this;
  // }

  // getDefautDicts() {
  //   this;
  // }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sycnStoreToMap(dictCodes_: Types.basicCodes[]) {
    // dictCodes_;
    // this;
  }

  /* 申请更新字典 */
  needUpdateDicts(dictCodes_: Types.basicCodes[]) {
    this.request.add({
      params: dictCodes_,
      type: 'BAS',
    });
  }

  getDicts(dictCodes: Types.basicCodes[]) {
    const dictCodes_ = dictCodes.filter(Boolean);
    /* 是否存在store */
    const isStoreHas = this.store?.every(dictCodes_);

    /* 本地复用 */
    if (isStoreHas) {
      isStoreHas && this.sycnStoreToMap(dictCodes_);
      return this.basicData;
    }

    /* 远程更新 map */
    this.needUpdateDicts(dictCodes_);
    return this.basicData;
  }
}

export const basDict = new BasDict('BAS');
