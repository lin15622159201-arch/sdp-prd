import { useTableColumns, ITableColumnsItem } from '@toy/business-components';
import { computed, Ref } from 'vue';
import {
  IV1SewRes,
  IV1SewResSewSizeInfoListItem,
} from '../../api/types';

interface IProps {
  detailData: Ref<IV1SewRes>;
  sizeInfoList: Ref<IV1SewRes['sewSizeInfoList']>;
}

export const useListColumns = ({ detailData, sizeInfoList }: IProps) => {
  const clos = computed(() => {
    const firstList = sizeInfoList.value ? sizeInfoList.value[0]?.clothesTrimSizeList : [];
    if (firstList.length) {
      /* 根据首行 clothesTrimSizeList 生成 列 */
      const clo = firstList.map((clothes, i: number) => {
        return {
          label: `样衣 ${clothes.clothesName} 实测尺寸`,
          prop: `${i}`,
        };
      });
      sizeInfoList.value?.forEach((row) => {
        const { clothesTrimSizeList } = row;
        if (clothesTrimSizeList.length <= clo.length) {
          for (let i = 0; i < clo.length; i++) {
            const clothe = firstList[i];
            // const isHas = clothesTrimSizeList[i];
            // if (!isHas) {
            clothesTrimSizeList[i] = {
              clothesName: clothe.clothesName,
              value: '',
              // };
            };
          }
        }
      });
      return clo;
    }
    return [];
  });

  const { columns } = useTableColumns<IV1SewResSewSizeInfoListItem>(() => {
    return [
      {
        label: '部位',
        minWidth: '150',
        align: 'center',
        prop: 'positionName',
      },
      {
        label: '尺寸维度',
        minWidth: '150',
        align: 'center',
        prop: 'dimension',
      },
      {
        label: '量法',
        width: '120',
        align: 'center',
        prop: 'measuringMethod',
      },
      {
        minWidth: '140',
        align: 'center',
        prop: 'sampleClothesSize',
        renderHeader: () => {
          return (
            <div>
              样衣尺寸 /
              {' '}
              {detailData.value?.sampleClothesSize}
            </div>
          );
        }
      },
      {
        minWidth: '140',
        align: 'center',
        prop: 'patternSize',
        renderHeader: () => {
          return (
            <div>
              纸样尺寸 /
              {' '}
              {detailData.value?.patternSize}
            </div>
          );
        }
      },
      ...clos.value.map<ITableColumnsItem<IV1SewResSewSizeInfoListItem>>((item: any) => ({
        label: item.label,
        align: 'center',
        minWidth: '120',
        render(row: IV1SewRes['sewSizeInfoList'][0]) {
          return (
            <input-number v-model={row.clothesTrimSizeList[item.prop].value} min={0} max={9999.9} precision={1} />
          );
        }
      })),
      {
        label: '允差范围',
        align: 'center',
        minWidth: '90',
        render(row) {
          return (
            <div>
              <span>±</span>
              { row.tolerance }
            </div>
          );
        }
      },
    ];
  });
  return {
    tableColumns: columns
  };
};
