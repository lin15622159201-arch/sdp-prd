import { useTableColumns, ITableColumnsItem } from '@toy/business-components';
import { resizeImgByWidth } from '@/core/utils/helper';
import { QuestionFilled } from '@element-plus/icons-vue';
import NP from 'number-precision';
import {
  IEstimateCheckPriceDetailResMaterialCostInfoListItem
} from '@/modules/style-data-manage/estimate-pricing/api/types';
import {
  getMaterialTotalAmount,
  getMaterialWasteAmount,
  getMaterialWasteTotalAmount
} from '@/modules/style-data-manage/estimate-pricing/views/edit/hooks/calc-amount';
import { formatTime } from '@toy/utils';
import { COMMODITY_TYPE_ENUM } from '@/modules/design-center/inspiration-demand/constant';
import { Ref } from 'vue';

interface IProps {
  readOnly: Ref<boolean>;
  type: 'material' | 'accessories';
}
export const useMaterialCostTableColumns = (props: IProps) => {
  const { readOnly, type } = props;
  const { columns } = useTableColumns<IEstimateCheckPriceDetailResMaterialCostInfoListItem>(() => {
    // 公共头部
    const common: ITableColumnsItem<IEstimateCheckPriceDetailResMaterialCostInfoListItem>[] = [
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
    const materialList: ITableColumnsItem<IEstimateCheckPriceDetailResMaterialCostInfoListItem>[] = [
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
    const accessoriesList: ITableColumnsItem<IEstimateCheckPriceDetailResMaterialCostInfoListItem>[] = [
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
        renderHeader() {
          return (
            <div class='required'>预估用量</div>
          );
        },
        minWidth: '120',
        align: 'center',
        render(row, column, index) {
          return (
            <el-form-item
              prop={`${listProp}[${index}].dosageAccount`}
              rules={[{ required: true, message: '请输入', trigger: 'blur' }]}
              label-width='0'
              class='tw-mt-[18px]'
            >
              <input-number
                v-model={row.dosageAccount}
                disabled={readOnly.value}
                min={0}
                precision={2}
                v-slots={{
                  suffix: () => <span>{isAccessories ? row.minPriceUnit : row.saleUnit}</span>
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
              prop={`${listProp}[${index}].waste`}
              rules={[{ required: true, message: '请输入', trigger: 'blur' }]}
              label-width='0'
              class='tw-mt-[18px]'
            >
              <input-number
                disabled={readOnly.value}
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
        label: '含损用量',
        minWidth: '120',
        align: 'center',
        renderHeader: () => (
          <>
            含损用量
            <el-tooltip
              effect='dark'
              placement='top'
              content='含损用量=预估用量*（1+预估损耗率）'
              v-slots={{
                default: () => (
                  <el-icon><QuestionFilled /></el-icon>
                )
              }}
            />
          </>
        ),
        render(row) {
          return `${getMaterialWasteAmount(row)}${row.dosageAccountUnit || ''}`;
        },
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
                    元
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
                      {isAccessories ? row.minPriceUnit : row.saleUnit}
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
        minWidth: '120',
        align: 'center',
        prop: 'amount',
        renderHeader: () => (
          <>
            <span>金额</span>
            <el-tooltip
              effect='dark'
              placement='top'
              content='金额=预估用量*大货进价'
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
        label: '含损金额',
        minWidth: '120',
        align: 'center',
        renderHeader: () => (
          <>
            <span>含损金额</span>
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
    ];
  });
  return {
    tableColumns: columns
  };
};
