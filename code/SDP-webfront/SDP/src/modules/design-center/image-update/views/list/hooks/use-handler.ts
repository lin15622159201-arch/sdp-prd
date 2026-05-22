import { computed, ref } from 'vue';
import { usePermissionConfig } from '../../../use-permission-config';
import { ButtonProps, ElMessage, ElMessageBox } from 'element-plus';
import { useCreateDialog } from './use-dialog-create';
import { useUploadDialog } from './use-dialog-upload';
import { IImageUpdatePageItem } from '../../../api/type';
import { checkTaskCanAudit, checkTaskCanCancel, checkTaskCanUpload } from '../../../utils';
import { useAccountStore } from '@/store/account';
import { useAuditDialog } from './use-dialog-audit';
import { IPackFile, packFilesToZip } from '@/core/utils/download';
import { fetchImageUpdateCancel } from '../../../api';

interface IBatchButton {
  label: string;
  isHide?: boolean;
  disabled?: boolean;
  disabledTooltip?: string;
  elProps?: Partial<ButtonProps>;
  onClick: () => void;
}
interface IProps {
  handleSearch: () => void;
}
export const useHandler = ({ handleSearch }: IProps) => {
  const permissions = usePermissionConfig();
  const { account } = useAccountStore();
  const { openCreateDialog } = useCreateDialog();
  const { openUploadDialog } = useUploadDialog(handleSearch);
  const { openAuditDialog } = useAuditDialog(handleSearch);

  const selectedList = ref<IImageUpdatePageItem[]>([]);
  const isNotSelected = computed(() => selectedList.value.length === 0);
  // 是否可上传
  const canUpload = computed(() => selectedList.value.some(item => checkTaskCanUpload(item.taskStatus)));
  const checkAudit = (item: IImageUpdatePageItem) => checkTaskCanAudit(item.taskStatus) && item.creatorId === account?.id;
  // 是否可审核
  const canAudit = computed(() => selectedList.value.some(checkAudit));
  // 是否可取消
  const canCancel = computed(() => selectedList.value.some(item => checkTaskCanCancel(item.taskStatus)));

  const handleSelectionChange = (list: IImageUpdatePageItem[]) => {
    selectedList.value = list || [];
  };

  /**
   * 批量取消
   */
  const handleBatchCancel = () => {
    ElMessageBox.confirm('确认取消所选图片/视频更新任务吗？', '提示', {
      type: 'warning',
    }).then(async () => {
      await fetchImageUpdateCancel(selectedList.value.map(item => item.taskId));
      ElMessage.success('批量取消成功');
      handleSearch();
    });
  };

  /**
   * 批量审批
   */
  const handleBatchAudit = () => {
    openAuditDialog(selectedList.value.filter(checkAudit));
  };

  /**
   * 批量上传
   */
  const handleBatchUpload = () => {
    openUploadDialog(selectedList.value.filter(item => checkTaskCanUpload(item.taskStatus)));
  };

  /**
   * 获取单个款式的下载文件
   */
  const getStyleDownloadFiles = (style: IImageUpdatePageItem) => {
    const files:IPackFile[] = [];
    style.skcList.forEach((skc, skcIndex) => {
      skc.pictures?.forEach((image, index) => {
        const imageName = `${style.spuCode}_SKC${skcIndex + 1}_营销图_${index + 1}`;
        if (image.pictureUrl) {
          files.push({ url: image.pictureUrl, name: imageName });
        }
        if (image.attachment) {
          files.push({ url: image.attachment, name: `${imageName}_修图说明` });
        }
        if (image.pictureDescribe) {
          files.push({ content: image.pictureDescribe, convertTo: 'txt', name: `${imageName}_修图需求说明`, url: '' });
        }
      });
      if (Array.isArray(skc.resultPictures)) {
        skc.resultPictures.forEach((url, index) => {
          const imageName = `${style.spuCode}_SKC${skcIndex + 1}_更新结果_${index + 1}`;
          files.push({ url, name: imageName });
        });
      }
    });
    if (style.repairDescribe) {
      files.push({ content: style.repairDescribe, convertTo: 'txt', name: `${style.spuCode}_修图需求说明`, url: '' });
    }
    if (style.repairAttachment) {
      files.push({ url: style.repairAttachment, name: `${style.spuCode}_修图说明` });
    }
    return files;
  };

  /**
   * 批量下载图片
   */
  const handleBatchDownload = () => {
    if (selectedList.value.length === 1) {
      // 打包单个文件夹
      const { spuCode, taskCode } = selectedList.value[0];
      const files = getStyleDownloadFiles(selectedList.value[0]);
      packFilesToZip(files, `${spuCode}_${taskCode}`);
      return;
    }
    // 打包多个文件夹
    const folders = selectedList.value.map((item) => {
      const folderName = `${item.spuCode}_${item.taskCode}`;
      const files = getStyleDownloadFiles(item);
      return { children: files, name: folderName, url: '' };
    });
    packFilesToZip(folders, '图片更新任务');
  };

  const buttonList = computed(() => {
    const buttons: IBatchButton[] = [
      {
        label: '取消任务',
        isHide: !permissions.QXRW.value,
        elProps: {
          type: 'danger',
          plain: true,
        },
        disabled: !canCancel.value,
        disabledTooltip: '请先选中【待处理】或【待返修】或【待审核】任务',
        onClick: handleBatchCancel
      },
      {
        label: '审核任务',
        isHide: !permissions.SHRW.value,
        elProps: {
          type: 'primary',
          plain: true,
        },
        disabled: !canAudit.value,
        disabledTooltip: '请先选中【当前用户】的【待审核】任务',
        onClick: () => handleBatchAudit()
      },
      {
        label: '创建任务',
        isHide: !permissions.CJRW.value,
        elProps: {
          type: 'primary',
          plain: true,
        },
        onClick: openCreateDialog
      },
      {
        label: '下载图片',
        isHide: !permissions.XZTP.value,
        elProps: {
          type: 'primary',
        },
        disabled: isNotSelected.value,
        onClick: handleBatchDownload
      },
      {
        label: '上传图片',
        isHide: !permissions.SCTP.value,
        elProps: {
          type: 'primary',
        },
        disabled: !canUpload.value,
        disabledTooltip: '请先选中【待处理】或【待返修】任务',
        onClick: handleBatchUpload
      }
    ];
    return buttons.filter(item => !item.isHide);
  });

  return {
    selectedList,
    buttonList,
    handleSelectionChange,
  };
};
