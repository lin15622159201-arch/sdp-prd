import { useTableColumns, ITableColumnsItem } from '@toy/business-components';
import { resizeImgByWidth } from '@/core/utils/helper';
import { QuestionFilled } from '@element-plus/icons-vue';
import {
  ICheckPriceDetailResMaterialCostInfoListItem,
  ICheckPriceDetailResEstimateCheckPriceDetailVoMaterialCostInfoListItem
} from '@/modules/style-data-manage/style-pricing/api/types';
import { formatTime } from '@toy/utils';
import {
  getMaterialFragmentPrice,
  getMaterialSmallWasteAmount,
  getMaterialSmallWasteTotalAmount,
  getMaterialTotalAmount,
  getMaterialWasteAmount,
  getMaterialWasteTotalAmount
} from '@/modules/style-data-manage/style-pricing/views/edit/hooks/calc-amount';
import { computed, ComputedRef } from 'vue';
import { COMMODITY_TYPE_ENUM } from '@/modules/design-center/inspiration-demand/constant';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import NP from 'number-precision';
import { IFormData } from './use-detail';
import {
  getMaterialWasteAmount as getEsMaterialWasteAmount
} from '@/modules/style-data-manage/estimate-pricing/views/edit/hooks/calc-amount';

export const useMaterialCostTableColumns = (type: 'material' | 'accessories', formData: ComputedRef<IFormData>) => {
  const BJQRJ = computed(() => false);
  const { getDictionaryOptions } = useDictionary();
  // 处理面料/辅料列表【含损用量】展示预估核价的含损用量信息
  const getEstimateDosageAccount = (row: ICheckPriceDetailResMaterialCostInfoListItem) => {
    const { materialCostInfoList = [] } = formData.value?.estimateCheckPriceDetailVo || {};
    if (materialCostInfoList.length) {
      // eslint-disable-next-line vue/max-len
      const dosageAccount: any = materialCostInfoList.find((item: ICheckPriceDetailResEstimateCheckPriceDetailVoMaterialCostInfoListItem) => item.prototypeMaterialName === row.prototypeMaterialName && item.commodityCode === row.commodityCode) || {};
      const unit = dosageAccount.bomMaterialType === '1' ? dosageAccount.saleUnit : dosageAccount.minPriceUnit;
      // 物料项目+SPU一致则展示
      return dosageAccount ? `${getEsMaterialWasteAmount(dosageAccount, false)}${unit || ''}` : '';
    }
    return '';
  };
  // [面料费用]小单率
  const materiaSmallOrderRate = computed(() => {
    const rate = getDictionaryOptions(DICTIONARY_KEY.SMALL_ORDER_RATIO);
    const rateItem = rate.find(item => item.value === '01');
    // eslint-disable-next-line vue/max-len
    return rateItem && rateItem.children ? rateItem.children[0].label : '1';
  });
  // [辅料费用]小单率
  const accessoriesSmallOrderRate = computed(() => {
    const rate = getDictionaryOptions(DICTIONARY_KEY.SMALL_ORDER_RATIO);
    const rateItem = rate.find(item => item.value === '02');
    // eslint-disable-next-line vue/max-len
    return rateItem && rateItem.children ? rateItem.children[0].label : '1';
  });
  const { columns } = useTableColumns<ICheckPriceDetailResMaterialCostInfoListItem>(() => {
    // 公共头部
    const common: ITableColumnsItem<ICheckPriceDetailResMaterialCostInfoListItem>[] = [
      {
        type: 'selection',
        width: 40,
        selectable: row => row.inquiryState !== '1',
      },
      {
        label: '物料项目',
        minWidth: '120',
        align: 'center',
        prop: 'prototypeMaterialName',
      },
      {
        label: '物料信息',
        minWidth: '200',
        align: 'center',
        render: (row) => {
          return (
            <div class='tw-word-wrap-all'>
              <div>
                SPU：
                {row.commodityCode}
              </div>
              <div>
                SKU：
                {row.skuCode}
              </div>
              <div>
                货号：
                {row.commodityNumber}
              </div>
              {[
                COMMODITY_TYPE_ENUM.PURE,
                COMMODITY_TYPE_ENUM.SPECIAL_ACCESSORIES
              ].includes(row.commodityType!) && (
                <div>
                  品名：
                  {row.commodityName}
                </div>
              )}
              {row.commodityType === COMMODITY_TYPE_ENUM.FLOWER && (
                <div>
                  品类：
                  {row.flowerCategory}
                </div>
              )}
            </div>
          );
        }
      },
      {
        label: '图片',
        align: 'center',
        width: '200',
        render(row) {
          return (
            <el-image
              src={resizeImgByWidth((row.matchPictureList || [])[0] || '', 192)}
              style={{ width: '96px', height: '96px' }}
              fit='cover'
              preview-src-list={row.matchPictureList}
              preview-teleported
            />
          );
        },
      },
    ];
    // 面料专属列表
    const materialList: ITableColumnsItem<ICheckPriceDetailResMaterialCostInfoListItem>[] = [
      {
        label: '面料类型',
        minWidth: '120',
        align: 'center',
        render(row) {
          const [, category1, category2] = row.categoryName?.split('[-]') || [];
          return (
            <div>
              <div>{category1}</div>
              <div>{category2}</div>
            </div>
          );
        },
      },
      {
        label: '物料属性',
        minWidth: '120',
        render: (row) => {
          return (
            <>
              <p>{ `幅宽：${row.widthStrFormat || ''}` }</p>
              <p>{ `克重：${row.weightStrFormat || ''}` }</p>
              <p>{ `颜色：${row.colorName || ''}${row.colorNumber}` }</p>
            </>
          );
        }
      },
    ];

    // 辅料专属列表
    const accessoriesList: ITableColumnsItem<ICheckPriceDetailResMaterialCostInfoListItem>[] = [
      {
        label: '物料属性',
        minWidth: '120',
        align: 'center',
        render: (row) => {
          const skuAttrList = JSON.parse(row.skuAttrs || '[]');
          return (
            <>
              {(skuAttrList || []).map((attr: any) => (
                <p>
                  <b>
                    { attr.attrName }
                    ：
                  </b>
                  { attr.attrValue }
                </p>
              ))}
            </>
          );
        }
      },
    ];
    const isAccessories = type === 'accessories';
    const listProp = isAccessories ? 'accessoriesList' : 'materialList';
    const radio = isAccessories ? accessoriesSmallOrderRate.value : materiaSmallOrderRate.value;
    return [
      ...common,
      ...(isAccessories ? accessoriesList : materialList),
      {
        label: '使用部位',
        minWidth: '120',
        align: 'center',
        prop: 'partUseName',
      },
      {
        label: '单件用量',
        minWidth: '150',
        align: 'center',
        render(row) {
          return `${row.dosageAccount || ''}${row.dosageAccountUnit || ''}`;
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
              prop={`${listProp}[${index}].waste`}
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
          const esValue = getEstimateDosageAccount(row);
          return (
            <>
              <p>{`${getMaterialWasteAmount(row)}${row.dosageAccountUnit || ''}`}</p>
              {esValue && (
                <p>
                  预估：
                  {esValue}
                </p>
              )}
            </>
          );
        },
      },
      {
        minWidth: '150',
        align: 'center',
        renderHeader: () => (
          <div class='required'>小单损耗</div>
        ),
        render(row, column, index) {
          return (
            <el-form-item
              prop={`${listProp}[${index}].smallOrderWaste`}
              rules={[{ required: true, message: '请输入', trigger: 'blur' }]}
              label-width='0'
              class='tw-mt-[18px]'
            >
              <input-number
                v-model={row.smallOrderWaste}
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
        renderHeader: () => (
          <>
            小单含损用量
            <el-tooltip
              effect='dark'
              placement='top'
              content='小单含损用量=单件用量*（1+小单损耗率）'
              v-slots={{
                default: () => (
                  <el-icon><QuestionFilled /></el-icon>
                )
              }}
            />
          </>
        ),
        render(row) {
          return `${getMaterialSmallWasteAmount(row)}${row.dosageAccountUnit || ''}`;
        },
      },
      {
        minWidth: '150',
        align: 'center',
        renderHeader: () => (
          <>
            散剪价
            <el-tooltip
              effect='dark'
              placement='top'
              content='散剪价=大货进价*倍率'
              v-slots={{
                default: () => (
                  <el-icon><QuestionFilled /></el-icon>
                )
              }}
            />
          </>
        ),
        render: (row) => {
          return `${getMaterialFragmentPrice(row, radio)}元/${row.dosageAccountUnit || ''}`;
        }
      },
      {
        label: '',
        minWidth: '150',
        align: 'center',
        prop: 'unitConsumption',
        renderHeader: () => (
          <>
            <p>大货进价</p>
            <p>有效期</p>
          </>
        ),
        render: (row) => {
          return (
            <>
              <div>
                {
                  row.inquiryState === '1' && (
                    <el-tag type='warning'>询价中</el-tag>
                  )
                }
              </div>
              {
                (row.lastBulkPrice && row.bulkPrice !== row.lastBulkPrice) && (
                  <span
                    class='tw-line-through text-color-orange tw-mr-10px tw-font-12px'
                  >
                    { row.lastBulkPrice }
                  </span>
                )
              }
              {
                row.bulkPrice && (
                  <>
                    <span class={['tw-mr-4px']}>
                      {row.bulkPrice}
                      元
                      /
                      {row.bulkPurchasePriceUnit}
                    </span>
                    {
                      row.validityEndTime && (
                        <div
                          class={
                            Date.now() > new Date(row.validityEndTime || 0).getTime()
                              ? 'text-color-red' : 'text-color-green'
                          }
                        >
                          { formatTime(row.validityEndTime) }
                        </div>
                      )
                    }
                  </>
                )
              }
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
            BJQRJ.value ? (
              <el-form-item
                prop={`${listProp}[${index}].price`}
                rules={[{ required: true, message: '请输入', trigger: 'blur' }]}
                label-width='0'
                className='tw-mt-[18px]'
              >
                <input-number
                  v-model={row.price}
                  precision={2}
                  min={0}
                  max={100}
                  v-slots={{
                    append: () => <span>{`元/${row.unit || ''}`}</span>
                  }}
                />
              </el-form-item>
            ) : (
              <span>{`${row.price || ''}元/${row.unit || ''}`}</span>
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
          const currentPrice = getMaterialTotalAmount(row);
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
          const currentPrice = NP.round(getMaterialWasteTotalAmount(row), 2);
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
      },
      {
        minWidth: '120',
        align: 'center',
        renderHeader: () => (
          <>
            小单含损金额
            <el-tooltip
              effect='dark'
              placement='top'
              content='小单含损金额=单件用量*（1+小单损耗）*大货进价*倍率'
              v-slots={{
                default: () => (
                  <el-icon><QuestionFilled /></el-icon>
                )
              }}
            />
          </>
        ),
        render: (row) => {
          const currentPrice = NP.round(getMaterialSmallWasteTotalAmount(row, radio), 2);
          // eslint-disable-next-line vue/max-len
          const lastSmallOrderSumOfMoney = row.lastSmallOrderSumOfMoney ? NP.round(row.lastSmallOrderSumOfMoney, 2) : '';
          const isDiff = lastSmallOrderSumOfMoney && lastSmallOrderSumOfMoney !== currentPrice;
          return (
            <>
              {isDiff && (
                <span
                  class='tw-line-through text-color-orange tw-mr-10px tw-font-12px'
                >
                  { lastSmallOrderSumOfMoney }
                </span>
              )}
              <span>
                {currentPrice ? `${currentPrice}元` : ''}
              </span>
            </>
          );
        }
      },
    ];
  });
  return {
    tableColumns: columns,
    materiaSmallOrderRate,
    accessoriesSmallOrderRate
  };
};
