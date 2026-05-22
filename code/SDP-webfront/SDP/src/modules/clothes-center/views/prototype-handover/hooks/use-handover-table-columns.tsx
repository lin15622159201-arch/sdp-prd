import { useTableColumns } from '@toy/business-components';

export interface ITableItem {
  designCode: string;
  designerName: string;
}

export const useHandoverTableColumns = () => {
  const { columns } = useTableColumns<ITableItem>(() => {
    return [
      {
        prop: 'designCode',
        label: 'SKC',
        minWidth: '100',
        align: 'center',
      },
      {
        prop: 'designerName',
        label: '设计师',
        minWidth: '100',
        align: 'center',
      },
    ];
  });
  return {
    tableColumns: columns
  };
};
