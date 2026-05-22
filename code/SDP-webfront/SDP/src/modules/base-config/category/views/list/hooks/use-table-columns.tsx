import { useTableColumns } from '@toy/business-components';
import { ElMessage, ElMessageBox } from 'element-plus';
import { fetchCategoryMappingBatchRemove } from '@/modules/base-config/category/api';
import type { ICategoryMappingPageResItem } from '@/modules/base-config/category/api/type';
import { usePermissionConfig } from '@/modules/base-config/category/use-permission-config';
import { filters } from '@/core/plugins/filter';

export interface IConfig {
  refresh: () => void;
}

export const useListColumns = ({ refresh }: IConfig) => {
  const { SCGLPL } = usePermissionConfig();

  const handleDeleteCategoryMapping = async (row: ICategoryMappingPageResItem) => {
    try {
      await ElMessageBox.confirm(
        `确定要取消关联平台品类"${row.platformCategoryName}"吗?`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      );
      await fetchCategoryMappingBatchRemove([row.mappingId]);
      ElMessage.success('取消关联成功');
      refresh();
    } catch (error) {
      // 用户取消操作
    }
  };

  const { columns } = useTableColumns<ICategoryMappingPageResItem>(() => {
    return [
      {
        label: '平台类ID',
        minWidth: '120',
        prop: 'platformCategoryCode',
      },
      {
        label: '平台',
        minWidth: '120',
        prop: 'platformName',
      },
      {
        label: '平台品类',
        minWidth: '180',
        prop: 'platformCategoryName',
      },
      {
        label: '备注',
        minWidth: '160',
        prop: 'message',
      },
      {
        label: '创建人/更新人',
        minWidth: '120',
        render: row => row.reviserName || row.creatorName,
      },
      {
        label: '创建时间/更新时间',
        minWidth: '160',
        render: row => filters.formatTime(row.revisedTime || row.createdTime),
      },
      {
        label: '操作',
        width: '160',
        fixed: 'right',
        render(row) {
          return SCGLPL.value && (
            <el-button
              type='primary'
              link
              onClick={() => handleDeleteCategoryMapping(row)}
            >
              删除
            </el-button>
          );
        }
      }
    ];
  });

  return {
    tableColumns: columns,
  };
};
