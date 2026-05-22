import { useTableColumns } from '@toy/business-components';
import { ref, computed, Ref } from 'vue';
import {
  IProductionDataStyleInfoSizeSkipSizeQuotietyListItem as ISize,
  IStyleInfoSubmitReqStyleDetailSizeReqListItem,
} from '../../../api/types';
import { Plus, Minus } from '@element-plus/icons-vue';
import { cloneDeep } from 'lodash-es';
import useSizeHopping from './use-size-hopping';
import useComposeHandle from './use-compose-handle';

type QuerySearchCb = (data: any) => void;

interface IParams {
  sizeFormData: Ref<any>;
  /**
   * 所选尺码标准
   */
  sizeList: Ref<any>;
}

export const useSizeTable = ({ sizeFormData, sizeList }: IParams) => {
  const sizeTableList = ref<IStyleInfoSubmitReqStyleDetailSizeReqListItem[]>([]);
  const {
    getDisabled,
    basePositionList,
    handlePositionChange,
    querySearchMeasureWay,
    handleCheck
  } = useComposeHandle(sizeTableList);

  // 新增一行
  const handleAddSize = (row: IStyleInfoSubmitReqStyleDetailSizeReqListItem) => {
    const clearSizeData = (item: ISize) => {
      item.data = '';
    };
    const _data = cloneDeep(row);
    _data.position = '';
    _data.sizeDimension = '';
    _data.measureWay = '';
    _data.sampleSize = '';
    _data.designSize = '';
    _data.deviationRange = '';
    _data.styleSizeDetailId = '';

    _data.skipSizeQuotietyList.forEach(clearSizeData);
    _data.sizeList.forEach(clearSizeData);
    sizeTableList.value.push(_data);
  };

  // 删除一行
  const handleRemoveSize = (index: number) => {
    sizeTableList.value.splice(index, 1);
  };

  const sizeColumns = computed(() => {
    return (sizeTableList.value || [])[0]?.sizeList || [];
  });

  // 跳码
  const { handleSizeHoppingChange } = useSizeHopping(sizeTableList, sizeFormData, sizeList);

  const { columns } = useTableColumns<IStyleInfoSubmitReqStyleDetailSizeReqListItem>(() => {
    return [
      {
        label: '操作',
        minWidth: '100',
        align: 'center',
        render: (row, column, index) => {
          return (
            <>
              <el-button
                text
                type='primary'
                onClick={() => handleAddSize(row)}
              >
                <el-icon><Plus /></el-icon>
              </el-button>
              {sizeTableList.value.length > 1 && (
                <el-button
                  text
                  type='danger'
                  onClick={() => handleRemoveSize(index)}
                >
                  <el-icon><Minus /></el-icon>
                </el-button>
              )}
            </>
          );
        }
      },
      {
        label: '部位',
        prop: 'position',
        align: 'center',
        minWidth: '100px',
        render: (row, column, index) => {
          return (
            <el-select
              v-model={row.position}
              filterable
              onChange={(val: string) => handlePositionChange(val, index)}
            >
              {(basePositionList.value).map(item => (
                <el-option
                  label={item.clothesPartsName}
                  value={item.clothesPartsName}
                  disabled={getDisabled(index, item.clothesPartsName)}
                />
              ))}
            </el-select>
          );
        }
      },
      {
        label: '尺寸维度',
        prop: 'sizeDimension',
        align: 'center',
        minWidth: '80px',
        render: (row) => {
          if (!row.sizeDimension) {
            return '-';
          }
          return `X${row.sizeDimension}`;
        },
      },
      {
        label: '量法',
        prop: 'measureWay',
        align: 'center',
        minWidth: '300px',
        render: (row, column, index) => {
          return (
            <el-autocomplete
              v-model={row.measureWay}
              style='width: 100%;'
              fetch-suggestions={
                (queryString: string, cb: QuerySearchCb) => querySearchMeasureWay(cb, row.position)
              }
              placeholder='请输入量法'
              maxlength='50'
              title={row.measureWay}
              onSelect={() => handleCheck(index)}
              v-slots={{
                default: ({ item }: any) => {
                  return (
                    <p class='autocomplete-text'>
                      { item.value || '-' }
                    </p>
                  );
                }
              }}
            />
          );
        }
      },
      {
        prop: 'sampleSize',
        minWidth: '100px',
        renderHeader: () => {
          return (
            <p class='tw-text-danger'>
              样衣尺寸
              {sizeFormData.value.sampleBaseYardage}
            </p>
          );
        },
        render: (row, $ctx, index) => {
          return (
            <input-number
              v-model={row.sampleSize}
              min={0}
              max={9999.9}
              precision={1}
              maxlength={7}
              onChange={() => handleSizeHoppingChange(index)}
            />
          );
        }
      },
      {
        prop: 'designSize',
        minWidth: '100px',
        renderHeader: () => {
          return (
            <p>
              纸样尺寸
              {sizeFormData.value.designBaseYardage}
            </p>
          );
        },
        render: (row) => {
          return (
            <input-number
              v-model={row.designSize}
              min={0}
              max={9999.9}
              maxlength={7}
              precision={1}
            />
          );
        }
      },
      {
        prop: 'skipSizeQuotietyList',
        minWidth: '140px',
        align: 'center',
        label: '放码档差',
        render: (row, $ctx, index) => {
          return (
            row.skipSizeQuotietyList.map((item: any) => {
              return (
                <div class={`tw-flex tw-flex-justify-end ${index ? 'tw-mt-10px' : ''}`}>
                  { item.size }
                  ：
                  <input-number
                    class='tw-w-50px'
                    v-model={item.data}
                    min={0}
                    precision={1}
                    onChange={() => handleSizeHoppingChange(index)}
                  />
                </div>
              );
            })
          );
        }
      },
      ...sizeColumns.value.map((item, i) => ({
        renderHeader: () => {
          return (
            <div class={item.size === sizeFormData.value.sampleBaseYardage ? 'tw-text-danger' : ''}>
              {item.size}
            </div>
          );
        },
        width: '90px',
        // 使用下标作为key
        prop: `${i}`,
        render: (row: IStyleInfoSubmitReqStyleDetailSizeReqListItem) => {
          if (item.size === sizeFormData.value.sampleBaseYardage) {
            row.sizeList[i].data = row.sampleSize || '';
            return <span class='tw-text-danger'>{row.sampleSize}</span>;
          }
          return (
            <input-number
              v-model={row.sizeList[i].data}
              data-desc='尺寸数量'
              type='number'
              min={0}
              max={500}
              precision={1}
            />
          );
        }
      })),
      {
        label: '允差范围',
        align: 'center',
        prop: 'deviationRange',
        minWidth: '120px',
        render: (row) => {
          return (
            <input-number
              v-model={row.deviationRange}
              min={0.1}
              precision={1}
              v-slots={{
                prepend: () => '±',
              }}
            />
          );
        }
      },
    ];
  });

  return {
    tableColumns: columns,
    sizeTableList,
    handleAddSize,
    handleRemoveSize,
  };
};
