import { ITableColumnsItem, useTableColumns } from '@toy/business-components';
import { computed, Ref, ref } from 'vue';
import { DESIGN_DEMAND_STATUS_ENUM } from '../../constant';
import { usePermissionConfig } from '../../use-permission-config';
import { resizeImgByWidth } from '@/core/utils/helper';
import { useAccountStore } from '@/store/account';
import { filters } from '@/core/plugins/filter';
import { createHandler } from '@/core/utils/template';
import { useRouter } from 'vue-router';
import { handleBatchAbort, handleBatchDelete, handleBatchRetry } from '../../lib/task';
import { StyleGenPageResListItem } from '../../api/types';
import styles from './index.module.scss';

export const DESIGN_DEMAND_STATUS_LIST = [
  { label: '排队中', value: DESIGN_DEMAND_STATUS_ENUM.WAIT_DISPATCH, color: 'primary' },
  { label: '生成中', value: DESIGN_DEMAND_STATUS_ENUM.WAIT_HANDLE, color: 'warning' },
  { label: '已生成', value: DESIGN_DEMAND_STATUS_ENUM.DISUSE, color: 'success' },
  { label: '已中止', value: DESIGN_DEMAND_STATUS_ENUM.FINISH, color: 'danger' },
  { label: '生成失败', value: DESIGN_DEMAND_STATUS_ENUM.GF, color: 'danger' },
];

interface IProps {
  reloadFn: () => void;
  handleOperateLog: (bizId: any) => void;
  lookImg: (url: string) => void;
}
export const useListColumns = (props: IProps) => {
  const operationText = ref<string>('批量操作');
  const operationFun = () => {
    if (operationText.value === '批量操作') {
      operationText.value = '取消批量操作';
    } else {
      operationText.value = '批量操作';
    }
  };
  const handleToDetail = (taskId: string) => {
    const url = router.resolve({
      name: 'StylishDerivedTasksDetail',
      query: {
        taskId,
      }
    }).href;
    window.open(url, '_blank');
  };
  enum VIEWPOINT {
    FRONT = 'FRONT',
    BACK = 'BACK',
  }
  const VIEWPOINT_LIST = [
    { value: VIEWPOINT.FRONT, label: '正面' },
    { value: VIEWPOINT.BACK, label: '背面' },
  ];
  const renderCreateInfo = (row: StyleGenPageResListItem) => {
    return (
      <div class='tw-flex tw-flex-col tw-gap-4px'>
        <span>
          创建人：
          {row.creatorName}
        </span>
        <span>
          创建时间：
          {filters.formatTime(row.createdTime)}
        </span>
        <span>
          生成时间：
          {filters.formatTime(row.generateTime)}
        </span>
        <span>
          灵感来源：
          {row.source}
        </span>
        {/* <span>
          关联任务：
          {
            {
              0: '未关联姿势裂变',
              1: '已关联姿势裂变'
            }[row.related || -1] || '-'
          }
        </span> */}
      </div>
    );
  };
  const referenceDiagram = (row: StyleGenPageResListItem) => {
    if (row.taskStatus === 30) {
      return (
        <div class={styles.flexItemImg}>
          {
            (row.images || []).slice(0, 4).map((imgUrl, index: number) => {
              return (
                <div class='tw-flex tw-flex-wrap tw-gap-2px'>
                  <el-image
                    src={resizeImgByWidth(imgUrl.imageUrl, 200)}
                    class='tw-w-100px tw-h-100px tw-rounded-4px'
                    fit='cover'
                    onClick={() => props.handleOperateLog({ ...row, index })}
                  />
                </div>
              );
            })
          }
        </div>
      );
    } else {
      const arr = [];
      for (let i = 0; i < (row.images?.length || row.genCount || 0); i++) {
        arr.push(i);
      }
      return (
        <div style={{ display: 'flex', gap: '10px' }}>
          {
            arr.slice(0, 4).map((item, index) => {
              // if (row.images && row.images.length) {
              //   return (
              //     <div class='tw-flex tw-flex-wrap tw-gap-2px'>
              //       <el-image
              //         src={resizeImgByWidth(row.images[index].imageUrl, 200)}
              //         class='tw-w-100px tw-h-100px tw-rounded-4px'
              //         fit='cover'
              //         onClick={() => props.handleOperateLog({ ...row, index })}
              //       />
              //     </div>
              //   );
              // }
              return (
                <div class={styles.imgItem}>
                  {DESIGN_DEMAND_STATUS_LIST.filter(v => v.value === row.taskStatus)?.[0]?.label}
                </div>
              );
            })
          }
        </div>
      );
    }
  };
  const router = useRouter();
  const accountStore = useAccountStore();
  const { CK, FZ, SC, CS, ZZ } = usePermissionConfig();
  const tenantUserId = computed(() => accountStore.account?.id || '');
  const isMine = (row: StyleGenPageResListItem) => row.creatorId === tenantUserId.value;
  const handleDelete = async (taskId: string, propsnew: IProps) => {
    await handleBatchDelete([taskId], propsnew.reloadFn);
  };

  const handleRetry = async (taskId: string, propsnew: IProps) => {
    // await taskRetry(taskId);
    // props.handleSearch(1);
    await handleBatchRetry([taskId], propsnew.reloadFn);
  };

  const handleAbort = async (taskId: string, propsnew: IProps) => {
    // await taskAbort(taskId);
    await handleBatchAbort([taskId], propsnew.reloadFn);
    // props.handleSearch(1);
  };
  const taskCopy = async (taskId: string) => {
    router.push({
      name: 'StylishDerivedTasksCreate',
      query: {
        taskId,
      }
    });
  };
  const { columns } = useTableColumns<any>(() => {
    const result: ITableColumnsItem<any>[] = [
      {
        label: '任务编号',
        minWidth: '110',
        render(row) {
          return (
            <div class='tw-flex tw-flex-col tw-items-center tw-gap-4px'>
              <div class='tw-flex tw-items-center tw-gap-4px'>
                {
                  CK.value
                    ? (
                      <span class='tw-color-primary tw-cursor-pointer' onClick={() => handleToDetail(row.taskId)}>
                        {row.taskCode}
                      </span>
                    )
                    : (
                      <span>
                        {row.taskCode}
                      </span>
                    )
                }
              </div>
              {/* success  danger primary */}
              <el-tag type={DESIGN_DEMAND_STATUS_LIST.filter(v => v.value === row.taskStatus)?.[0]?.color}>{DESIGN_DEMAND_STATUS_LIST.filter(v => v.value === row.taskStatus)?.[0]?.label}</el-tag>
            </div>
          );
        }
      },
      {
        label: '参考图',
        minWidth: '120',
        render(row) {
          return (
            <div>
              {
                row.refImgUrl && (
                  <el-image
                    style='width: 100px; height: 100px'
                    src={resizeImgByWidth(row.refImgUrl, 200)}
                    onClick={() => {
                      row.refImgUrl && props.lookImg(row.refImgUrl);
                    }}
                    fit='cover'
                  />
                )
              }
            </div>
          );
        }
      },
      {
        label: '灵感图',
        minWidth: '440',
        render(row) {
          return referenceDiagram(row);
        }
      },
      {
        label: '参数',
        minWidth: '120',
        render(row) {
          return (
            <div class='tw-flex tw-flex-col'>
              <span>
                风格模型：
                {row.styleModelName || '-'}
              </span>
            </div>
          );
        },
      },
      {
        label: '创建信息',
        minWidth: '180',
        render(row) {
          return renderCreateInfo(row);
        }
      },
      {
        label: '操作',
        width: '200',
        fixed: 'right',
        render: (row) => {
          const mine = isMine(row);
          return (
            createHandler(row, [
              {
                buttonText: '中止',
                isShow: ZZ.value && mine && (
                  row.taskStatus === DESIGN_DEMAND_STATUS_ENUM.WAIT_HANDLE
                  || row.taskStatus === DESIGN_DEMAND_STATUS_ENUM.WAIT_DISPATCH
                ),
                onClick: () => handleAbort(row.taskId, props)
              },
              {
                buttonText: '删除',
                isShow: SC.value && mine,
                buttonProps: {
                  type: 'danger'
                },
                onClick: () => handleDelete(row.taskId, props)
              },
              {
                buttonText: '重试',
                isShow: CS.value && mine && (
                  DESIGN_DEMAND_STATUS_ENUM.FINISH === row.taskStatus
                  || DESIGN_DEMAND_STATUS_ENUM.GF === row.taskStatus
                ),
                onClick: () => handleRetry(row.taskId, props)
              },
              {
                buttonText: '复制',
                isShow: FZ.value && DESIGN_DEMAND_STATUS_ENUM.DISUSE === row.taskStatus,
                onClick: () => taskCopy(row.taskId)
              }
            ])
          );
        },
      },
    ];
    if (operationText.value === '取消批量操作') {
      result.unshift({
        type: 'selection',
        reserveSelection: true,
        selectable(row) {
          return isMine(row);
        },
      });
    }
    return result;
  });



  return {
    tableColumns: columns,
    operationText,
    operationFun
  };
};
