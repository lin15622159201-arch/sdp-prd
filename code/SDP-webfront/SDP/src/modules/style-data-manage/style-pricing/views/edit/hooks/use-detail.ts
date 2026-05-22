import {
  checkPriceDetail, checkPriceInquiryPrice,
  checkPriceGetProcessOtherByStyleCode
} from '@/modules/style-data-manage/style-pricing/api';
import { ref } from 'vue';
import {
  ICheckPriceDetailRes,
  ICheckPriceDetailResMaterialCostInfoListItem,
  ICheckPriceDetailResProcessCostInfoListItem,
  ICheckPriceDetailResOtherCostInfoListItem
} from '@/modules/style-data-manage/style-pricing/api/types';
import { useRoute } from 'vue-router';
import NP, { times } from 'number-precision';
import { useDefaultItem } from './use-default-item';
import { ElMessage } from 'element-plus';
import {
  auditCraftOrderDetailByStyleCode,
  sewingProcessListByIds,
} from '@/modules/style-data-manage/large/api';
import {
  IAuditCraftOrderDetailByStyleCodeResSewRequireItem,
  ISewingProcessListByIdsResItem,
} from '@/modules/style-data-manage/large/api/types';
import {
  getProcessAmount,
  getProcessAmountItem,
} from '@/modules/style-data-manage/style-pricing/views/edit/hooks/calc-amount';

export interface IFormData extends ICheckPriceDetailRes {
  // 面料列表
  materialList: ICheckPriceDetailResMaterialCostInfoListItem[];
  // 辅料列表
  accessoriesList: ICheckPriceDetailResMaterialCostInfoListItem[];
  // 发单倍率
  orderSendingRate: string;
  // 小单倍率
  smallOrderRate: string;
}

export const useDetail = () => {
  const route = useRoute();
  const formData = ref<IFormData>({} as IFormData);
  const compareDetail = ref<IFormData>({} as IFormData); // 对比详情
  const { processCostInfoItem, otherCostInfoItem } = useDefaultItem();
  const modifyFlag = ref(true); // [加工费用]编辑状态, 默认可编辑
  const editProcessOtherFlag = ref(true); // 是否编辑工艺费用, 默认true
  // 默认数据--加工费用
  const defaultProcessCostList = [
    {
      ...processCostInfoItem,
      processStepCode: '03',
      processStepName: '专机/手工',
    },
    {
      ...processCostInfoItem,
      processStepCode: '02',
      processStepName: '车缝',
      minutelyPay: '0.35', // 分钟工资赋默认值
    },
  ];
  // 默认存的包装辅料（净单价=1.35）和物流费用（净单价=0.3）2条数据
  const defaultOtherCostList = [
    {
      ...otherCostInfoItem,
      costName: '包装辅料',
      price: '1.35',
      num: '1',
      unit: '2',
    },
  ];

  const getSewData = async () => {
    const { data } = await auditCraftOrderDetailByStyleCode({ styleCode: formData.value.styleCode! });
    const sewRequire = data?.sewRequire || [];

    if (!sewRequire.length) {
      // 没有车缝，则默认一条车缝
      formData.value.processCostInfoList.push({
        ...processCostInfoItem,
        processStepCode: '02',
        processStepName: '车缝',
        minutelyPay: '0.35', // 分钟工资赋默认值
      });
      return;
    }
    // eslint-disable-next-line vue/max-len
    const ids: any = sewRequire.map((item: IAuditCraftOrderDetailByStyleCodeResSewRequireItem) => item?.sewingProcessId).filter(Boolean);
    let idsDataInfo: ISewingProcessListByIdsResItem[] = [];

    if (ids.length) {
      const { data: idsData } = await sewingProcessListByIds({ sewingProcessIds: ids });
      idsDataInfo = idsData || [];
    }

    sewRequire.forEach((item) => {
      const { sewingProcessId, minutelyPay = '0.35', sewingType, sewingTypeName, processName } = item;
      const find = idsDataInfo.find(i => i.sewingProcessId === sewingProcessId);
      formData.value.processCostInfoList.push({
        ...processCostInfoItem,
        processStepCode: '02',
        processStepName: '车缝',
        minutelyPay,
        workingHour: find?.estimatedTime || '',
        sewingType: sewingType || '',
        sewingTypeDesc: sewingTypeName || '',
        processName: processName || '',
      });
    });
  };

  // 获取加工费用/其他费用数据
  const getProcessList = async (
    processCostInfoList: ICheckPriceDetailRes['processCostInfoList'] = [],
    otherCostInfoList: ICheckPriceDetailRes['otherCostInfoList'] = [],
    styleCode: string,
  ) => {
    const detailAimEnum = route.query.type as string || 'VISIT';
    const firstCheck = detailAimEnum === 'INIT_CHECK'; // 初次编辑
    const isDetail = detailAimEnum === 'VISIT'; // 初次编辑
    let orderSendingRate = '';
    let smallOrderRate = '';
    let processCostLists: ICheckPriceDetailResProcessCostInfoListItem[] = []; // 加工费用数据
    let otherCostInfoLists: ICheckPriceDetailResOtherCostInfoListItem[] = []; // 其他费用数据

    if (isDetail) {
      // 详情只获取展示接口数据内容
      processCostLists = processCostInfoList || [];
      otherCostInfoLists = otherCostInfoList || [];
      // 计算加工费用金额
      (processCostLists || []).forEach((item) => {
        const value = item.amount ? item.amount : getProcessAmount((item as any)) ?? '';
        item.amount = value ? NP.round(value, 2) : '';
      });
    } else {
      const { data } = await checkPriceGetProcessOtherByStyleCode({
        styleCode
      });
      // 处理加工费用数据
      if (data?.processCostInfoList?.length) {
        // 如果暂存数据有值，优先使用暂存数据
        processCostLists = data.processCostInfoList || [];
      } else if (firstCheck) {
        // 初次编辑时，如果详情数据有值，使用详情数据，否则使用默认数据
        processCostLists = processCostInfoList.length ? processCostInfoList : defaultProcessCostList;
      } else {
        // 非初次编辑且无暂存数据时，使用详情数据
        processCostLists = processCostInfoList || [];
      }

      // 处理其他费用数据
      if (data?.otherCostInfoList?.length) {
        // 如果暂存数据有值，优先使用暂存数据
        otherCostInfoLists = data.otherCostInfoList || [];
      } else if (firstCheck) {
        // 初次编辑时，如果详情数据有值，使用详情数据，否则使用默认数据
        otherCostInfoLists = otherCostInfoList.length ? otherCostInfoList : defaultOtherCostList;
      } else {
        // 非初次编辑且无暂存数据时，使用详情数据
        otherCostInfoLists = otherCostInfoList || [];
      }

      if ((otherCostInfoLists.length || processCostLists.length) && data?.state === '110') {
        // 若都没有数据，编辑状态为true
        modifyFlag.value = false;
        editProcessOtherFlag.value = false;
      }
      // 计算加工费用金额
      (processCostLists || []).forEach((item: any) => {
        // 优先处理金额
        const val = item.amount ? item.amount : getProcessAmount((item as any)) ?? '';
        item.amount = val ? NP.round(val, 2) : '';

        // 再根据金额动态计算工时和分钟工资
        const { prop, value } = getProcessAmountItem(item);
        if (prop) {
          item[prop] = value ? NP.round(value, 2) : '';
        }
      });
    }

    /**
     * 发单倍率和小单倍率
     * 20250317更新：无论待核价或已核价接口有值取接口，无值显示默认值
     */
    orderSendingRate = processCostLists[0]?.orderSendingRate || '2.3';
    smallOrderRate = processCostLists[0]?.smallOrderRate || '7.5';
    return {
      processCostList: processCostLists,
      otherCostList: otherCostInfoLists,
      orderSendingRate,
      smallOrderRate
    };
  };

  /**
   * 面辅料价格过期，自动询价
   * @param materialList
   */
  const autoInquiry = async (materialList: ICheckPriceDetailResMaterialCostInfoListItem[]) => {
    // 过期并且不在询价中的面辅料
    const inquiryExpiryList = materialList.filter((item) => {
      return Date.now() > new Date(item.validityEndTime || 0).getTime() && item.inquiryState !== '1';
    });
    if (inquiryExpiryList.length === 0) {
      return;
    }

    await checkPriceInquiryPrice({
      checkPriceId: formData.value.checkPriceId!,
      bomId: formData.value.bomId!,
      bomMaterialIdList: inquiryExpiryList.map(item => item.bomMaterialId),
      craftDemandIdList: [],
      checkType: '0',
    });
    // 发起后，更新询价状态
    inquiryExpiryList.forEach((item) => {
      item.inquiryState = '1';
    });
  };

  const getDetail = async (checkPriceId: string) => {
    const detailAimEnum = route.query.type as string || 'VISIT';
    const firstCheck = detailAimEnum === 'INIT_CHECK'; // 初次编辑

    const { data } = await checkPriceDetail({
      checkPriceId, // 核价单id
      detailAimEnum, // 获取详情目的
    });

    //  从加工费里面吧发单倍率拿出来
    const { materialCostInfoList, processCostInfoList, otherCostInfoList, craftDemandCostInfoList, styleCode } = data;
    // 判断 物料 - 核算用量、损耗 ，有空值则提示先去 核算用量 操作
    const isNotCheckDosage = materialCostInfoList.some(item => !item.waste || !item.dosageAccount);
    if (isNotCheckDosage) {
      ElMessage.warning('请到用量核算维护“用量/损耗”再核价');
    }

    const getWaste = (value: string | '', defaultValue: string, isCheck: boolean = false) => {
      // 20250317更新：增加判断不校验为第一次核价情况
      if (isCheck) {
        return `${times(value || defaultValue, 100)}`;
      }
      // 第一次核价需判断是否加默认值
      // eslint-disable-next-line no-nested-ternary
      return firstCheck ? `${times(value || defaultValue, 100)}` : (value ? `${times(value, 100)}` : '');
    };

    // 自动带出大货进价，单位为中台最小单位
    materialCostInfoList.forEach((item) => {
      item.price = item.bulkPrice || '';
      item.unit = item.bulkPurchasePriceUnit || '';
    });

    const processMaterialList = ({
      list,
      smallOrderWasteDefaultValue,
      wasteDefaultValue
    } : {
      list: ICheckPriceDetailRes['materialCostInfoList'];
      smallOrderWasteDefaultValue: string;
      wasteDefaultValue: string;
    }) => {
      return list.map(item => ({
        ...item,
        attritionRate: item.attritionRate ? `${times(item.attritionRate, 100)}` : '',
        smallOrderWaste: getWaste(item.smallOrderWaste || '', smallOrderWasteDefaultValue, true), // 小单损耗
        waste: getWaste(item.waste || '', wasteDefaultValue, true), // 损耗
      }));
    };
    const materialList = processMaterialList({
      list: materialCostInfoList.filter(item => item.bomMaterialType === '1'),
      smallOrderWasteDefaultValue: '0.3',
      wasteDefaultValue: '0.1',
    });
    const accessoriesList = processMaterialList({
      list: materialCostInfoList.filter(item => ['2', '3', '4'].includes(item.bomMaterialType!)),
      smallOrderWasteDefaultValue: '0.3',
      wasteDefaultValue: '0.1',
    });
    const processedCraftDemandList = craftDemandCostInfoList.map(v => ({
      ...v,
      waste: `${v.waste ? times(v.waste, 100) : ''}`,
    }));

    // 处理加工费用和其他费用数据
    const {
      orderSendingRate, smallOrderRate,
      processCostList, otherCostList
    } = await getProcessList(processCostInfoList, otherCostInfoList, styleCode!);

    return {
      ...data,
      profit: getWaste(data.profit || '', '0.1'), // 毛利率
      taxationRatio: getWaste(data.taxationRatio || '', '0.08'), // 加成点，
      otherCostInfoList: otherCostList, // 物流其他费用
      processCostInfoList: processCostList, // 加工费用
      craftDemandCostInfoList: processedCraftDemandList,
      materialList,
      accessoriesList,
      orderSendingRate,
      smallOrderRate,
    };
  };

  return {
    formData,
    compareDetail,
    autoInquiry,
    modifyFlag,
    editProcessOtherFlag,
    getDetail
  };
};
