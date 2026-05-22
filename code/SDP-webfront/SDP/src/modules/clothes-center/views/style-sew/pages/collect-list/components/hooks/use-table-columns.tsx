import { useTableColumns } from '@toy/business-components';
import { useDictionary } from '@/hooks-transfer/use-dict/index';
import { IMaterialSignMaterialListResItem } from '../../api/types';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { resizeImgByWidth } from '@/core/utils/helper';
import { computed } from 'vue';

export const useListColumns = () => {
  const { batchDictListMap } = useDictionary([DICTIONARY_KEY.PLM_PURCHASE_YLBW]);
  const plm_purchase_ylbw = computed(() => {
    return (batchDictListMap.value[DICTIONARY_KEY.PLM_PURCHASE_YLBW] || []).map(v => ({
      label: v.value,
      value: v.valueCode
    }));
  });
  const { columns } = useTableColumns<IMaterialSignMaterialListResItem>(() => {
    return [
      {
        label: '序号',
        type: 'index',
        fixed: 'left',
      },
      {
        label: '采购单号',
        prop: 'purchaseOrderNo',
        width: 150,
        fixed: 'left',
      },
      {
        label: '物料项目',
        prop: 'materialCategory',
        width: 100,
        fixed: 'left',
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
        render(row) {
          return (
            <>
              <p>{ row.materialColorNo }</p>
              <p>{ row.materialColor }</p>
            </>
          );
        }
      },
      {
        label: '幅宽',
        prop: 'widthStrFormat',
        width: 200,
      },
      {
        label: '图片',
        align: 'center',
        minWidth: '120',
        render(row) {
          const spuShelvePictureList = (row.shelvePicture?.spuShelvePictureList || []);
          const skcShelvePictureList = (row.shelvePicture?.skcShelvePictureList || []);
          const matchPictureList = row.matchPicture ? row.matchPicture?.split(',') : [];
          const images = [...skcShelvePictureList, ...spuShelvePictureList, ...matchPictureList];
          return (
            <custom-image
              src={resizeImgByWidth(images?.[0] || '', 192)}
              class='img-thumbnail__table'
              fit='cover'
              preview-src-list={images}
              preview-teleported
            />
          );
        },
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
        prop: 'craftDemandInfo',
        width: 100,
        render(row) {
          return (
            <div class='desc-lis'>
              {row.craftDemandInfo ? JSON.parse(row.craftDemandInfo || '[]').map((item: any) => (
                <div key={item.category3} class='tw-py-15px'>
                  {item.category3 || item.category2 || '-' }
                </div>
              )) : <span>无工艺</span>}
            </div>
          );
        },
      },
      {
        label: '备注',
        prop: 'materialRemark',
      },
    ];
  });
  return {
    tableColumns: columns
  };
};
