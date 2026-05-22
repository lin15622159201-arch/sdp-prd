import { checkPriceInquiryPrice } from '@/modules/style-data-manage/style-pricing/api';
import { estimateCheckPriceDetail } from '@/modules/style-data-manage/estimate-pricing/api';
import { ref } from 'vue';
import {
  IEstimateCheckPriceDetailRes,
  IEstimateCheckPriceDetailResMaterialCostInfoListItem
} from '@/modules/style-data-manage/estimate-pricing/api/types';
import { useRoute } from 'vue-router';
import { times } from 'number-precision';
import { getAccessoriesList, getMaterialList } from './calc-amount';

export interface IFormData extends IEstimateCheckPriceDetailRes {
  // 面料列表
  materialList: IEstimateCheckPriceDetailResMaterialCostInfoListItem[];
  // 辅料列表
  accessoriesList: IEstimateCheckPriceDetailResMaterialCostInfoListItem[];
}

export const useDetail = () => {
  const route = useRoute();
  const formData = ref<IFormData>({} as IFormData);

  /**
   * 面辅料价格过期，自动询价
   * @param materialList
   */
  const autoInquiry = async (materialList: IEstimateCheckPriceDetailResMaterialCostInfoListItem[]) => {
    // 过期并且不在询价中的面辅料
    const inquiryExpiryList = materialList.filter((item) => {
      return Date.now() > new Date(item.validityEndTime || 0).getTime() && item.inquiryState !== '1';
    });
    if (inquiryExpiryList.length === 0) {
      return;
    }

    await checkPriceInquiryPrice({
      checkPriceId: formData.value.estimateCheckPriceId!,
      bomId: formData.value.bomId!,
      bomMaterialIdList: inquiryExpiryList.map(item => item.bomMaterialId!),
      craftDemandIdList: [],
      checkType: '0',
    });
    // 发起后，更新询价状态
    inquiryExpiryList.forEach((item) => {
      item.inquiryState = '1';
    });
  };

  const getDetail = async () => {
    const detailAimEnum = route.query.type as string || 'VISIT';
    const firstCheck = detailAimEnum === 'INIT_CHECK'; // 初次编辑
    const { data } = await estimateCheckPriceDetail({
      // 核价单id
      estimateCheckPriceId: route.params.id as string,
      // 获取详情目的
      detailAimEnum,
    });
    //  从加工费里面吧发单倍率拿出来
    const { materialCostInfoList } = data;
    // 自动带出大货进价，单位为中台最小单位
    materialCostInfoList.forEach((item) => {
      item.price = item.bulkPrice || '';
      item.unit = item.bomMaterialType === '1' ? (item.saleUnit || '') : (item.minPriceUnit || '');
    });
    const materialList = getMaterialList(materialCostInfoList);
    const accessoriesList = getAccessoriesList(materialCostInfoList);
    const craftDemandCostInfoList = data.craftDemandCostInfoList.map(v => ({
      ...v,
      craftDosageAccount: v.craftDosageAccount ?? '1', // 预估用量，默认值1
      waste: `${v.waste ? times(v.waste, 100) : ''}`,
    }));
    let profit = ''; // 毛利率
    let taxationRatio = '';// 加成点
    let otherCost = '';
    // 第一次核价需判断是否加默认值
    if (firstCheck) {
      profit = data.profit ? `${times(data.profit, 100)}` : '10'; // 默认值10%
      taxationRatio = data.taxationRatio ? `${times(data.taxationRatio, 100)}` : '8'; // 默认值8%
      otherCost = data.otherCost && Number(data.otherCost) > 0 ? data.otherCost : '1.35'; // 预估物流其他费用,默认值1.35
    } else {
      profit = data.profit ? `${times(data.profit, 100)}` : '';
      taxationRatio = data.taxationRatio ? `${times(data.taxationRatio, 100)}` : '';
      otherCost = data.otherCost || '';
    }
    formData.value = {
      ...data,
      otherCost, // 预估物流其他费用
      materialList,
      accessoriesList,
      craftDemandCostInfoList,
      profit, // 毛利率
      taxationRatio, // 加成点，
    };
    // 详情接口已经做了处理了，所以不需要自动询价
    // autoInquiry(materialCostInfoList);
  };

  getDetail();

  return {
    formData,
  };
};
