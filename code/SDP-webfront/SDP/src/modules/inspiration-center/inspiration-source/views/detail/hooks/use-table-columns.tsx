import { ref, Ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTableColumns } from '@toy/business-components';
import { ITableItem } from '../type';
import { filters } from '@/core/plugins/filter';
import { TASK_STATUS_LIST, SUPPLY_METHOD } from '@/modules/inspiration-center/inspiration-source/constant';
import { usePermissionConfig } from '../../../use-permission-config';
import { SYSTEM_ENUM } from '@/core/http/env';

export interface IConfig {
  handleSuccess?: () => void;
  handleSubmit: (id: string) => void;
}
export const useListColumns = ({ handleSuccess, handleSubmit }: IConfig) => {
  const { TJRW } = usePermissionConfig();
  const router = useRouter();
  const handleCheck = (row: any) => {
    let routeData: any = '';
    switch (row.generationType) {
      case SUPPLY_METHOD.SUPPLYMETHODCODE:
        routeData = router.resolve({
          name: 'StylishDerivedTasksDetail',
          query: {
            taskId: row.downstreamTaskId,
          },
        });
        window.open(routeData.href, '_blank');
        break;
      case SUPPLY_METHOD.ARTIFICIAL:
        routeData = router.resolve({
          name: 'Webview',
          query: {
            domain: SYSTEM_ENUM.FASHION_DESIGN,
            path: `/#/inspiration-center/ai-design-task/detail/${row.id}`,
            activeMenu: 'Webview?domain=fashion-design&path=/#/inspiration-center/ai-design-task/list'
          }
        });
        window.open(routeData.href, '_blank');
        break;
      case SUPPLY_METHOD.POSTURE_FISSION:
        routeData = router.resolve({
          name: 'PostureFissionDetail',
          query: {
            taskId: row.downstreamTaskId,
          },
        });
        window.open(routeData.href, '_blank');
        break;
      case SUPPLY_METHOD.FASHION_VIRTUAL_TRY_ON:
        routeData = router.resolve({
          name: 'Webview',
          query: {
            domain: SYSTEM_ENUM.FASHION_DESIGN,
            path: '/#/inspiration-center/virtual-change/detail',
            activeMenu: 'Webview?domain=fashion-design&path=/#/inspiration-center/virtual-change/list',
            query: JSON.stringify({
              taskId: row.downstreamTaskId,
            })
          }
        });
        window.open(routeData.href, '_blank');
        break;
      default:
        break;
    }
  };

  const { columns } = useTableColumns<ITableItem>(() => {
    return [
      {
        label: '供给方式',
        minWidth: '120',
        render(row) {
          return (
            <div>
              <p>{row.supplyName}</p>
            </div>
          );
        },
      },
      {
        label: '波次',
        minWidth: '120',
        prop: 'waveBatchName',
      },
      {
        label: '任务编号',
        minWidth: '120',
        prop: 'taskCode',
      },
      {
        label: '提交人/提交时间',
        minWidth: '120',
        prop: 'submitor',
        render(row) {
          return (
            <div>
              <p>{row.submitor}</p>
              <p>{filters.formatTime(row.submitedTime)}</p>
            </div>
          );
        },
      },
      {
        label: '任务状态',
        minWidth: '120',
        render(row) {
          const { status } = row;
          const { label, type } = TASK_STATUS_LIST.find(i => i.value === status) ?? {};
          return (
            <div>
              <el-tag type={type}>{label}</el-tag>
            </div>
          );
        },
      },
      {
        label: '任务查看',
        minWidth: '120',
        render(row: any) {
          if ([SUPPLY_METHOD.ARTIFICIAL, SUPPLY_METHOD.FASHION_VIRTUAL_TRY_ON, SUPPLY_METHOD.POSTURE_FISSION, SUPPLY_METHOD.SUPPLYMETHODCODE].includes(row.generationType)) {
            return (
              <div>
                <el-button link type='primary' onClick={() => handleCheck(row)}>点击查看</el-button>
              </div>
            );
          } else {
            return null;
          }
        },
      },
      {
        label: '操作',
        width: '120',
        fixed: 'right',
        render(row: any) {
          return (
            <div>
              {
                (TJRW.value && (![SUPPLY_METHOD.FASHION_VIRTUAL_TRY_ON, SUPPLY_METHOD.POSTURE_FISSION].includes(row.generationType || ''))) && (
                  <el-button
                    link
                    type='primary'
                    onClick={() => handleSubmit(row.id)}
                  >
                    再次提交
                  </el-button>
                )
              }
            </div>
          );
        }
      },
    ];
  });
  return {
    tableColumns: columns,
  };
};
