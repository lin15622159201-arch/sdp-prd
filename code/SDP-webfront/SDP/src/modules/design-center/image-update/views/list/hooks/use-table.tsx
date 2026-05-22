import { createHandler } from '@/core/utils/template';
import { ITableColumnsItem } from '@toy/business-components';
import { ElButton, ElMessage, ElMessageBox, ElTag } from 'element-plus';
import CustomImage from '@/components/custom-image';
import { usePermissionConfig } from '@/modules/design-center/image-update/use-permission-config';
import { IImageUpdatePageItem } from '../../../api/type';
import { checkTaskCanAudit as checkAudit, checkTaskCanCancel as checkCancel } from '../../../utils';
import { useAccountStore } from '@/store/account';
import { IMAGE_UPDATE_STATE_ENUM, IMAGE_UPDATE_STATE_LIST, IMAGE_UPDATE_TASK_TYPE_LIST } from '../../../constant';
import { useAuditDialog } from './use-dialog-audit';
import { useRejectReasonDialog } from './use-dialog-reject-reason';
import { useRouter } from 'vue-router';
import { formatTime } from '@toy/utils';
import { fetchImageUpdateCancel } from '../../../api';

interface IProps {
  handleSearch: (pageNum?: number) => void;
}
export const useTable = ({ handleSearch }: IProps) => {
  const permissions = usePermissionConfig();
  const { account } = useAccountStore();
  const router = useRouter();
  const { openAuditDialog } = useAuditDialog(handleSearch);
  const { openRejectReasonDialog } = useRejectReasonDialog();

  const checkTaskCanEdit = (item: IImageUpdatePageItem) => {
    const isMe = item.creatorId === account?.id;
    return isMe && item.taskStatus === IMAGE_UPDATE_STATE_ENUM.WAIT;
  };

  const checkTaskCanAudit = (item: IImageUpdatePageItem) => {
    const isMe = item.creatorId === account?.id;
    return isMe && checkAudit(item.taskStatus);
  };

  const checkTaskCanCancel = (item: IImageUpdatePageItem) => {
    const isMe = item.creatorId === account?.id;
    return isMe && checkCancel(item.taskStatus);
  };

  const handleCancel = (row: IImageUpdatePageItem) => {
    ElMessageBox.confirm('确定取消该图片/视频更新任务吗？', '提示', {
      type: 'warning',
    }).then(async () => {
      await fetchImageUpdateCancel([row.taskId]);
      ElMessage.success('取消成功');
      handleSearch();
    });
  };

  const handleEdit = (row: IImageUpdatePageItem) => {
    router.push({ name: 'DesignCenterImageUpdateEdit', params: { taskId: row.taskId } });
  };

  const handleDetail = ({ taskId }: IImageUpdatePageItem) => {
    router.push({ name: 'DesignCenterImageUpdateDetail', params: { taskId } });
  };

  const renderTaskInfo = (row: IImageUpdatePageItem) => {
    return (
      <div>
        <ElButton type='primary' class='tw-user-select-all' link onClick={() => handleDetail(row)}>
          {row.taskCode}
        </ElButton>
        <div>
          任务类型：
          {IMAGE_UPDATE_TASK_TYPE_LIST.find(item => item.value === row.taskType)?.label || '未知'}
        </div>
      </div>
    );
  };

  const renderRelatedStyle = (row: IImageUpdatePageItem) => {
    return (
      <div>
        <div>
          SPU：
          {row.spuCode}
        </div>
        <div>
          设计组：
          {row.designerGroupName}
        </div>
        <div>
          设计师：
          {row.designerName}
        </div>
      </div>
    );
  };

  const renderTaskState = (row: IImageUpdatePageItem) => {
    const state = IMAGE_UPDATE_STATE_LIST.find(item => item.value === row.taskStatus);
    if (row.taskStatus === IMAGE_UPDATE_STATE_ENUM.REPAIR) {
      // 修图
      return (
        <span>
          <ElTag type={state?.type}>
            {state?.label}
          </ElTag>
          <ElButton type='primary' link class='tw-ml-2' onClick={() => openRejectReasonDialog(row)}>
            原因
          </ElButton>
        </span>
      );
    }
    return (
      <ElTag type={state?.type}>
        {state?.label}
      </ElTag>
    );
  };

  const renderTaskRepairPics = (row: IImageUpdatePageItem) => {
    const picUrls = new Set<string>();
    row.skcList?.forEach((skc) => {
      skc.pictures.forEach((pic) => {
        if (pic.pictureUrl) {
          picUrls.add(pic.pictureUrl);
        }
      });
    });
    return (
      <div class='tw-flex tw-gap-2 tw-flex-wrap'>
        {Array.from(picUrls).map((url, index) => (
          <CustomImage src={url} class='tw-w-48px tw-h-48px tw-object-cover' preview-src-list={Array.from(picUrls)} initial-index={index} fit='cover' />
        ))}
      </div>
    );
  };

  const renderCreateInfo = (row: IImageUpdatePageItem) => {
    return (
      <>
        <p class='tw-flex tw-gap-2'>
          创建人：
          {row.creatorName}
        </p>
        <p class='tw-flex tw-gap-2'>
          创建时间：
          {formatTime(row.createdTime)}
        </p>
      </>
    );
  };

  const renderFinishInfo = (row: IImageUpdatePageItem) => {
    return (
      <>
        <p class='tw-flex tw-gap-2'>
          处理人：
          {row.reviserName}
        </p>
        <p class='tw-flex tw-gap-2'>
          处理时间：
          {formatTime(row.revisedTime)}
        </p>
      </>
    );
  };

  const columns: ITableColumnsItem<IImageUpdatePageItem>[] = [
    { type: 'selection' },
    { label: '任务信息', prop: 'taskInfo', width: 120, render: renderTaskInfo },
    { label: '关联款式', width: 160, render: renderRelatedStyle },
    { label: '状态', width: 70, render: renderTaskState },
    { label: '待修图', minWidth: 200, render: renderTaskRepairPics },
    { label: '修图备注', minWidth: 120, prop: 'repairDescribe', ellipsis: true },
    { label: '创建信息', width: 200, render: renderCreateInfo },
    { label: '完成信息', width: 200, render: renderFinishInfo },
    {
      label: '操作',
      fixed: 'right',
      width: 100,
      render: (row) => {
        return createHandler(row, [
          {
            buttonText: '审核',
            isShow: item => permissions.SHRW.value && checkTaskCanAudit(item),
            onClick: () => openAuditDialog([row]),
          },
          {
            buttonText: '编辑',
            isShow: item => permissions.BJRW.value && checkTaskCanEdit(item),
            onClick: () => handleEdit(row),
          },
          {
            buttonText: '取消',
            isShow: item => permissions.QXRW.value && checkTaskCanCancel(item),
            buttonProps: { type: 'danger' },
            onClick: () => handleCancel(row),
          },
        ]);
      },
    },
  ];

  return {
    columns,
  };
};
