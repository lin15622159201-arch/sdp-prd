import { useTableColumns } from '@toy/business-components';
import usePermissionConfig from '../use-permission-config';
import { YES_NO_ENUM } from '@/constant';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router';
import { IAuditCraftTemplateQueryByPageResListItem } from '../api/type';
import { auditCraftTemplateChangeState } from '../api';

type Props = {
  reload: () => void;
  handleLog: (row: IAuditCraftTemplateQueryByPageResListItem) => void;
};

export const useListColumns = (props: Props) => {
  const router = useRouter();

  const { BJ, QTY, CZRZ, XQ } = usePermissionConfig();

  const updateStaus = async (row: IAuditCraftTemplateQueryByPageResListItem) => {
    await ElMessageBox.confirm(`确定${row.state === YES_NO_ENUM.YES ? '停用' : '启用'} ${row.templateName}模板吗？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    });
    await auditCraftTemplateChangeState({
      templateId: row.templateId,
      state: row.state === YES_NO_ENUM.YES ? YES_NO_ENUM.NO : YES_NO_ENUM.YES,
    });
    ElMessage.success('操作成功!');
    props.reload();
  };

  const handleEdit = (row: IAuditCraftTemplateQueryByPageResListItem) => {
    console.log(row);
    router.push({
      name: 'EditBaseConfigAuditCraftComponentStyleLibrary',
      params: {
        id: row.templateId,
      },
    });
  };

  const { columns: tableColumns } = useTableColumns<IAuditCraftTemplateQueryByPageResListItem>(() => {
    return [
      {
        label: '模板名称',
        minWidth: '150',
        align: 'center',
        render(row) {
          const { href } = router.resolve({
            name: 'BaseConfigAuditCraftComponentStyleLibraryDetail',
            params: {
              id: row.templateId,
            },
          });
          return (
            <>
              {XQ.value ? (<el-link href={href} underline={false} type='primary'>{ row.templateName }</el-link>)
                : (<span>{row.templateName}</span>)}
            </>

          );
        }
      },
      {
        label: '板房品类',
        minWidth: '150',
        align: 'center',
        render(row) {
          const str = row.roomCategorys?.map(item => item.roomCategoryName).join('、');
          return (
            <span>{ str }</span>
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
