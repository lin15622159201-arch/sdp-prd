import { useDialog } from '@toy/business-components';
import { computed, ref, watch } from 'vue';
import { IImageUpdatePageItem } from '../../../api/type';
import { useRejectReasonEditDialog } from './use-dialog-reject-reason-edit';
import BatchUploader from '../../../component/batch-uploader.vue';
import { fetchImageUpdateBatchCheck } from '../../../api';
import { IMAGE_UPDATE_AUDIT_RESULT_ENUM } from '../../../constant';
import { ElMessage, ElMessageBox } from 'element-plus';

export const useAuditDialog = (onSuccess: () => void) => {
  const styleList = ref<IImageUpdatePageItem[]>([]);
  const batchUploaderRef = ref<InstanceType<typeof BatchUploader>>();
  const auditedIndexMap = ref<{ [taskId: string]: boolean; }>({});
  const currentAuditStatus = computed<boolean | undefined>(() => {
    const { activeStyle } = batchUploaderRef.value || {};
    if (!activeStyle) return undefined;
    return auditedIndexMap.value[activeStyle.taskId];
  });

  const { openRejectReasonEditDialog } = useRejectReasonEditDialog(() => {
    const { activeStyle } = batchUploaderRef.value || {};
    auditedIndexMap.value[activeStyle!.taskId] = false;
    onSuccess?.();
    batchUploaderRef.value?.next();
  });

  const handleReject = () => {
    openRejectReasonEditDialog(batchUploaderRef.value!.activeStyle);
  };
  const handleConfirm = async () => {
    const { activeStyle } = batchUploaderRef.value || {};
    if (!activeStyle) {
      ElMessage.error('请选择一个风格');
      return;
    }
    ElMessageBox.confirm('确定审核通过吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
      await fetchImageUpdateBatchCheck([{
        taskId: activeStyle.taskId,
        result: IMAGE_UPDATE_AUDIT_RESULT_ENUM.YES,
        skcList: batchUploaderRef.value!.activeSkcList
      }]);
      auditedIndexMap.value[activeStyle.taskId] = true;
      ElMessage.success('审核通过成功');
      batchUploaderRef.value?.next();
      onSuccess?.();
    });
  };

  const { openDialog } = useDialog(() => ({
    title: '批量审核更新结果',
    width: 1080,
    render() {
      return (
        <BatchUploader ref={batchUploaderRef} styleList={styleList.value}>
          {{
            'style-item-info': (item: { data: IImageUpdatePageItem; index: number; }) => {
              const auditStatus = auditedIndexMap.value[item.data.taskId];
              if (auditStatus === true) {
                return <el-tag type='success'>审核通过</el-tag>;
              }
              if (auditStatus === false) {
                return <el-tag type='danger'>审核不通过</el-tag>;
              }
              return undefined;
            }
          }}
        </BatchUploader>
      );
    },
    renderFooter: () => {
      if (typeof currentAuditStatus.value === 'boolean') {
        return undefined;
      }
      return (
        <>
          <el-button onClick={handleReject}>审核不通过</el-button>
          <el-button type='primary' onClick={handleConfirm}>
            审核通过
          </el-button>
        </>
      );
    },
  }));

  const openAuditDialog = (selectedList: IImageUpdatePageItem[]) => {
    styleList.value = selectedList;
    openDialog();
  };

  return { openAuditDialog };
};
