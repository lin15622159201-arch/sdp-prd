import { useTableColumns } from '@toy/business-components';
import { resizeImgByWidth } from '@/core/utils/helper';

export const useListColumns = () => {
  const { columns } = useTableColumns<any>(() => {
    return [
      {
        type: 'selection',
        width: 44,
      },
      {
        label: '部件名称',
        minWidth: '150',
        align: 'center',
        prop: 'componentName',
      },
      {
        label: '图片',
        align: 'center',
        width: '200',
        render(row) {
          return (
            <custom-image
              src={resizeImgByWidth(row.url || '', 192)}
              preview-src-list={[row.url]}
              fit='cover'
              class='tw-w-96px tw-h-96px'
            />
          );
        },
      },
      {
        label: '车种',
        align: 'center',
        minWidth: '90',
        prop: 'plmSewingType',
      },
      {
        label: '工序名称',
        align: 'center',
        minWidth: '90',
        render(row) {
          return (
            <div>
              { row.plmSewingType }
            </div>
          );
        }
      },
      {
        label: '车缝要求',
        align: 'center',
        minWidth: '90',
        render(row) {
          return (
            <div>
              { row.sewingRequire }
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
