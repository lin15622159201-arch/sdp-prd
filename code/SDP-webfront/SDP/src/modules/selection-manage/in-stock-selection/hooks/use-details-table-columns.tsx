import { useTableColumns } from '@toy/business-components';
import { OptLogItem } from '../api/type';
import { OPT_TYPE_LIST } from '../constant';
import { filters } from '@/core/plugins/filter';

export const useDetailsColumns = () => {
  const { columns } = useTableColumns<OptLogItem>(() => {
    return [
      {
        label: '操作类型',
        minWidth: '120',
        render(row) {
          const label = filters.getEnumLabel(OPT_TYPE_LIST, row.type);
          return label;
        }
      },
      {
        label: '变更内容',
        minWidth: '120',
        render(row) {
          return (
            <>
              {
                row.data?.map(item => (
                  <div class='tw-mb-3'>
                    <span>
                      {item.name}
                      :
                    </span>
                    <span>{item.value}</span>
                  </div>
                ))
              }
            </>
          );
        }
      },
      {
        label: '操作记录',
        minWidth: '120',
        render(row) {
          return (
            <div>
              <p>
                {row.creatorName}
              </p>
              <p>
                {row.createdTime}
              </p>
            </div>
          );
        }
      }
    ];
  });

  return {
    tableColumns: columns,
  };
};
