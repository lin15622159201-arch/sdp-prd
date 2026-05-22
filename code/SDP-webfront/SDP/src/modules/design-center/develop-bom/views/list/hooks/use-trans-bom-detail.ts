import { opsDict } from '@/hooks-transfer/dictionary';
import { IBomBatchPrintRes } from '../../../api/types';
import { DESIGN_MATERIAL_TYPE_ENUM } from '../../../constant';
import { IPrintDataItem } from '../types';
import { DICTIONARY_KEY } from '@/constant/dictionary';

interface DefaultKeys {
  material?: string;
  skuAttrs?: string;
  partUse?: string;
  demandType?: DESIGN_MATERIAL_TYPE_ENUM;
}
interface ReturnKeys {
  material: {
    name: string;
    percent: string;
  }[];
  skuAttrs: {
    attrId: string;
    attrName: string;
    attrValue: string;
  }[];
  partUse: string[];
}
function useTransBomDetail() {
  // 处理bom详情数据
  function handleBomJson<T extends DefaultKeys>(list: T[]): Array<T & ReturnKeys> {
    return list.map((it) => {
      let material: IPrintDataItem['bomOrderMaterialList'][0]['material'] = [];
      let skuAttrs: IPrintDataItem['bomOrderMaterialList'][0]['skuAttrs'] = [];
      let partUse: IPrintDataItem['bomOrderMaterialList'][0]['partUse'] = [];
      try {
        if (it.material) {
          material = JSON.parse(it.material as string);
        }
        // 当为辅料时，处理物料属性json
        if (
          (
            it.demandType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST
            || it.demandType === DESIGN_MATERIAL_TYPE_ENUM.SPECIAL_ASSIST)
          && it.skuAttrs
        ) {
          skuAttrs = JSON.parse(it.skuAttrs as string);
        }
        // 处理使用部位
        if (it.partUse) {
          if (Array.isArray(it.partUse)) {
            // partUse = it.partUse.join(',');
          } else {
            partUse = it.partUse.split(',');
          }
        }
      } catch (e) {
        console.log('e', e);
      }
      return {
        ...it,
        material,
        skuAttrs,
        partUse,
      };
    });
  }

  // 根据字典码数组获取相对的字典描述字符串
  const getLabelsByCodes = (codes: string[] = []) => {
    const labels = opsDict.mapLabels({
      codes,
      dictCode: DICTIONARY_KEY.PLM_PURCHASE_YLBW,
      cutting: ',',
    });
    console.log('labels', labels, opsDict, codes);

    return labels;
  };
  return {
    handleBomJson,
    getLabelsByCodes,
  };
}

export { useTransBomDetail };
