import { ComputedRef, Reactive } from 'vue';
import { useList } from '@toy/v-use';
import { BILLTYPE_ENUM } from '@/modules/finance-manage/constant';
import {
  financeBillPage,
  financeBillDigitalCuttingPage,
  financeBillThreeDCuttingPage,
  financeBillAccessoriesPage,
} from '../../../api';
import {
  IFinanceBillFabricCuttingPageReq,
  IFinanceBillDigitalCuttingPageReq,
  IFinanceBillThreeDCuttingPageReq,
  IFinanceBillAccessoriesPageReq,
  IFinanceBillSubmitVerifyBillReqAbnormalBill
} from '../../../api/types';

interface IProps {
  billType: ComputedRef<BILLTYPE_ENUM | ''>;
  billId: ComputedRef<string>;
  abnormalDataMap?: Reactive<IFinanceBillSubmitVerifyBillReqAbnormalBill>;
}
export const useBillDetail = ({ billType, billId, abnormalDataMap }: IProps) => {
  const initParams = (type?: BILLTYPE_ENUM) => {
    // 面料剪版
    const fabricCuttingParams: IFinanceBillFabricCuttingPageReq = {
      billId: '',
      designerName: '',
      designerCode: '',
      skcCode: '',
      purchaseOrderNo: '',
      spuCode: '',
      abnormalFlag: 'all',
      handleAbnormal: '',
      diffAmountOrderBy: '1',
      pageNum: 1,
      pageSize: 20,
    };
    // 数码描稿
    const digitalParams: IFinanceBillDigitalCuttingPageReq = {
      billId: '',
      skcCode: '',
      spuCode: '',
      platform: '',
      designerName: '',
      designerCode: '',
      orderCode: '',
      abnormalFlag: 'all',
      diffAmountOrderBy: '1',
      handleAbnormal: '',
      pageNum: 1,
      pageSize: 20,
    };
    // 3D剪版
    const threeDParams: IFinanceBillThreeDCuttingPageReq = {
      billId: '',
      skcCode: '',
      platform: '',
      designerName: '',
      designerCode: '',
      orderCode: '',
      spuCode: '',
      commodityCode: '',
      abnormalFlag: 'all',
      handleAbnormal: '',
      diffAmountOrderBy: '1',
      pageNum: 1,
      pageSize: 20,
    };
    const accessoriesParams: IFinanceBillAccessoriesPageReq = {
      billId: '',
      purchaseOrderNo: '',
      orderCode: '',
      skcCode: '',
      platform: '',
      designerName: '',
      designerCode: '',
      abnormalFlag: 'all',
      handleAbnormal: '',
      spuCode: '',
      diffAmountOrderBy: '1',
      pageNum: 1,
      pageSize: 20,
    };

    if (type) {
      if ([BILLTYPE_ENUM.FABRIC_CUTTING_ORDER].includes(type)) {
        return fabricCuttingParams;
      }
      if ([BILLTYPE_ENUM.DIGITAL_SKETCH_ORDER].includes(type)) {
        return digitalParams;
      }
      if ([BILLTYPE_ENUM.THREE_DIMENSIONAL_CUTTING_ORDER].includes(type)) {
        return threeDParams;
      }
      if ([BILLTYPE_ENUM.ACCESSORIES_ORDER].includes(type)) {
        return accessoriesParams;
      }
    }
    return {
      ...fabricCuttingParams,
      ...digitalParams,
      ...threeDParams,
      ...accessoriesParams
    };
  };

  const formatList = (list: any[]) => {
    list.forEach((item) => {
      if (abnormalDataMap) {
        item.abnormalFlag = item.detailId in abnormalDataMap ? 1 : item.abnormalFlag;
        // eslint-disable-next-line vue/max-len
        item.abnormalReason = item.detailId in abnormalDataMap ? (abnormalDataMap[item.detailId] || '') : item.abnormalReason;
      }
    });
  };

  const {
    params,
    tableTotal,
    tableData,
    handleSearch,
    handleReset,
    handleSizeChange,
    handleCurrentChange,
  } = useList({
    request: {
      resetApi: () => {
        const apiType: any = {
          FABRIC_CUTTING_ORDER: financeBillPage,
          THREE_DIMENSIONAL_CUTTING_ORDER: financeBillThreeDCuttingPage,
          ACCESSORIES_ORDER: financeBillAccessoriesPage,
          DIGITAL_SKETCH_ORDER: financeBillDigitalCuttingPage,
        };
        return apiType[billType.value];
      },
      params: initParams(),
      handleParams(originParams) {
        // 过滤不同接口入参
        // eslint-disable-next-line vue/max-len
        const targetParams: any = billType.value ? Object.fromEntries(Object.keys(initParams(billType.value)).map((i) => {
          return [i, originParams[i as keyof typeof originParams]];
        })) as unknown as typeof originParams : initParams();
        targetParams.abnormalFlag = targetParams.abnormalFlag === 'all' ? '' : targetParams.abnormalFlag;
        targetParams.billId = billId.value;
        return targetParams;
      },
    },
    response: {
      handleResponseData(list) {
        formatList(list);
        return list;
      },
    }
  });

  return {
    params,
    tableTotal,
    tableData,
    handleSearch,
    handleReset,
    handleSizeChange,
    handleCurrentChange,
    initParams,
  };
};
