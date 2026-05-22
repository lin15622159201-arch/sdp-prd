import { useTableColumns } from '@toy/business-components';
import usePermissionConfig from '../use-permission-config';
import { IAiCategoryMappingPageResListItem } from '../api/type';
import { filters } from '@/core/plugins/filter';
import { TYPE_MAPPING_LIST } from '../constant/index';

type Props = {
  handleEdit: (row: IAiCategoryMappingPageResListItem) => void;
  handleDel: (row: IAiCategoryMappingPageResListItem) => void;
};

export const useListColumns = (props: Props) => {
  const { BJ, SC } = usePermissionConfig();

  const { columns: tableColumns } = useTableColumns<IAiCategoryMappingPageResListItem>(() => {
    return [
      {
        label: '类型',
        minWidth: '150',
        align: 'center',
        render(row) {
          return (
            <span>{ TYPE_MAPPING_LIST.find(v => v.value === row.type)?.label ?? '-' }</span>
          );
        }
      },
      {
        label: 'AI品类',
        minWidth: '150',
        align: 'center',
        render(row) {
          return (
            <span>{ row.aiCategoryName }</span>
          );
        }
      },
      {
        label: '内部品类',
        minWidth: '150',
        align: 'center',
        render(row) {
          return (
            <span>{ row.categoryName }</span>
          );
        }
      },
      {
        label: '更新时间',
        minWidth: '150',
        align: 'center',
        render(row) {
          return (
            <span>{ filters.formatTime(row.revisedTime) }</span>
          );
        }
      },
      {
        label: '操作',
        width: '100',
        fixed: 'right',
        render: row => (
          <div class='tw-flex tw-items-center'>
            {BJ.value ? (
              <el-button
                type='primary'
                link
                onClick={() => props.handleEdit(row)}
              >
                编辑
              </el-button>
            ) : null}
            {SC.value ? (
              <el-button
                type='danger'
                link
                onClick={() => props.handleDel(row)}
              >
                删除
              </el-button>
            ) : null}
          </div>
        ),
      },
    ];
  });
  return {
    tableColumns,
  };
};
