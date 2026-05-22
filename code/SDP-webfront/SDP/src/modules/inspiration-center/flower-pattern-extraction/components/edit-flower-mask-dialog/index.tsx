import { useDialog } from '@toy/business-components';
import { ref } from 'vue';
import PhotoMaskEditor from '@/components/photo-mask-editor/index.vue';
import { FLOWER_LEFT_TOOL_ENUM } from '@/components/photo-mask-editor/store/useRemoveWrinklesToolBarStore';
import { useFlowerLoopTask } from '../../views/list/hooks/use-flower-loop-task';
import { IWebWrinkleEliminateRes, IWebWrinkleMarkRes } from '../../api/type';
import { getWebWrinkleEliminate, getWebWrinkleMark, wrinkleEliminateCreate, wrinkleMarkCreate } from '../../api';
import { getImageSize } from '@/core/utils/image';
import { hideFullScreenLoading, showFullScreenLoading } from '@/core/http/helper';
import { ElMessage } from 'element-plus';
import { FLOWER_PATTERN_EXTRACTION_CUSTOM_LEFT_TOOL_KEY } from '../../constant';

export type HandleOpenDialog = (params: {
  /** 原图 */
  url: string;
  /** mask图 */
  maskUrl: string;
  /** 自动识别参数，有值时候可以自动识别 */
  refOriPatchUrl: string;
}) => void;

type Props = {
  handleRmoveWiinklesSuccess: (url: string) => void;
};

const flowerLeftToolBal = [FLOWER_LEFT_TOOL_ENUM.SAM, FLOWER_LEFT_TOOL_ENUM.BRUSH, FLOWER_LEFT_TOOL_ENUM.ERASER,
  FLOWER_LEFT_TOOL_ENUM.RECT];

export const useEditFLowerPhotoMaskDialog = ({ handleRmoveWiinklesSuccess }: Props) => {
  const config = ref({
    /** 原图 */
    url: '',
    cacheUrl: '',
    /** mask图 */
    maskUrl: '',
    /** 从衣服切出来的原始patch，后台详情接口里取 */
    refOriPatchUrl: '',
  });

  /**
   * 花型提取-自动识别-详情轮询
   */
  const {
    handleStartLoopTask: startAutoWrinklesMask,
    clearLoop: clearAutoWinklesMask
  } = useFlowerLoopTask<IWebWrinkleMarkRes>({
    apiFu: getWebWrinkleMark,
    handleSuccess(data: IWebWrinkleMarkRes) {
      console.log(data);
      hideFullScreenLoading();
      config.value.maskUrl = data.resImg;
      if (!data.resImg) {
        ElMessage.warning('未识别到褶皱区域，请手动涂抹!');
      }
    }
  });

  /**
   * 花型提取-开始消除-详情轮询
   */
  const {
    handleStartLoopTask: startRmoveWrinklesTask,
    clearLoop: clearRemoveWinklesTask
  } = useFlowerLoopTask<IWebWrinkleEliminateRes>({
    apiFu: getWebWrinkleEliminate,
    handleSuccess(data: IWebWrinkleEliminateRes) {
      console.log(data);
      hideFullScreenLoading();
      config.value.url = data.resImg;
      config.value.maskUrl = '';
    }
  });
  /**
   * 自动识别
   */
  const handleAuto = async () => {
    console.log('自动识别');
    try {
      showFullScreenLoading();
      const { url, cacheUrl, refOriPatchUrl } = config.value;
      const { width, height } = await getImageSize(url);
      const { data } = await wrinkleMarkCreate({
        refImgUrl: url,
        // 消除褶皱后，需要传入原图的patch，不然自动识别的还是原来的图
        refOriPatchUrl: !refOriPatchUrl || url !== cacheUrl ? url : refOriPatchUrl,
        refImgHeight: height,
        refImgWidth: width,
      });
      startAutoWrinklesMask(data);
    } catch (error) {
      console.error(error);
      hideFullScreenLoading();
      clearAutoWinklesMask();
    }
  };

  /**
   * 开始消除
   */
  const handleRemove = async (maskUrl: string) => {
    console.log('开始消除');
    try {
      showFullScreenLoading();
      const { data } = await wrinkleEliminateCreate({
        refImgUrl: config.value.url,
        maskUrl,
      });
      startRmoveWrinklesTask(data);
    } catch (error) {
      console.error(error);
      hideFullScreenLoading();
      clearRemoveWinklesTask();
    }
  };

  const { openDialog, closeDialog } = useDialog(() => ({
    title: '',
    fullscreen: true,
    showConfirmBtn: false,
    showCancelBtn: false,
    showClose: false,
    destroyOnClose: true,
    class: 'clear-dialog-body-padding clear-dialog-header-padding clear-dialog-inner-scroll',
    render() {
      console.log(config.value);
      return (
        <PhotoMaskEditor
          title='消除褶皱'
          url={config.value.url}
          maskUrl={config.value.maskUrl}
          customLeftToolId={FLOWER_PATTERN_EXTRACTION_CUSTOM_LEFT_TOOL_KEY}
          onConfirm={savePhotoEditor}
          onCancel={closePhotoEditor}
          onRemoveWrinkles={handleRemove}
          onAuto={handleAuto}
          leftTool={flowerLeftToolBal}
          useSplit={false}
        />
      );
    },
  }));

  const savePhotoEditor = () => {
    const { url: imgUrl, cacheUrl } = config.value;
    if (imgUrl === cacheUrl) {
      ElMessage.warning('请先消除褶皱后，在保存！');
      return;
    }
    handleRmoveWiinklesSuccess(config.value.url);
    closeDialog();
  };
  const closePhotoEditor = () => {
    closeDialog();
  };

  const handleOpenDialog: HandleOpenDialog = ({ url, maskUrl, refOriPatchUrl }) => {
    config.value.url = url;
    config.value.cacheUrl = url;
    config.value.maskUrl = maskUrl;
    config.value.refOriPatchUrl = refOriPatchUrl;
    openDialog();
  };

  return {
    handleOpenDialog
  };
};
