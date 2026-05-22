import { useTableColumns } from '@toy/business-components';
import { useDictionary } from '@/hooks-transfer/use-dict';
import { computed } from 'vue';
import { IListItem } from '../../../types';
import { DICTIONARY_KEY } from '@/constant/dictionary';
/* 齐套单签收 表 */
export type Mode = 'opera' | 'view';
/**
 *
 * @param mode
 * opera 可操作
 * view 查看
 * @returns
 */

export const useColumns = () => {
  const { batchDictListMap } = useDictionary([DICTIONARY_KEY.PLM_PURCHASE_YLBW]);
  const plm_purchase_ylbw = computed(() => {
    return (batchDictListMap.value[DICTIONARY_KEY.PLM_PURCHASE_YLBW] || []).map(v => ({
      label: v.value,
      value: v.valueCode
    }));
  });
  const { columns } = useTableColumns<IListItem>(() => [
    {
      label: '序号',
      type: 'index',
      minWidth: 80,
    },
    {
      label: '采购单号',
      prop: 'purchaseOrderNo',
      width: 150,
    },
    {
      label: '物料项目',
      prop: 'materialCategory',
      width: 100,
    },
    {
      label: '物料id',
      prop: 'materialCode',
      width: 150,
    },
    {
      label: '物料名称',
      prop: 'materialName',
      width: 150,
    },
    {
      label: '颜色',
      prop: 'materialColor',
      width: 100,
    },
    {
      label: '幅宽',
      prop: 'widthStrFormat',
      width: 200,
    },
    {
      label: '图片',
      prop: 'matchPicture',
      type: 'image',
      // imageConfig: true,
      width: 105,
    },
    {
      label: '使用部位',
      prop: 'partUse',
      options: plm_purchase_ylbw.value,
      type: 'enum',
      width: 110,
    },
    {
      label: '二次工艺',
      minWidth: 100,
      render(row) {
        console.log(row.craftDemandInfo);

        return (
          <div class='desc-lis'>
            {row.craftDemandInfo.map(item => (
              <div key={item.category3} class='tw-py-15px'>
                {item.category3 || item.category2 || '-' }
              </div>
            ))}
          </div>
        );
      },
    },
    {
      label: '备注',
      prop: 'materialRemark',
    },
  ]);
  return {
    columns
  };
};
