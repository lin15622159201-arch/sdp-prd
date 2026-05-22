import { useTableColumns } from '@toy/business-components';
import { IDetail } from '../../../types';
import { COMMODITY_TYPE_ENUM } from '@/modules/design-center/inspiration-demand/constant';
import { divide } from 'number-precision';
import { Ref } from 'vue';
import { filters } from '@/core/plugins/filter';
import { MATERIAL_DEMAND_TYPE_ENUM } from '@/modules/style-data-manage/dosage-account/constant';

interface IProps {
  readOnly: Ref<boolean>;
}

/** 面辅料表格 */
export const useFabricAccessory = (props: IProps) => {
  const { readOnly } = props;
  const dosageConversionHandler = (row: IDetail['normalMaterialList'][0]) => {
    if ([
      MATERIAL_DEMAND_TYPE_ENUM.ACCESSORY,
    ].includes(row.demandType!)) {
      return row.dosageAccount;
    }
    const curDosageAccount = parseFloat(row.dosageAccount!);
    return Number.isNaN(curDosageAccount) ? '' : divide(curDosageAccount, 100).toFixed(2).replace(/[.]?0+$/, '');
  };
  const { columns: fabricAccessoryColumns } = useTableColumns<IDetail['normalMaterialList'][0]>(() => [
    {
      label: '物料项目',
      prop: 'prototypeMaterialName'
    },
    {
      label: '物料信息',
      render(row) {
        return (
          <div>
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
      },
    },
    {
      label: '图片',
      render(row) {
        return (
          <custom-image
            src={filters.ossUrl(row.matchPictureList?.[0])}
            preview-src-list={row.matchPictureList}
            class='tw-w-80px tw-h-80px'
          />
        );
      },
    },
    {
      label: '物料属性',
      render(row) {
        return (
          <div>
            {row.demandType === MATERIAL_DEMAND_TYPE_ENUM.FABRIC ? (
              <>
                <div>
                  幅宽：
                  {row.widthStrFormat}
                </div>
                <div>
                  克重：
                  {row.weightStrFormat}
                </div>
                <div>
                  颜色：
                  {row.colorName}
                  {`(${row.colorNumber})`}
                </div>
              </>
            ) : (
              <>
                {row.skuAttrsFormat.map(v => (
                  <div key={v.attrId}>
                    {v.attrName}
                    ：
                    {v.attrValue}
                  </div>
                ))}
              </>
            )}
          </div>
        );
      },
    },
    {
      label: '成分/材质',
      render(row) {
        return (
          <div>
            {row.materialFormat.map(v => (
              <div>
                {v.name}
                ：
                {v.percent}
                %
              </div>
            ))}
          </div>
        );
      },
    },
    {
      label: '使用部位',
      prop: 'partUseName'
    },
    {
      renderHeader() {
        return (
          <div class='required'>幅宽</div>
        );
      },
      render(row, _, index) {
        return (
          <>
            {row.demandType === MATERIAL_DEMAND_TYPE_ENUM.FABRIC ? (
              <el-form-item
                prop={`normalMaterialList[${index}].widthConfirm`}
                rules={{
                  required: true,
                  message: ''
                }}
              >
                <input-number
                  disabled={readOnly.value}
                  v-model={row.widthConfirm}
                  min={0.01}
                  max={999.99}
                  precision={2}
                  v-slots={{
                    suffix: () => 'CM'
                  }}
                />
              </el-form-item>
            ) : '-'}
          </>
        );
      },
    },
    {
      renderHeader() {
        return (
          <div class='required'>核算用量</div>
        );
      },
      render(row, _, index) {
        return (
          <el-form-item
            prop={`normalMaterialList[${index}].dosageAccount`}
            rules={{
              required: true,
              message: ''
            }}
          >
            <input-number
              v-model={row.dosageAccount}
              min={0.01}
              max={999.99}
              precision={2}
              disabled={readOnly.value}
              v-slots={{
                suffix: () => {
                  return row.demandType === MATERIAL_DEMAND_TYPE_ENUM.FABRIC
                    ? 'CM' : row.dosageAccountUnit;
                }
              }}
            />
          </el-form-item>
        );
      },
    },
    {
      label: '单件用量',
      render(row) {
        return `${dosageConversionHandler(row)}${row.dosageAccountUnit}`;
      }
    },
    {
      renderHeader() {
        return (
          <div class='required'>损耗</div>
        );
      },
      render(row, _, index) {
        return (
          <el-form-item
            prop={`normalMaterialList[${index}].attritionRate`}
            rules={{
              required: true,
              message: ''
            }}
          >
            <input-number
              v-model={row.attritionRate}
              disabled={readOnly.value}
              min={0}
              max={100}
              precision={2}
              v-slots={{
                suffix: () => '%'
              }}
            />
          </el-form-item>
        );
      },
    },
  ]);
  return {
    fabricAccessoryColumns
  };
};
