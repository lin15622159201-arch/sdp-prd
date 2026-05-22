import { useTableColumns } from '@toy/business-components';
import { QuestionFilled } from '@element-plus/icons-vue';
import { ICheckPriceDetailResCraftDemandCostInfoListItem } from '@/modules/style-data-manage/style-pricing/api/types';
import {
  getCraftTotalAmount,
  getCraftWasteAmount,
  getCraftWasteTotalAmount
} from '@/modules/style-data-manage/style-pricing/views/edit/hooks/calc-amount';
import { computed, Ref } from 'vue';
import { filters } from '@/core/plugins/filter';
import { QC_CRAFT_LIST } from '@/modules/clothes-center/constant';
import { IFormData } from './use-detail';
import { isEmpty } from '@toy/utils';
import NP from 'number-precision';

interface IProps {
  formData: Ref<IFormData>;
}

export const useCaraftTableColumns = (props: IProps) => {
  const { formData } = props;
  const BJQRJ = computed(() => false);
  // 物料 - 工艺关联的物料
  const materialList = computed(() => {
    return formData.value?.materialCostInfoList ?? [];
  });
  // 关联物料
  const getRelationMaterial = (bomMaterialId: string) => {
    return materialList.value?.find(v => v.bomMaterialId === bomMaterialId);
  };
  // 关联物料名称
  const getRelationMaterialName = (bomMaterialId: string) => {
    return getRelationMaterial(bomMaterialId)?.prototypeMaterialName ?? '';
  };
  const { columns } = useTableColumns<ICheckPriceDetailResCraftDemandCostInfoListItem>(() => {
    return [
      {
        type: 'selection',
        width: 40,
        selectable: row => row.inquiryState !== '1',
      },
      {
        label: '工艺名称',
        minWidth: '120',
        align: 'center',
        render(row) {
          return (
            <>
              <div>{row.category3 || row.category2}</div>
              <el-tag type={row.matchId ? 'primary' : 'warning'}>{row.matchId ? '已匹配' : '匹配中'}</el-tag>
            </>
          );
        },
      },
      {
        label: '工艺次序',
        minWidth: '120',
        align: 'center',
        render(row) {
          return (
            <>
              {row.craftsProcessName || filters.getEnumLabel(QC_CRAFT_LIST, row.craftsRequire || '')}
            </>
          );
        }
      },
      {
        label: '关联物料',
        minWidth: '120',
        align: 'center',
        // prop: 'prototypeMaterialName',
        render(row) {
          return (
            <>{ row.bomMaterialId ? getRelationMaterialName(row.bomMaterialId) : '' }</>
          );
        }
      },
      {
        label: '位置要求',
        minWidth: '120',
        align: 'center',
        prop: 'positionRequirement',
      },
      {
        label: '单件用量',
        minWidth: '150',
        align: 'center',
        render(row) {
          return `${row.craftDosageAccount || ''}${row.craftDosageAccountUnit || ''}`;
        },
      },
      {
        minWidth: '150',
        align: 'center',
        renderHeader: () => (
          <div class='required'>损耗</div>
        ),
        render(row, column, index) {
          return (
            <el-form-item
              prop={`craftDemandCostInfoList[${index}].waste`}
              rules={[{ required: true, message: '请输入', trigger: 'blur' }]}
              label-width='0'
              class='tw-mt-[18px]'
            >
              <input-number
                v-model={row.waste}
                precision={2}
                min={0}
                max={100}
                v-slots={{
                  suffix: () => '%'
                }}
              />
            </el-form-item>
          );
        },
      },
      {
        minWidth: '120',
        align: 'center',
        prop: 'wasteDosageAccount',
        renderHeader: () => (
          <>
            含损用量
            <el-tooltip
              effect='dark'
              placement='top'
              content='含损用量=单件用量*（1+损耗率）'
              v-slots={{
                default: () => (
                  <el-icon><QuestionFilled /></el-icon>
                )
              }}
            />
          </>
        ),
        render(row) {
          return `${getCraftWasteAmount(row)}${row.craftDosageAccountUnit || ''}`;
        },
      },
      {
        label: '大货进价',
        minWidth: '150',
        align: 'center',
        prop: 'unitConsumption',
        render: (row) => {
          return (
            <>
              {
                row.inquiryState === '1' && (
                  <el-tag type='warning'>询价中</el-tag>
                )
              }
              {
                (row.lastBulkPrice && row.samplePrice !== row.lastBulkPrice) && (
                  <span
                    class='tw-line-through text-color-orange tw-mr-10px tw-font-12px'
                  >
                    { row.lastBulkPrice }
                  </span>
                )
              }
              <p>
                {!isEmpty(row.samplePrice) ? (
                  <span class={['tw-mr-4px']}>{`${row.samplePrice || ''}元/${row.sampleUnit || ''}`}</span>
                ) : '-'}
              </p>
            </>
          );
        }
      },
      {
        label: '确认价',
        minWidth: '150',
        align: 'center',
        render(row, column, index) {
          return (
            // TODO 目前不支持编辑，先默认展示大货进价
            BJQRJ.value ? (
              <el-form-item
                prop={`materialList[${index}].samplePrice`}
                rules={[{ required: true, message: '请输入', trigger: 'blur' }]}
                label-width='0'
                className='tw-mt-[18px]'
              >
                <input-number
                  v-model={row.samplePrice}
                  precision={2}
                  min={0}
                  max={100}
                  v-slots={{
                    append: () => <span>{`元/${row.sampleUnit || ''}`}</span>
                  }}
                />
              </el-form-item>
            ) : (
              <>
                {!isEmpty(row.samplePrice) ? (
                  <span>{`${row.samplePrice || ''}元/${row.sampleUnit || ''}`}</span>
                ) : '-'}
              </>
            )
          );
        },
      },
      {
        minWidth: '150',
        align: 'center',
        renderHeader: () => (
          <>
            金额
            <el-tooltip
              effect='dark'
              placement='top'
              content='金额=单件用量*确认价'
              v-slots={{
                default: () => (
                  <el-icon><QuestionFilled /></el-icon>
                )
              }}
            />
          </>
        ),
        render(row) {
          const currentPrice = getCraftTotalAmount(row);
          const lastTotalAmount = row.lastTotalAmount ? NP.round(row.lastTotalAmount, 2) : '';
          const isDiff = lastTotalAmount && lastTotalAmount !== currentPrice;
          return (
            <>
              {isDiff && (
                <span
                  class='tw-line-through text-color-orange tw-mr-10px tw-font-12px'
                >
                  { lastTotalAmount }
                </span>
              )}
              <span>
                {currentPrice ? `${currentPrice}元` : ''}
              </span>
            </>
          );
        },
      },
      {
        minWidth: '120',
        align: 'center',
        renderHeader: () => (
          <>
            含损金额
            <el-tooltip
              effect='dark'
              placement='top'
              content='含损金额=单件用量*（1+损耗）*确认价'
              v-slots={{
                default: () => (
                  <el-icon><QuestionFilled /></el-icon>
                )
              }}
            />
          </>
        ),
        render: (row) => {
          const currentPrice = NP.round(getCraftWasteTotalAmount(row), 2);
          const lastSumOfMoney = row.lastSumOfMoney ? NP.round(row.lastSumOfMoney, 2) : '';
          const isDiff = lastSumOfMoney && lastSumOfMoney !== currentPrice;
          return (
            <>
              {isDiff && (
                <span
                  class='tw-line-through text-color-orange tw-mr-10px tw-font-12px'
                >
                  { lastSumOfMoney }
                </span>
              )}
              <span>
                {currentPrice ? `${currentPrice}元` : ''}
              </span>
            </>
          );
        }
      }
    ];
  });
  return {
    tableColumns: columns
  };
};
