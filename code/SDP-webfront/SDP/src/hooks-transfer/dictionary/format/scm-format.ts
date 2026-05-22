import type { Ref } from 'vue';
import { ref } from 'vue';
import type * as Types from '@/hooks-transfer/dictionary/types';

export default class ScmFormat {
  nodeMap: Ref<Types.NodeMapScm>; // Product服务响应级联数据

  cutting: string;

  constructor(options: Types.OptScm) {
    const {
      cutting = '-',
      nodeMap = ref<Types.NodeMapScm>({}),
    } = options;
    this.nodeMap = nodeMap;
    this.cutting = cutting;
  }

  /**
 * Product服务响应级联数据: 根据 names 映射 codes
 * @param labels { string | string[] } labels 类目名称 'name1-name2-name3' or  [name1,name2,name3]
 * @param nodeMap  指定 Product 商品库接口返回tree级联数据
 * @param isCascader 选择项存在级联关系
 */
  public mapCodes(option: Types.mapByProductParams): string {
    return this.mapping(option, 'toCodes');
  }

  /**
 * Product服务响应级联数据: 根据 codes 映射 names
 * @param codes { string | string[] } 类目code 'code1-code2-code3' or  [code1,code2,code3]
 * @param nodeMap  指定 Product 商品库接口返回tree级联数据
 * @param isCascader 选择项存在级联关系
 */
  public mapLabels(option: Types.mapByProductParams): string {
    return this.mapping(option, 'toLabels');
  }

  /* 映射 label <=> code */
  public mapping(option: Types.mapByProductParams, mode: 'toCodes' | 'toLabels') {
    let {
      labels = '',
      codes = '',
    } = option;
    const {
      dictCode,
      nodeMap = this.nodeMap,
      isCascader = true,
      cutting = this.cutting,
    } = option;

    if (typeof labels === 'string') labels = labels.split(cutting) || [];
    if (typeof codes === 'string') codes = codes.split(cutting) || [];
    const nodes = nodeMap?.value?.[dictCode] || [];
    const state = {
      currentCode: '0', // 上级 code (Product服务 默认根节点 parent: "0")
    };
    const arr = mode === 'toCodes' ? labels : codes;
    const matchKey = mode === 'toCodes' ? 'value' : 'valueCode';
    const outputKey = mode === 'toCodes' ? 'valueCode' : 'value';
    return arr.map((str: string) => {
      const item = this.findTree(
        str,
        nodes,
        state,
        isCascader,
        matchKey,
      );
      if (!item) return '';
      state.currentCode = item.valueCode;
      return item[outputKey] || '';
    }).join(cutting);
  }

  private findTree(
    str: string, // label or code
    nodes: Types.scmDictRes,
    state: { currentCode: string; },
    isCascader: boolean,
    matchKey: 'value' | 'valueCode',
  ): null | Types.ICategoryListItem_ {
    let target = null;
    for (let i = 0; i < nodes.length; i++) {
      const it = nodes[i];
      let isSelect = false;

      if (isCascader) {
        isSelect = it && it.parent === state.currentCode && it[matchKey] === str;
      } else {
        isSelect = it && it[matchKey] === str;
      }

      if (isSelect) {
        target = it;
        break;
      }

      if (it && it?.children?.length) {
        const res = this.findTree(str, it.children, state, isCascader, matchKey);
        if (res) {
          target = res;
          break;
        }
      }
    }
    return target;
  }
}
