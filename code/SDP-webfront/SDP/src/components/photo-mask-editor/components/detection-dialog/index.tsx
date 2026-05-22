import { computed, ref } from 'vue';
import { useDialog } from '@toy/business-components';
import CoordinateEditor from '@/components/coordinate-editor/index.vue';
import DetailEditor from '@/components/detail-editor/index.vue';
import { IData } from '@/components/coordinate-editor/types';
import { BOXES_TYPE_ENUM } from '@/components/coordinate-editor/constant';
import { ElButton } from 'element-plus';
import { imageUrl2Mat, cropMat, matToFile } from '@/core/utils/opencv';
import './index.scss';
import { uploadFile } from '@/api/open';
import { generateMaskImageUrl } from '@/core/utils/image';
import { DISPOSE_MASK_ENUM } from '@/components/detail-editor/types';

interface ICallback {
  // 识别结果图
  maskList: string[];
  // 生成图
  disposeMask: string;
  // 处理方式
  disposeType: DISPOSE_MASK_ENUM;
}
interface IProps {
  callback: (data: ICallback) => void;
}

export const useDetectionDialog = ({ callback }: IProps) => {
  // 矩形框编辑器
  const coordinateEditorRef = ref<InstanceType<typeof CoordinateEditor>>();
  // 细节识别组件
  const detailEditorRef = ref<InstanceType<typeof DetailEditor>>();
  // 矩形框所需参数
  const coordinateEditorData = ref<IData>({
    referencePicture: '',
    boxesType: BOXES_TYPE_ENUM.RECT,
  });
  // 预览mask图
  const previewMaskUrl = ref('');
  // 被裁剪图尺寸信息
  const cropPictureInfo = ref({
    width: 0,
    height: 0,
  });
  // 裁剪后数据
  const croppedData = ref({
    imageUrl: '', // 裁剪图url
    startX: 0,
    startY: 0,
    width: 0,
    height: 0,
  });
  // 裁剪图片
  const handleCropImage = async () => {
    // 计算矩形框选坐标
    const points = coordinateEditorRef.value?.getPoints();
    const [startPoint, endPoint] = points!.boxesList;
    // 左上角 向下取整，右下角 向上取整
    const startX = Math.floor(startPoint.x);
    const startY = Math.floor(startPoint.y);
    const endX = Math.ceil(endPoint.x);
    const endY = Math.ceil(endPoint.y);
    const width = endX - startX;
    const height = endY - startY;
    croppedData.value.startX = startX;
    croppedData.value.startY = startY;
    croppedData.value.width = width;
    croppedData.value.height = height;
    // 被裁剪图片
    const cropPictureMat = await imageUrl2Mat(coordinateEditorData.value.referencePicture);
    // 保存尺寸信息
    const cropPictureWidth = cropPictureMat.cols;
    const cropPictureHeight = cropPictureMat.rows;

    cropPictureInfo.value.width = cropPictureWidth;
    cropPictureInfo.value.height = cropPictureHeight;
    // 裁剪图
    const cropMatRes = cropMat(
      cropPictureMat,
      startX,
      startY,
      // 取整后，防止裁剪后图片超出边界
      Math.min(width, cropPictureWidth),
      Math.min(height, cropPictureHeight),
    );
    // 上传图片
    const file = matToFile(cropMatRes);
    const formData = new FormData();
    formData.append('files', file);
    const data = await uploadFile(formData);
    croppedData.value.imageUrl = data.data?.[0].url || '';
    // 清理内存
    cropPictureMat.delete();
    cropMatRes.delete();
  };
  // 开始识别
  const handleStartDetection = () => {
    handleCropImage();
  };

  // 确认
  const handleConfirm = async () => {
    const { maskList, disposeMask, disposeType } = await detailEditorRef.value!.getDetailInfo();
    // 将mask 生成裁剪前大小的图片
    const promises = maskList.map(
      (url: string) => generateMaskImageUrl(
        url,
        cropPictureInfo.value.width,
        cropPictureInfo.value.height,
        croppedData.value.startX,
        croppedData.value.startY,
      )
    );
    const generateMaskList = await Promise.all(promises);
    callback({
      maskList: generateMaskList,
      disposeMask,
      disposeType,
    });
    closeDialog();
  };

  const resetData = () => {
    coordinateEditorData.value.referencePicture = '';
    previewMaskUrl.value = '';
    croppedData.value.imageUrl = '';
    cropPictureInfo.value = {
      width: 0,
      height: 0,
    };
    croppedData.value = {
      imageUrl: '',
      startX: 0,
      startY: 0,
      width: 0,
      height: 0,
    };
  };

  const hasCoordinateEditor = computed(() => {
    return Boolean(!croppedData.value.imageUrl && coordinateEditorData.value.referencePicture);
  });
  const hasDetailEditor = computed(() => {
    return Boolean(croppedData.value.imageUrl && previewMaskUrl.value);
  });

  const { openDialog, closeDialog } = useDialog(() => ({
    title: '',
    fullscreen: true,
    showConfirmBtn: false,
    showCancelBtn: false,
    showClose: false,
    destroyOnClose: true,
    class: 'clear-dialog-body-padding clear-dialog-header-padding clear-dialog-inner-scroll',
    async onConfirm() {
      closeDialog();
    },
    onClose() {
      resetData();
    },
    render() {
      return (
        <div class='detection-dialog tw-bg-[#F2F4FA]'>
          <div class='
            tw-h-[80px]
            tw-bg-white
            tw-flex
            tw-items-center
            tw-justify-between
            tw-px-20px
            tw-mb-[1px]
            tw-flex-shrink-0'
          >
            <span class='tw-text-20px tw-font-bold tw-flex-shrink-0'>
              服装细节识别
            </span>
            <div>
              <ElButton
                class='tw-w-[88px] tw-font-normal tw-color-[#606166]'
                onClick={() => closeDialog()}
              >
                取消
              </ElButton>
              {
                croppedData.value.imageUrl ? (
                  <ElButton
                    class='tw-w-[88px] tw-ml-3'
                    type='primary'
                    onClick={() => handleConfirm()}
                  >
                    确定
                  </ElButton>
                ) : (
                  <ElButton
                    class='tw-w-[88px]'
                    type='primary'
                    onClick={() => handleStartDetection()}
                  >
                    开始识别
                  </ElButton>
                )
              }
            </div>
          </div>
          {
            hasCoordinateEditor.value ? (
              <div class='tips tw-flex tw-flex-center-x tw-leading-[20px] tw-font-bold'>
                <div class='tips-step'>
                  <div class='tw-text-center'>
                    <span class='step-icon'>1</span>
                  </div>
                  <div class='tw-mt-10px'>
                    点击图片，框选需要识别细节的区域
                  </div>
                </div>
                <div class='tw-px-20px'>---</div>
                <div class='tips-step'>
                  <div class='tw-text-center'>
                    <span class='step-icon'>2</span>
                  </div>
                  <div class='tw-mt-10px'>
                    点击开始识别，自动分割所选区域的细节图
                  </div>
                </div>
              </div>
            ) : null
          }
          <div class='detection-dialog-main'>
            {
              hasDetailEditor.value ? (
                <DetailEditor
                  detailImageUrl={croppedData.value.imageUrl}
                  previewMaskUrl={previewMaskUrl.value}
                  coordinate={{
                    x: croppedData.value.startX,
                    y: croppedData.value.startY,
                  }}
                  ref={detailEditorRef}
                />
              ) : null
            }

            {
              hasCoordinateEditor.value ? (
                <CoordinateEditor
                  data={coordinateEditorData.value}
                  defaultTool={BOXES_TYPE_ENUM.RECT}
                  showTools={false}
                  ref={coordinateEditorRef}
                />
              ) : null
            }
          </div>
        </div>
      );
    },
  }));

  /**
   * 打开对话框
   * @param url 需要识别的图片
   * @param refUrl
   */
  const handleOpenDialog = ({ maskUrl, url }: { url: string; maskUrl: string; }) => {
    previewMaskUrl.value = maskUrl;
    coordinateEditorData.value.referencePicture = url;
    openDialog();
  };

  return {
    handleOpenDialog,
  };
};
