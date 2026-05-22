import { useTableColumns } from '@toy/business-components';
import { useDictionary } from '@/hooks-transfer/use-dict/index';
import {
  IDesignCommonBomResItem,
  IDesignCommonBomResItemCraftDemandInfoListItem
} from '@/modules/clothes-center/api/types';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { filters } from '@/core/plugins/filter';
import {
  CRAFTS_REQUIRE_LIST,
  DEMAND_CATEGORY_2_ENUM,
  DESIGN_MATERIAL_TYPE_ENUM,
  IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM,
  IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM_LIST2
} from '@/modules/design-center/develop-bom/constant';
import { YES_NO_ENUM } from '@/constant';

interface IProps {
  /** 二次工艺详情 */
  previewCraft: (item: IDesignCommonBomResItemCraftDemandInfoListItem) => void;
}

export const useListColumns = ({ previewCraft }:IProps) => {
  // 字典
  const {
    batchDictListMap,
  } = useDictionary([
    DICTIONARY_KEY.PLM_PURCHASE_YLBW,
  ]);
  const getUseParts = (row: IDesignCommonBomResItem) => {
    const usePartLists = [] as string[];
    const partUseArr = (row.partUse as string)?.split(',');
    partUseArr?.forEach((v1) => {
      batchDictListMap.value[DICTIONARY_KEY.PLM_PURCHASE_YLBW].forEach((v2) => {
        if (v2.valueCode === v1) {
          usePartLists.push(v2.value);
        }
      });
    });
    return usePartLists?.join(',');
  };

  const { columns } = useTableColumns<IDesignCommonBomResItem>(() => {
    return [
      {
        label: '物料项目',
        minWidth: '150',
        prop: 'prototypeMaterialName',
      },
      {
        label: '物料信息',
        minWidth: '150',
        render: (row) => {
          return (
            <>
              {row.demandType === DESIGN_MATERIAL_TYPE_ENUM.FABRIC && (
                <div>
                  <div>
                    <b>SPU：</b>
                    {row.commodityCode || '-'}
                  </div>
                  <div>
                    <b>SKU：</b>
                    {row.skuCode || '-'}
                  </div>
                  <div>
                    <b>货号：</b>
                    {row.commodityNumber || '-'}
                  </div>
                  {row.commodityType === DEMAND_CATEGORY_2_ENUM.PURE && (
                    <div>
                      <b>品名：</b>
                      {row.commodityName || '-'}
                    </div>
                  )}
                  {row.commodityType === DEMAND_CATEGORY_2_ENUM.FLOWER && (
                    <div>
                      <b>品类：</b>
                      {row.flowerCategory || '-'}
                    </div>
                  )}
                </div>
              )}
              {(row.demandType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST
                || row.demandType === DESIGN_MATERIAL_TYPE_ENUM.SPECIAL_ASSIST)
                && (
                  <div>
                    <div>
                      <b>SPU：</b>
                      {row.commodityCode || '-'}
                    </div>
                    <div>
                      <b>SKU：</b>
                      {row.skuCode || '-'}
                    </div>
                    <div>
                      <b>货号：</b>
                      {row.commodityNumber || '-'}
                    </div>
                    <div>
                      <b>品名：</b>
                      {row.commodityName || '-'}
                    </div>
                    {row.isPlanning === YES_NO_ENUM.YES && (
                      <div>
                        企划料
                        {row.bandDate ? `：${filters.formatTime(row.bandDate, 'YYYY年MM月')}` : ''}
                      </div>
                    )}
                  </div>
                )}
            </>
          );
        }
      },
      {
        label: '图片',
        align: 'center',
        width: '200',
        render(row) {
          return (
            <custom-image
              class='img-thumbnail__table'
              src={filters.ossUrl(row.matchPictureList?.[0])}
              preview-src-list={row.matchPictureList}
            />
          );
        },
      },
      {
        label: '物料属性',
        width: '120',
        render(row) {
          return (
            <>
              {row.demandType === DESIGN_MATERIAL_TYPE_ENUM.FABRIC && (
                <div>
                  <div>
                    <b>幅宽</b>
                    ：
                    {
                      row.widthConfirm ? `${row.widthConfirm}cm` : row.widthStrFormat
                    }
                  </div>
                  <div>
                    <b>克重</b>
                    ：
                    { row.weightStrFormat }
                  </div>
                  <div>
                    <b>颜色</b>
                    ：
                    { row.colorName}
                    { row.colorNumber ? `(${row.colorNumber})` : '' }
                  </div>
                </div>
              )}
              {(row.demandType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST
              || row.demandType === DESIGN_MATERIAL_TYPE_ENUM.SPECIAL_ASSIST)
              && (
                <>
                  {row.skuAttrs && JSON.parse(row.skuAttrs || '[]').map((attr: any) => (
                    <div>
                      <b>
                        { attr.attrName }
                        ：
                      </b>
                      { attr.attrValue }
                    </div>
                  ))}
                </>
              )}
            </>
          );
        }
      },
      {
        label: '成分/材质',
        align: 'center',
        minWidth: '110',
        render(row) {
          return (
            <div class='desc-lis'>
              {row.material && JSON.parse(row.material || '[]').map((item: any) => (
                <div key={item.name} class='tw-pb-5px'>
                  { item.name }
                  { item.percent }
                  %
                </div>
              ))}
            </div>
          );
        },
      },
      {
        label: '价格信息',
        minWidth: '140',
        render(row) {
          return (
            <div>
              {row.demandType === DESIGN_MATERIAL_TYPE_ENUM.FABRIC && (
                <>
                  <div>
                    足米价：
                    {row.bulkPurchasePrice}
                    /
                    {row.bulkPurchasePriceUnit}
                  </div>
                  <div>
                    空差：
                    {row.matchPurchaseGap}
                  </div>
                </>
              )}
              {row.demandType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST && (
                <div>
                  包装数量：
                  {row.packNumber}
                  {row.packAssistantUnitName}
                  /
                  { row.packUnitName }
                </div>
              )}
              {(row.demandType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST
              || row.demandType === DESIGN_MATERIAL_TYPE_ENUM.SPECIAL_ASSIST) && (
                <div>
                  大货进价：
                  {row.bulkPurchasePrice}
                  /
                  { row.bulkPurchasePriceUnit }
                </div>
              )}
            </div>
          );
        },
      },
      {
        label: '使用部位',
        minWidth: '140',
        render: (row) => {
          return (
            <>
              { getUseParts(row) }
            </>
          );
        }
      },
      {
        label: '裁剪方法/对色',
        minWidth: '140',
        prop: 'cuttingMethodName',
        render: (row) => {
          const str = row.colorMatchMaterialState === IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM.NONE ? (
            <span>
              { filters.getEnumLabel(
                IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM_LIST2,
                row.colorMatchMaterialState
              ) }
            </span>
          ) : (
            <span>
              { filters.getEnumLabel(
                IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM_LIST2,
                row.colorMatchMaterialState!
              ) }
              ：
              { row.colorMatchMaterialName || '-' }
            </span>
          );
          return (
            <>
              {row.demandType !== DESIGN_MATERIAL_TYPE_ENUM.SPECIAL_ASSIST
              && (<span>{row.cuttingMethodName}</span>)}
              {row.demandType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST
              && row.colorMatchMaterialState
                ? str : null}
            </>
          );
        }
      },
      {
        label: '二次工艺',
        minWidth: '90',
        render(row) {
          return (
            <div class='desc-lis'>
              {row.craftDemandInfoList?.length ? row.craftDemandInfoList.map((item: any) => (
                <el-tag
                  plain
                  style='margin: 5px 0 0; cursor: pointer'
                  onClick={() => previewCraft(item)}
                >
                  { item.category3 || item.category2 }
                  /
                  {
                    filters.getEnumLabel(CRAFTS_REQUIRE_LIST, item.craftsRequire)
                  }
                </el-tag>
              )) : <span>无工艺</span>}
            </div>
          );
        },
      },
      {
        label: '单件用量',
        minWidth: '120',
        render(row) {
          return (
            <p>
              {row.dosageAccount}
              {row.dosageAccountUnit}
            </p>
          );
        },
      },
      {
        label: '备注',
        minWidth: '120',
        render(row) {
          return (row.materialRemarkList && row.materialRemarkList.length
            ? <span>{row.materialRemarkList[0].remark}</span> : null);
        }
      },
    ];
  });
  return {
    tableColumns: columns
  };
};
