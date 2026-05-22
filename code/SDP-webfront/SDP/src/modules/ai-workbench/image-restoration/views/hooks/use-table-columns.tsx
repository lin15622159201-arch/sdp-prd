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
import { ImageRepairPageResListItem } from '../../api/types';
import styles from './index.module.scss';
import { useDictionary } from '@/hooks/use-dictionary2';
import { DICTIONARY_KEY } from '@/constant/dictionary';

export const DESIGN_DEMAND_STATUS_LIST = [
  { label: '排队中', value: DESIGN_DEMAND_STATUS_ENUM.WAIT_DISPATCH, color: 'primary' },
  { label: '生成中', value: DESIGN_DEMAND_STATUS_ENUM.WAIT_HANDLE, color: 'warning' },
  { label: '已生成', value: DESIGN_DEMAND_STATUS_ENUM.DISUSE, color: 'success' },
  { label: '已中止', value: DESIGN_DEMAND_STATUS_ENUM.FINISH, color: 'danger' },
  { label: '生成失败', value: DESIGN_DEMAND_STATUS_ENUM.GF, color: 'danger' },
];

interface IProps {
  reloadFn: () => void;
  handleOperateLog: (index: number, item: any, imgUrlName: string) => void;
  lookImg: (url: string) => void;
}
export const useListColumns = (props: IProps) => {
  const { getEnableDictionaryOptions } = useDictionary();
  const TASK_SOURCE_LIST = computed(() => getEnableDictionaryOptions(DICTIONARY_KEY.AIFUNCTIONCALL_CONFIGURATION));
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
      name: 'ImageRestorationDetail',
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
  const renderCreateInfo = (row: ImageRepairPageResListItem) => {
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
          任务来源：
          {
            TASK_SOURCE_LIST.value.find(item => item.value === row.taskSource)?.label || row.taskSource
          }
        </span>
        <span>
          灵感来源：
          {
            row.source
          }
        </span>
      </div>
    );
  };
  const referenceDiagram = (row: ImageRepairPageResListItem) => {
    if (row.taskStatus === 30) {
      return (
        <div class={styles.flexItemImg}>
          {
            (row.resultImg || []).slice(0, 4).map((imgUrl: any, index: number) => {
              return (
                <div class='tw-flex tw-flex-wrap tw-gap-2px'>
                  <el-image
                    src={resizeImgByWidth(imgUrl.url, 200)}
                    class='tw-w-100px tw-h-100px tw-rounded-4px'
                    fit='cover'
                    onClick={() => props.handleOperateLog(imgUrl.urlIndex, row, imgUrl.urlTypeName)}
                  />
                </div>
              );
            })
          }
        </div>
      );
    } else {
      const arr = [];
      let sum: number = 0;
      if (row.faceFix === 1 && row.bodyFix === 1 && row.imageSuperResolution === 1) {
        sum = 3;
      } else if ((row.faceFix === 1 && row.bodyFix === 1) || (row.faceFix === 1 && row.imageSuperResolution === 1) || (row.bodyFix === 1 && row.imageSuperResolution === 1)) {
        sum = 2;
      } else {
        sum = 1;
      }
      for (let i = 0; i < (row.generateImages?.length || 0) * sum; i++) {
        arr.push(i);
      }
      return (
        <div style={{ display: 'flex', gap: '10px' }}>
          {
            arr.slice(0, 4).map((item, index) => {
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
  const isMine = (row: ImageRepairPageResListItem) => row.creatorId === tenantUserId.value;
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
      name: 'ImageRestorationCreate',
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
                        { row.taskCode }
                      </span>
                    )
                    : (
                      <span>
                        { row.taskCode }
                      </span>
                    )
                }
              </div>
              {/* success  danger primary */}
              <el-tag type={DESIGN_DEMAND_STATUS_LIST.filter(v => v.value === row.taskStatus)?.[0]?.color}>{ DESIGN_DEMAND_STATUS_LIST.filter(v => v.value === row.taskStatus)?.[0]?.label }</el-tag>
            </div>
          );
        }
      },
      {
        label: '原图',
        minWidth: '460',
        render(row) {
          return (
            <div
              style='display: flex;flex-wrap: wrap;gap: 10px;'
            >
              {
                row.generateImages && (row.generateImages || []).slice(0, 4).map((v:any, index: number) => {
                  return (
                    <el-image
                      style='width: 100px; height: 100px'
                      src={resizeImgByWidth(v?.refImgUrl, 200)}
                      onClick={() => {
                        props.handleOperateLog(index, row, v.urlTypeName);
                      }}
                      fit='cover'
                    />
                  );
                })
              }
            </div>
          );
        }
      },
      {
        label: '修复类型',
        minWidth: '100',
        render(row) {
          return (
            <div>
              <div>{ row.faceFix === 1 ? '脸部修复' : '' }</div>
              <div>{ row.bodyFix === 1 ? '肢体修复' : '' }</div>
              <div>{ row.imageSuperResolution === 1 ? '图片超分' : '' }</div>
            </div>
          );
        }
      },
      {
        label: '生成结果',
        minWidth: '450',
        render(row) {
          return referenceDiagram(row);
        }
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
