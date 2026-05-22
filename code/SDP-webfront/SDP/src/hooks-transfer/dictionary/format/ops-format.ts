import { ref, computed } from 'vue';
import type { IdictValuesItem as dictOpt } from '@/api/dict/types';
import type * as Types from '@/hooks-transfer/dictionary/types';
import { fixTreeLayer } from './index';
import { cloneDeep } from 'lodash-es';

export default class OpsFormat {
  batchDictListMap: Types.OptOps['batchDictListMap']; // ops 字典服务

  cutting: string;

  constructor(options: Types.OptOps) {
    const {
      cutting = '-',
      batchDictListMap = ref({}),
    } = options;
    this.batchDictListMap = batchDictListMap;
    this.cutting = cutting;
  }

  /**
 * 字典集合(ops): 根据 names 映射 codes
 * @param { string | string[] } labels 类目名称 'name1-name2-name3' or  [name1,name2,name3]
 * @param { string } dictCode 字典code
 * @param batchDictListMap 指定 字典集合
 * @param isCascader 选择项存在级联关系
 * @returns { string }
 */
  public mapCodes(options: Types.MapByOpsParams): string {
    return this.mapping(options, 'toCodes');
  }

  /**
     * 字典集合(ops): 根据 codes 映射 names
     * @param { string | string[] } codes 类目名称 'code1-code2-code3' or  [name1,name2,name3]
     * @param { string } dictCode 字典code
     * @param batchDictListMap 指定 字典集合
     * @param isCascader 选择项存在级联关系
     * @returns { string }
     */
  public mapLabels(options: Types.MapByOpsParams): string {
    return this.mapping(options, 'toLabels');
  }

  /* 映射 label <=> code */
  mapping(options: Types.MapByOpsParams, mode: 'toCodes' | 'toLabels') {
    let {
      labels = '',
      codes = '',
    } = options;
    const {
      dictCode = '',
      batchDictListMap = this.batchDictListMap,
      isCascader = false,
      cutting = this.cutting,
    } = options;

    if (typeof labels === 'string') labels = labels.split(cutting) || [];
    if (typeof codes === 'string') codes = codes.split(cutting) || [];

    const opts = batchDictListMap?.value?.[dictCode] || [];
    const state = {
      currentCode: '', // 上级 code (ops字典 默认根节点 valueParentCode: "")
    };
    const arr = mode === 'toCodes' ? labels : codes;
    const matchKey = mode === 'toCodes' ? 'value' : 'valueCode';
    const outputKey = mode === 'toCodes' ? 'valueCode' : 'value';
    return arr.map((str: string) => {
      const opt = opts.find((n: dictOpt) => {
        if (isCascader) {
          return n.valueParentCode === state.currentCode && n[matchKey] === str;
        }
        return n[matchKey] === str;
      });
      if (!opt) return '';
      state.currentCode = opt.valueCode;
      return opt[outputKey] || '';
    }).join(cutting);
  }

  static commaMapHandle(tree: Types.IdictValuesItemNode[]) {
    return tree.map((node: Types.IdictValuesItemNode) => {
      const nodes = (node?.children?.[0]?.value?.split(',') || []).filter(Boolean);
      node.children = nodes.map((value: string) => {
        return { value, valueCode: value } as Types.IdictValuesItemNode;
      });
      return node;
    });
  }

  /**
   * 转换为 tree 格式
   * @param batchDictListMap 字典集合
   * @param code 字典编码code
   * @param comma 是否处理 value 逗号拼接
   * @returns
   */
  static conversion(option: Types.conversionOption) {
    const {
      batchDictListMap,
      code,
      comma = false,
      maxLayer,
    } = option;
    return computed(() => {
      let tree = OpsFormat.arrayToTree(batchDictListMap.value[code] || [], 'valueCode', 'valueParentCode');
      if (comma) tree = OpsFormat.commaMapHandle(tree);
      if (maxLayer) tree = fixTreeLayer<Types.IdictValuesItemNode>(tree, maxLayer);
      return tree;
    });
  }

  static arrayToTree(arr: Types.dictItem[], idKey: keyof Types.dictItem, pidKey: keyof Types.dictItem) {
    const arr_ = cloneDeep(arr);
    // 存放结果集
    const result = [];
    const nodeMap = {} as Types.NodeMapOps;

    // eslint-disable-next-line no-restricted-syntax
    for (const node of arr_) {
      const id = node[idKey] as string;
      let pid = node[pidKey] as string;
      if (pid === '') pid = 'root'; // 后端 = ''

      if (!nodeMap[id]) nodeMap[id] = node;
      const mapKeys = Object.keys(nodeMap[id]);
      if (mapKeys.includes('children') && mapKeys.length === 1) {
        nodeMap[id] = {
          ...node,
          ...nodeMap[id],
        };
      }
      if (pid === 'root') {
        result.push(nodeMap[id]);
      } else {
        if (!nodeMap[pid]) {
          nodeMap[pid] = {
            children: [] as Types.IdictValuesItemNode[],
          } as Types.IdictValuesItemNode;
        }
        if (!nodeMap[pid].children) nodeMap[pid].children = [];
        nodeMap[pid].children!.push(nodeMap[id]);
      }
    }
    return result;
  }
}
