import { useTableColumns } from '@toy/business-components';
import { QuestionFilled } from '@element-plus/icons-vue';
import {
  IEstimateCheckPriceDetailResCraftDemandCostInfoListItem
} from '@/modules/style-data-manage/estimate-pricing/api/types';
import {
  getCraftTotalAmount,
  getCraftWasteAmount,
  getCraftWasteTotalAmount
} from '@/modules/style-data-manage/estimate-pricing/views/edit/hooks/calc-amount';
import { computed, Ref } from 'vue';
import { isEmpty } from '@toy/utils';
import { filters } from '@/core/plugins/filter';
import { QC_CRAFT_LIST } from '@/modules/clothes-center/constant';
import { IFormData } from './use-detail';
import NP from 'number-precision';

interface IProps {
  readOnly: Ref<boolean>;
  formData: Ref<IFormData>;
}
export const useCaraftTableColumns = (props: IProps) => {
  const { readOnly, formData } = props;
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
  const { columns } = useTableColumns<IEstimateCheckPriceDetailResCraftDemandCostInfoListItem>(() => {
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
              <div>
                {row.category3 || row.category2}
              </div>
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
        label: '使用部位',
        minWidth: '120',
        align: 'center',
        prop: 'positionRequirement',
      },
      {
        renderHeader() {
          return (
            <div class='required'>预估用量</div>
          );
        },
        minWidth: '150',
        align: 'center',
        render(row, column, index) {
          return (
            <el-form-item
              prop={`craftDemandCostInfoList[${index}].craftDosageAccount`}
              rules={[{ required: true, message: '请输入', trigger: 'blur' }]}
              label-width='0'
              class='tw-mt-[18px]'
            >
              <input-number
                v-model={row.craftDosageAccount}
                disabled={readOnly.value}
                min={0}
                precision={2}
                v-slots={{
                  suffix: () => row.sampleUnit || ''
                }}
              />
            </el-form-item>
          );
        },
      },
      {
        renderHeader() {
          return (
            <div class='required'>预估损耗</div>
          );
        },
        minWidth: '150',
        align: 'center',
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
                disabled={readOnly.value}
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
              content='含损用量=预估用量*（1+损耗率）'
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
                    元
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
        renderHeader() {
          return (
            <div class='required'>确认价</div>
          );
        },
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
                  disabled={readOnly.value}
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
              content='金额=预估用量*确认价'
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
                  { row.lastTotalAmount }
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
              content='含损金额=预估用量*（1+预估损耗）*确认价'
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
                  { row.lastSumOfMoney }
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
