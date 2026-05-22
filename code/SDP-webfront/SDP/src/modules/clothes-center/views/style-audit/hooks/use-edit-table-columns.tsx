import { useTableColumns, ITableColumnsItem } from '@toy/business-components';
import { computed, Ref } from 'vue';
import {
  ISampleAuditBaseInfoRes as DetailRes,
  IQcLableInfoRes,
  IQcLableInfoResSizeInfoListItem,
  IPatternSizeRes
} from '../api/types';

interface IProps {
  detailData: Ref<DetailRes>;
  sizeInfoList: Ref<DetailRes['sizeTable']>;
  clothesBaseInfo: Ref<DetailRes['clothesBaseInfo']>;
  sizePatternSize: Ref<IPatternSizeRes>;
  isView: Ref<boolean>;
}

export const useListColumns = ({ isView, sizeInfoList, sizePatternSize, clothesBaseInfo }: IProps) => {
  const clos = computed(() => {
    const firstList = sizeInfoList.value ? sizeInfoList.value[0]?.clothesTrimSizeList : [];
    if (firstList?.length) {
      const clo = firstList.map((clothes, i: number) => {
        return {
          label: `样衣 ${clothes.clothesName} 实测尺寸`,
          prop: `${i}`,
        };
      });
      sizeInfoList.value?.forEach((row) => {
        const { clothesTrimSizeList } = row;
        if (clothesTrimSizeList.length < clo.length) {
          for (let i = 0; i < clo.length; i++) {
            const clothe = firstList[i];
            const isHas = clothesTrimSizeList[i];
            if (!isHas) {
              clothesTrimSizeList[i] = {
                clothesName: clothe.clothesName,
                value: '',
              };
            }
          }
        }
      });
      return clo;
    }
    return [];
  });

  const { columns } = useTableColumns<IQcLableInfoResSizeInfoListItem>(() => {
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
      // {
      //   minWidth: '150',
      //   align: 'center',
      //   prop: 'size',
      //   renderHeader: () => {
      //     return (
      //       <div>
      //         客户要求尺寸 /
      //         {' '}
      //         {sizePatternSize.value?.sampleSize}
      //       </div>
      //     );
      //   }
      // },
      {
        minWidth: '140',
        align: 'center',
        prop: 'patternSize',
        renderHeader: () => {
          return (
            <div>
              纸样尺寸 /
              {' '}
              {sizePatternSize.value?.patternSize}
            </div>
          );
        }
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
              {sizePatternSize.value?.sampleClothesSize}
            </div>
          );
        }
      },
      ...clos.value.map<ITableColumnsItem<IQcLableInfoResSizeInfoListItem>>((item: any) => ({
        label: item.label,
        align: 'center',
        minWidth: '120',
        render(row: IQcLableInfoRes['sizeInfoList'][0]) {
          return (
            <input-number
              v-model={row.clothesTrimSizeList[item.prop].value}
              min={0}
              max={9999.9}
              precision={1}
              disabled={isView.value}
            />
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
