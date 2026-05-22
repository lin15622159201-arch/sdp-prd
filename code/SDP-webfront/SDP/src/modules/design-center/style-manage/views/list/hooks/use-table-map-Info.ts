import { IListItem } from '../types';
import {
  IPrototypeManageClothesPriceProductRes,
  postWebV1PrototypeManagePageApiResListResItem
} from '../../../api/types';
import { remarksBatchList } from '../../../api';


/* 根据设计款号 填充备注、样衣开发、核价 */
export function useTableMapInfo() {
  const format = async (list: postWebV1PrototypeManagePageApiResListResItem[]): Promise<IListItem[]> => {
    const designCodes = list?.map(item => item.prototypeId || '').filter(Boolean) as string[] ?? [];
    if (!designCodes.length) return [];
    const designData: IPrototypeManageClothesPriceProductRes = [];
    let remarkData: any = {};
    try {
      ({ data: remarkData } = await remarksBatchList({
        bizIds: designCodes,
      }));
    } catch (error) {
      console.log('查询备注错误', error);
    }
    // try {
    //   ({ data: designData } = await postDesignPriceProduceInfoApi({
    //     designCodeList: designCodes,
    //   }));
    // } catch (error) {
    //   console.log('查询核价、样衣信息出错', error);
    // }
    return list.map((item) => {
      const prototypeId = item.prototypeId!;
      const remark = remarkData[prototypeId];
      const designInfo = designData.find(v => v.prototypeId === prototypeId);
      // 添加打版类型数量统计
      // const objectMap: { [key: string]: number; } = Object.create(null);
      const sampleInfos = designInfo?.sampleInfos || [];
      const sampleList: IListItem['sampleInfos'] = [];
      const priceOrderInfo = designInfo?.priceOrderInfo as IListItem['priceOrderInfo'];
      sampleInfos?.reverse().forEach((info, index) => {
        // const index = objectMap[info.sampleType] || 0;
        info.nodeStateList.forEach((v) => {
          sampleList.push({
            processCode: info.processCode,
            sampleType: info.sampleType,
            isDone: info.isDone,
            isCancel: info.isCancel,
            feSameSampleTypeCount: index,
            processNodeDesc: v.processNodeDesc!,
            processNodeStateDesc: v.processNodeStateDesc!,
          });
        });
        // objectMap[info.sampleType] = index + 1;
      });
      sampleList?.reverse();
      return {
        ...item,
        remark: remark || [],
        sampleInfos: sampleList,
        priceOrderInfo
      };
    });
  };
  return {
    format
  };
}
