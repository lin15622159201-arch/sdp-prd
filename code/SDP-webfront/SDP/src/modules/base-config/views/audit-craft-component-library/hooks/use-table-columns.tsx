import { useTableColumns } from '@toy/business-components';
import usePermissionConfig from '../use-permission-config';
import { YES_NO_ENUM } from '@/constant';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router';
import { IAuditCraftComponentQueryByPageResListItem } from '../api/type';
import { auditCraftComponentChangeState } from '../api';

type Props = {
  reload: () => void;
  handleLog: (row: IAuditCraftComponentQueryByPageResListItem) => void;
};

export const useListColumns = (props: Props) => {
  const router = useRouter();

  const { BJ, QTY, CZRZ, XQ } = usePermissionConfig();

  const updateStaus = async (row: IAuditCraftComponentQueryByPageResListItem) => {
    await ElMessageBox.confirm(`确定${row.state === YES_NO_ENUM.YES ? '停用' : '启用'} ${row.componentName} 工序部件吗？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    });
    await auditCraftComponentChangeState({
      componentId: row.componentId,
      state: row.state === YES_NO_ENUM.YES ? YES_NO_ENUM.NO : YES_NO_ENUM.YES,
    });
    ElMessage.success('操作成功!');
    props.reload();
  };

  const handleEdit = (row: IAuditCraftComponentQueryByPageResListItem) => {
    console.log(row);
    router.push({
      name: 'EditBaseConfigAuditCraftComponentLibrary',
      params: {
        id: row.componentId,
      },
    });
  };

  const { columns: tableColumns } = useTableColumns<IAuditCraftComponentQueryByPageResListItem>(() => {
    return [
      {
        label: '工序部件',
        minWidth: '150',
        align: 'center',
        render(row) {
          const { href } = router.resolve({
            name: 'BaseConfigAuditCraftComponentLibraryDetail',
            params: {
              id: row.componentId,
            },
          });
          return (
            <>
              {XQ.value ? (<el-link href={href} underline={false} type='primary'>{ row.componentName }</el-link>)
                : (<span>{row.componentName}</span>)}
            </>

          );
        }
      },
      {
        label: '状态',
        minWidth: '150',
        align: 'center',
        render(row) {
          let className = 'text-color-primary';
          if (row.state === YES_NO_ENUM.NO) {
            className = 'text-color-red';
          }
          return (
            <p class={className}>{ row.stateDesc }</p>
          );
        }
      },
      {
        label: '操作',
        width: '180',
        align: 'center',
        render: row => (
          <div class='tw-flex tw-align-center tw-justify-center'>
            {BJ.value && (
              <el-button
                type='primary'
                text
                onClick={() => handleEdit(row)}
              >
                编辑
              </el-button>
            )}
            {QTY.value && (
              <el-button
                type={row.state === YES_NO_ENUM.YES ? 'danger' : 'primary'}
                text
                onClick={() => updateStaus(row)}
              >
                {row.state === YES_NO_ENUM.YES ? '停用' : '启用'}
              </el-button>
            )}
            {
              CZRZ.value && (
                <el-button
                  type='primary'
                  text
                  onClick={() => props.handleLog(row)}
                >
                  操作日志
                </el-button>
              )
            }
          </div>
        ),
      },
    ];
  });
  return {
    tableColumns,
  };
};
