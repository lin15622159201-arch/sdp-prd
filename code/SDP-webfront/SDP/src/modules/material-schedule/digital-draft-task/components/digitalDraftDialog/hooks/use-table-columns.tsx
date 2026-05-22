import { useTableColumns } from '@toy/business-components';
import { IDigitalPaintingSaveReqBaseCloth } from '../../../api/types';

export const useListTableColumns = () => {
  const { columns } = useTableColumns<IDigitalPaintingSaveReqBaseCloth>(() => {
    return [
      {
        label: 'PID',
        minWidth: '150',
        prop: 'commodityCode',
      },
      {
        label: '品名',
        minWidth: '150',
        prop: 'commodityName',
      },
      {
        label: '货号',
        minWidth: '150',
        prop: 'commodityNumber',
      },
      {
        label: '克重',
        minWidth: '150',
        prop: 'weightStrFormat',
      },
      {
        label: '成分',
        minWidth: '250',
        render(row) {
          const materialStr = row.material?.map(item => `${item.percent
            ? `${item.percent}%` : ''}${item.name}`).join('、');
          return (
            <div>
              <p>{ materialStr }</p>
            </div>
          );
        }
      },
    ];
  });
  return {
    columns,
  };
};
