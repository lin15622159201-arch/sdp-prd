import { useTableColumns } from '@toy/business-components';
import { filters } from '@/core/plugins/filter';
import {
  IFinanceBillFabricCuttingPageResListItem,
  IFinanceBillDigitalCuttingPageResListItem,
  IFinanceBillThreeDCuttingPageResListItem,
  IFinanceBillAccessoriesPageResListItem
} from '../../../../api/types';
import { computed, ComputedRef } from 'vue';
import {
  DIGITAL_DRAFT_TASK_STATUS_LIST,
  FABRIC_CUTTING_TASK_STATUS_LIST,
  THREED_TASK_STATUS_LIST,
  ACCESSORIES_TASK_STATUS_LIST,
  EDITION_TYPE_ENUM,
  EDITION_TYPE_LIST
} from '@/modules/material-schedule/digital-draft-task/constant';
import { CUTTING_TYPE_LIST, BILLTYPE_ENUM } from '@/modules/finance-manage/constant';

interface IPrams {
  billType: ComputedRef<BILLTYPE_ENUM>;
}

// 对账单明细表格
export const useDetailListColumns = ({ billType }: IPrams) => {
  // 剪版
  const { columns: fabricCuttingColumns } = useTableColumns<IFinanceBillFabricCuttingPageResListItem>(() => {
    return [
      {
        label: '采购需求单号',
        minWidth: '120',
        prop: 'purchaseOrderNo',
      },
      {
        label: 'SKC',
        minWidth: '120',
        prop: 'skcCode',
      },
      {
        label: '平台',
        minWidth: '120',
        prop: 'platform',
      },
      {
        label: '剪版单号',
        minWidth: '120',
        prop: 'cuttingOrderCode',
      },
      {
        label: '物料SPU',
        minWidth: '120',
        prop: 'spuCode',
      },
      {
        label: '物料名称',
        minWidth: '140',
        prop: 'materialsName',
      },
      {
        label: '物料色号',
        minWidth: '120',
        prop: 'colorNumber',
      },
      {
        label: '物料单位',
        minWidth: '120',
        prop: 'unit',
      },
      {
        label: '设计师',
        minWidth: '120',
        prop: 'designerName',
      },
      {
        label: '剪版类型',
        minWidth: '120',
        render(row) {
          return (
            <>
              {filters.getEnumLabel(CUTTING_TYPE_LIST, row.cuttingWay!)}
            </>
          );
        }
      },
      {
        label: '散剪价',
        minWidth: '120',
        prop: 'scatteredCuttingAmount',
      },
      {
        label: '需求数量',
        minWidth: '120',
        prop: 'demandQuantity',
      },
      {
        label: '实际采购数量',
        minWidth: '120',
        prop: 'actualQuantity',
      },
      {
        label: '剪版费用',
        minWidth: '120',
        prop: 'purchaserAmount',
      },
      {
        label: '差异金额',
        minWidth: '120',
        prop: 'diffAmount',
      },
      {
        label: '采购完成时间',
        minWidth: '120',
        render(row) {
          return (
            <>
              {filters.formatTime(row.finishTime)}
            </>
          );
        }
      },
      {
        label: '剪版单状态',
        minWidth: '120',
        render(row) {
          return (
            <span>{ filters.getEnumLabel(FABRIC_CUTTING_TASK_STATUS_LIST, row.orderStatus!) }</span>
          );
        }
      },
    ];
  });
  // 描稿
  const { columns: digitalColumns } = useTableColumns<IFinanceBillDigitalCuttingPageResListItem>(() => {
    return [
      {
        label: '描稿任务编号',
        minWidth: '120',
        prop: 'orderCode',
      },
      {
        label: 'SKC',
        minWidth: '120',
        prop: 'skcCode',
      },
      {
        label: '平台',
        minWidth: '120',
        prop: 'platform',
      },
      {
        label: '描稿类型',
        minWidth: '120',
        prop: 'orderTypeName',
      },
      {
        label: '描稿版次',
        minWidth: '140',
        render(row) {
          return (
            <el-tag
              type={row.orderBatch === EDITION_TYPE_ENUM.HEAD
                ? 'danger' : 'success'}
            >
              {filters.getEnumLabel(EDITION_TYPE_LIST, row.orderBatch!)}
            </el-tag>
          );
        }
      },
      {
        label: '花型编号',
        minWidth: '120',
        prop: 'patternNumber',
      },
      {
        label: '设计师',
        minWidth: '120',
        prop: 'designerName',
      },
      {
        label: '供应商名称',
        minWidth: '120',
        prop: 'supplierName',
      },
      {
        label: '结算金额',
        minWidth: '120',
        prop: 'settlementPrice',
      },
      {
        label: '差异金额',
        minWidth: '120',
        prop: 'diffAmount',
      },
      {
        label: '描稿完成时间',
        minWidth: '120',
        render(row) {
          return (
            <span>{ filters.formatTime(row.finishTime) }</span>
          );
        }
      },
      {
        label: '任务状态',
        minWidth: '120',
        render(row) {
          return (
            <span>{ filters.getEnumLabel(DIGITAL_DRAFT_TASK_STATUS_LIST, row.orderStatus!) }</span>
          );
        }
      },
    ];
  });
  // 3d
  const { columns: threeDColumns } = useTableColumns<IFinanceBillThreeDCuttingPageResListItem>(() => {
    return [
      {
        label: '3D任务编号',
        minWidth: '120',
        prop: 'orderCode',
      },
      {
        label: 'SKC',
        minWidth: '120',
        prop: 'skcCode',
      },
      {
        label: '平台',
        minWidth: '120',
        prop: 'platform',
      },
      {
        label: '物料SPU',
        minWidth: '120',
        prop: 'commodityCode',
      },
      {
        label: '物料名称',
        minWidth: '140',
        prop: 'materialsName',
      },
      {
        label: '物料色号',
        minWidth: '120',
        prop: 'colorNumber',
      },
      {
        label: '单位',
        minWidth: '120',
        prop: 'unit',
      },
      {
        label: '设计师',
        minWidth: '120',
        prop: 'designerName',
      },
      {
        label: '剪版单号',
        minWidth: '120',
        prop: 'purchaseOrderNo',
      },
      {
        label: '散剪价',
        minWidth: '120',
        prop: 'scatteredCuttingAmount',
      },
      {
        label: '需求数量',
        minWidth: '120',
        prop: 'demandQuantity',
      },
      {
        label: '实际采购数量',
        minWidth: '120',
        prop: 'actualQuantity',
      },
      {
        label: '剪版费用',
        minWidth: '120',
        prop: 'purchaserAmount',
      },
      {
        label: '差异金额',
        minWidth: '120',
        prop: 'diffAmount',
      },
      {
        label: '采购完成时间',
        minWidth: '120',
        render(row) {
          return (
            <span>{ filters.formatTime(row.finishTime) }</span>
          );
        }
      },
      {
        label: '3D任务状态',
        minWidth: '120',
        render(row) {
          return (
            <span>{ filters.getEnumLabel(THREED_TASK_STATUS_LIST, row.orderStatus!) }</span>
          );
        }
      },
    ];
  });
  // 辅料
  const { columns: accessoriesColumns } = useTableColumns<IFinanceBillAccessoriesPageResListItem>(() => {
    return [
      {
        label: '采购需求单号',
        minWidth: '120',
        prop: 'purchaseOrderNo',
      },
      {
        label: 'SKC',
        minWidth: '120',
        prop: 'skcCode',
      },
      {
        label: '平台',
        minWidth: '120',
        prop: 'platform',
      },
      {
        label: '设计师',
        minWidth: '120',
        prop: 'designerName',
      },
      {
        label: '配版单号',
        minWidth: '120',
        prop: 'orderCode',
      },
      {
        label: '配版类型',
        minWidth: '140',
        prop: 'matchPlateModeName',
      },
      {
        label: '齐套单号',
        minWidth: '120',
        prop: 'materialOrderCode',
      },
      {
        label: '物料SPU',
        minWidth: '120',
        prop: 'spuCode',
      },
      {
        label: '物料色号',
        minWidth: '120',
        prop: 'colorNumber',
      },
      {
        label: '辅料类目',
        minWidth: '120',
        prop: 'commodityCategory',
      },
      {
        label: '需求数量',
        minWidth: '120',
        prop: 'matchPlateNum',
      },
      {
        label: '单位',
        minWidth: '120',
        prop: 'matchPlateUnit',
      },
      {
        label: '单价',
        minWidth: '120',
        prop: 'salePrice',
      },
      {
        label: '采购金额',
        minWidth: '120',
        prop: 'purchasePrice',
      },
      {
        label: '补贴金额',
        minWidth: '120',
        prop: 'allowanceAmount',
      },
      {
        label: '实际采购金额',
        minWidth: '120',
        prop: 'actualPurchasePrice',
      },
      {
        label: '差异金额',
        minWidth: '120',
        prop: 'diffAmount',
      },
      {
        label: '齐套日期',
        minWidth: '120',
        render(row) {
          return (
            <>
              {filters.formatTime(row.materialOrderFinishTime)}
            </>
          );
        }
      },
      {
        label: '齐套状态',
        minWidth: '120',
        render(row) {
          return (
            <span>{ filters.getEnumLabel(ACCESSORIES_TASK_STATUS_LIST, row.materialOrderStatus!) }</span>
          );
        }
      },
    ];
  });
  const columns = computed(() => {
    const typeObj: any = {
      [BILLTYPE_ENUM.FABRIC_CUTTING_ORDER]: fabricCuttingColumns.value,
      [BILLTYPE_ENUM.DIGITAL_SKETCH_ORDER]: digitalColumns.value,
      [BILLTYPE_ENUM.THREE_DIMENSIONAL_CUTTING_ORDER]: threeDColumns.value,
      [BILLTYPE_ENUM.ACCESSORIES_ORDER]: accessoriesColumns.value,
    };
    return billType.value ? typeObj[billType.value] : [];
  });
  return {
    tableColumns: columns
  };
};
