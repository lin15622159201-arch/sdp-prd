import { Picture, Delete } from '@element-plus/icons-vue';
import { useDialog } from '@toy/business-components';
import { useUploadDialog } from './use-upload-dialog';
import { selectionRemarkAdd, selectionRemarkDelete, selectionRemarkList } from '../api';
import { ref, watch } from 'vue';
import { ISelectionRemarkItem } from '../api/type';
import { ElMessage, ElMessageBox } from 'element-plus';
import { resizeImgByWidth } from '@/core/plugins/helper';

/**
 * 备注弹框所需参数
 */
export interface UseRemarkDialogProps {
  styleSelectionId: string;
}

export type TotalRemark = (total:number) => void;
export type HandleOpenDialog = (data: UseRemarkDialogProps, total?:TotalRemark) => void;
export const useRemarkDialog = () => {
  const styleSelectionId = ref('');
  const remark = ref('');
  const remarkList = ref<ISelectionRemarkItem[]>([]);
  const imgUrl = ref('');

  const totalRemarkCallback = ref<TotalRemark>();

  const { handleUpload } = useUploadDialog((url: string) => {
    imgUrl.value = url;
  });
  /**
   * 查询备注列表函数
   */
  const handleQueryRemarkList = async () => {
    const { data } = await selectionRemarkList(styleSelectionId.value);
    remarkList.value = data;
  };
  /**
   * 删除备注函数
   * @param remarkId 备注id
   */
  const handleDeleteRemark = async (remarkId: string, index: number) => {
    await ElMessageBox.confirm('确定删除吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    });
    await selectionRemarkDelete({ ids: [remarkId] });
    remarkList.value.splice(index, 1);
    ElMessage.success('删除成功!');
  };

  const handleAddRemark = async () => {
    if (imgUrl.value === '' && remark.value === '') {
      ElMessage.warning('输入备注或请上传图片之后再进行提交!');
      return;
    }
    await selectionRemarkAdd({
      remark: remark.value,
      remarkUrl: imgUrl.value,
      styleSelectionId: styleSelectionId.value,
    });
    remark.value = '';
    imgUrl.value = '';
    ElMessage.success('新增备注成功!');
  };

  const { openDialog, closeDialog } = useDialog(() => ({
    title: ('备注'),
    width: 600,
    class: 'clear-dialog-body-padding',
    confirmText: ('提交'),
    cancelText: ('取消'),
    center: true,
    onClose: () => {
      remark.value = '';
      imgUrl.value = '';
    },
    onConfirm: async () => {
      await handleAddRemark();
      await handleQueryRemarkList();
    },
    render: () => {
      return (
        <div class='tw-p-4 '>
          <el-scrollbar max-height='400px'>
            {
              remarkList.value.map((item, index) => {
                return (
                  <div class='tw-flex tw-flex-col tw-p-4'>
                    <div class='tw-flex tw-items-center tw-justify-between tw-mb-2'>
                      <span class='tw-font-bold'>{item.creatorName}</span>
                      <span class='tw-text-gray-500 tw-mr-auto tw-ml-3'>{item.createdTime}</span>
                      <el-button
                        icon={Delete}
                        link
                        onClick={() => handleDeleteRemark(item.remarkId as unknown as string, index)}
                      />
                    </div>
                    <div class='tw-flex tw-flex-col tw-gap-2'>
                      <p>{item.remark}</p>
                      {
                        item.remarkUrl && (
                          <el-image
                            src={resizeImgByWidth(item.remarkUrl, 300)}
                            class='tw-mt-2 tw-w-100px tw-h-100px tw-rounded-4px'
                            fit='cover'
                            preview-src-list={[imgUrl.value]}
                            preview-teleported
                          />
                        )
                      }
                    </div>
                  </div>
                );
              })
            }
            { remarkList.value.length === 0 && <empty /> }
          </el-scrollbar>
          <el-input
            v-model:modelValue={remark.value}
            placeholder='添加备注'
            class='tw-h-9'
            maxlength={200}
          >
            {{
              suffix: () => (
                <el-button
                  icon={Picture}
                  link
                  onClick={handleUpload}
                />
              )
            }}
          </el-input>
          {
            imgUrl.value !== '' && (
              <el-image
                src={resizeImgByWidth(imgUrl.value, 300)}
                class='tw-w-100px tw-h-100px tw-rounded-4px'
                fit='cover'
                preview-src-list={[imgUrl.value]}
                preview-teleported
              />
            )
          }
        </div>
      );
    }
  }));

  const handleOpenDialog: HandleOpenDialog = async (props:UseRemarkDialogProps, totalCallback?:TotalRemark) => {
    openDialog();
    styleSelectionId.value = props.styleSelectionId;
    totalRemarkCallback.value = totalCallback;
    handleQueryRemarkList();
  };

  watch(remarkList, (nel) => {
    if (nel.length > 0) {
      totalRemarkCallback.value && totalRemarkCallback.value(remarkList.value.length);
    }
  });

  return {
    handleOpenDialog,
  };
};
