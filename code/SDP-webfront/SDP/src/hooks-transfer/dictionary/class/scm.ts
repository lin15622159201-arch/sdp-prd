import { Dictionary } from '@/hooks-transfer/dictionary/core/base';
import type { Ref } from 'vue';
import { computed, ref } from 'vue';
import ScmFormat from '../format/scm-format';
import type * as Types from '@/hooks-transfer/dictionary/types';
import { fixTreeLayer } from '@/hooks-transfer/dictionary/format';

/* scm-商品管理 */
export class ScmDict extends Dictionary implements Types.DictIns {
  response: Types.scmDictRes;

  nodeMap: Ref<Types.NodeMapScm>;

  format: ScmFormat;

  mapCodes: ScmFormat['mapCodes'];

  mapLabels: ScmFormat['mapLabels'];

  static instance = {} as ScmDict;

  constructor(system: Types.System) {
    super(system);
    this.instance = this;
    this.response = [];
    this.nodeMap = ref<Types.NodeMapScm>({});
    this.format = new ScmFormat({
      cutting: '-',
      nodeMap: this.nodeMap,
    });
    this.mapCodes = this.format.mapCodes.bind(this.format);
    this.mapLabels = this.format.mapLabels.bind(this.format);

    // if (ScmDict.instance instanceof ScmDict) return ScmDict.instance;
    ScmDict.instance = this;
  }

  acceptResponse(info: Types.RequestSendInfo): void {
    const {
      params,
      response,
    } = info;
    const [code] = params;
    this.sycnDictsToStore(response as Types.scmDictRes, code as Types.ICategoryListReq_);
    this.sycnDictsToMap(response as Types.scmDictRes, code as Types.ICategoryListReq_);
  }

  /* 商品库-商品类目，格式兼容ops */
  FixFormatToOps(data: Types.scmDictRes) {
    return data.map((item) => {
      const { label: value = '', value: valueCode = '' } = item;
      if (item.children && item.children.length) {
        item.children = this.FixFormatToOps(item.children);
      } else {
        delete item.children;
      }
      return {
        ...item,
        value, // 中文值
        valueCode, // code
      };
    });
  }

  /**
   * 服务端数据 同步 store
   * @param response
   * @returns
   */
  private sycnDictsToStore(response: Types.scmDictRes = [], type: Types.ICategoryListReq_) {
    this.store?.put(
      type,
      response,
    );
  }

  /**
   * 服务端数据 同步 字典集合
   * @param response
   * @param nodeMap
   * @returns
   */
  private sycnDictsToMap(
    response: Types.scmDictRes = [],
    code: Types.ICategoryListReq_,
  ) {
    this.nodeMap.value[code] = this.FixFormatToOps(response);
    return this.nodeMap;
  }

  /**
   * store数据 同步 字典集合
   * @param dictCodes
   * @param nodeMap
   * @returns
   */
  private sycnStoreToMap(
    code: Types.ICategoryListReq_,
  ) {
    const response_ = this.store?.get(code) as Types.scmDictRes;
    this.nodeMap.value[code] = this.FixFormatToOps(response_);
    return this.nodeMap;
  }

  /* 申请更新字典 */
  async needUpdateDicts(code: Types.ICategoryListReq_) {
    this.request.add({
      params: [code],
      type: 'SCM',
    });
  }

  /**
   * 获取 商品库 辅料 、工艺 级联选项
   * @param type
   * @returns
   */
  getCascader(codeOpt: Types.CasacaderOptScm_) {
    const {
      code,
      maxLayer,
    } = codeOpt;

    /* 是否存在store */
    const isStoreHas = this.store?.every([code]);

    const renderNode = () => {
      const node = this.nodeMap.value[code] || [];
      const tree = maxLayer ? fixTreeLayer<Types.ICategoryListItem_>(node, maxLayer) : node;
      return tree;
    };

    /* 本地复用 */
    if (isStoreHas) {
      this.sycnStoreToMap(code);
      return computed(renderNode);
    }

    /* 远程更新 map */
    this.needUpdateDicts(code);
    return computed(renderNode);
  }
}

export const scmDict = new ScmDict('SCM');
