import { useTableColumns, ITableColumnsItem } from '@toy/business-components';
import { resizeImgByWidth } from '@/core/utils/helper';
import { useAccountStore } from '@/store/account';
import { createHandler } from '@/core/utils/template';
import { usePermissionConfig } from '../../../use-permission-config';
import { IFloralPrintExtractionPageResListItem } from '../../../api/type';
import {
  FLOWER_PATTERN_TASK_STATUS_ENUM_LIST,
  FLOWER_PATTERN_EXTRACTION_REGION_ENUM_LIST,
} from '../../../constant';
import {
  abortFlowerPatternExtractionTask,
  deleteFlowerPatternExtractionTask,
  repeatFlowerPatternExtractionTask
} from '../../../lib';
import { TASK_STATUS_EN_ENUM } from '@/modules/inspiration-center/constant';
import { filters } from '@/core/plugins/filter';

type Props = {
  handleSearch: (pageNum?: string | number | undefined) => Promise<any>;
  /** 再次编辑，仅【已生成】状态可操作 */
  handleEdit: (row: IFloralPrintExtractionPageResListItem) => void;
  handleShowDetail: (row: IFloralPrintExtractionPageResListItem, url: string) => void;
};

export const useListColumns = ({ handleSearch, handleEdit, handleShowDetail }: Props) => {
  const accountStore = useAccountStore();
  const { CS, ZZ, ZCBJ, SC } = usePermissionConfig();

  const handleAbort = async (row: IFloralPrintExtractionPageResListItem) => {
    await abortFlowerPatternExtractionTask(row.taskCode);
    handleSearch(1);
  };

  const handleDelete = async (row: IFloralPrintExtractionPageResListItem) => {
    await deleteFlowerPatternExtractionTask(row.taskCode);
    handleSearch(1);
  };
  /**
   * 重试任务
   *  仅创建人可操作；仅【已中止/生成失败】可操作
   * @param row 当前行
   */
  const handleRetry = async (row: IFloralPrintExtractionPageResListItem) => {
    await repeatFlowerPatternExtractionTask(row.taskCode);
    handleSearch(1);
  };

  const handleGetStatusItem = (row: IFloralPrintExtractionPageResListItem) => {
    const item = FLOWER_PATTERN_TASK_STATUS_ENUM_LIST.find(i => i.value === row.taskStatus);
    return item;
  };

  const result = (row: IFloralPrintExtractionPageResListItem) => {
    const { taskStatus, generateImages } = row;
    const MAX_COUNT = 4;
    if (taskStatus === TASK_STATUS_EN_ENUM.COMPLETED) {
      return (generateImages ?? []).slice(0, 4).map(url => (
        <el-image
          src={url}
          class='tw-w-100px tw-h-100px'
          fit='cover'
          key={url}
          onClick={() => handleShowDetail(row, url)}
        />
      ));
    }
    const statusItem = handleGetStatusItem(row);
    return Array(MAX_COUNT).fill('').map(() => (
      <div
        class='tw-w-100px tw-h-100px tw-flex
        tw-items-center tw-justify-center tw-rounded-4px
        tw-text-[#787A80] tw-bg-[#F7F9FC]'
      >
        {statusItem?.label}
      </div>
    ));
  };

  const { columns } = useTableColumns<IFloralPrintExtractionPageResListItem>(() => {
    const columnList: ITableColumnsItem<IFloralPrintExtractionPageResListItem>[] = [
      {
        label: '任务编号',
        minWidth: '120',
        render(row) {
          const status = handleGetStatusItem(row);
          return (
            <div class='tw-flex tw-flex-col tw-items-center tw-gap-4px'>
              <span>{ row.taskCode }</span>
              <el-tag type={status?.style}>{ status?.label }</el-tag>
            </div>
          );
        }
      },
      {
        label: '参考图',
        minWidth: '130',
        render(row) {
          return (
            <el-image
              src={resizeImgByWidth(row.originalImage, 200)}
              class='tw-w-100px tw-h-100px'
              fit='cover'
              preview-src-list={[row.originalImage]}
              preview-teleported
            />
          );
        },
      },
      {
        label: '生成图',
        minWidth: '450',
        render(row) {
          return (
            <div class='tw-flex tw-gap-8px'>
              { result(row) }
            </div>
          );
        },
      },
      {
        label: '提取区域',
        minWidth: '120',
        prop: 'extractRegion',
        render(row) {
          return (
            <span>
              {filters.getEnumLabel(FLOWER_PATTERN_EXTRACTION_REGION_ENUM_LIST, row.extractRegion)}
            </span>
          );
        }
      },
      {
        label: '创建人',
        minWidth: '120',
        prop: 'creatorName'
      },
      {
        label: '创建时间',
        minWidth: '180',
        prop: 'createdTime',
        render(row) {
          return <span>{filters.formatTime(row.createdTime)}</span>;
        }
      },
      {
        label: '操作',
        width: '200',
        fixed: 'right',
        render(row) {
          const isMine = row.creatorId === accountStore.account?.id;
          return (
            createHandler(row, [
              {
                buttonText: '中止',
                isShow: ZZ.value && isMine && (
                  row.taskStatus === TASK_STATUS_EN_ENUM.GENERATING
                  || row.taskStatus === TASK_STATUS_EN_ENUM.QUEUEING
                ),
                onClick: handleAbort
              },
              {
                buttonText: '删除',
                isShow: SC.value && isMine,
                buttonProps: {
                  type: 'danger'
                },
                onClick: handleDelete
              },
              {
                buttonText: '重试',
                isShow: CS.value && isMine && (
                  TASK_STATUS_EN_ENUM.ABORTED === row.taskStatus
                  || TASK_STATUS_EN_ENUM.FAILED === row.taskStatus
                ),
                onClick: handleRetry
              },
              {
                buttonText: '再次编辑',
                isShow: ZCBJ.value && TASK_STATUS_EN_ENUM.COMPLETED === row.taskStatus,
                onClick: handleEdit
              }
            ])
          );
        }
      },
    ];
    return columnList;
  });

  return {
    tableColumns: columns,
  };
};
