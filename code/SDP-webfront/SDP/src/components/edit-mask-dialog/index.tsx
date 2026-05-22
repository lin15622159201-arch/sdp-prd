import { useDialog } from '@toy/business-components';
import { ref } from 'vue';
import PhotoMaskEditor from '@/components/photo-mask-editor/index.vue';
import { TOOL_ENUM } from '@/components/photo-mask-editor/store/useToolBarStore';
// import './edit-photo-dialog.scss';

interface IConfig {
  url: string;
  maskUrl: string;
  maskUrlList?: string[];
}

export type HandleOpenDialog = (params: IConfig) => void;

type Props = {
  handleSuccess: (url: string) => void;
};

export const useEditPhotoMaskDialog = ({ handleSuccess }: Props) => {
  const config = ref<IConfig>({
    url: '',
    maskUrl: '',
    maskUrlList: [],
  });

  const savePhotoEditor = (url: string) => {
    closeDialog();
    handleSuccess(url);
  };
  const closePhotoEditor = () => {
    closeDialog();
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
      return (
        <PhotoMaskEditor
          url={config.value.url}
          maskUrl={config.value.maskUrl}
          maskUrlList={config.value.maskUrlList}
          leftTool={[TOOL_ENUM.SAM, TOOL_ENUM.UNDO_SAM,
            TOOL_ENUM.BRUSH, TOOL_ENUM.ERASER,
            TOOL_ENUM.DETAIL_DETECTION]}
          onConfirm={savePhotoEditor}
          onCancel={closePhotoEditor}
        />
      );
    },
  }));

  const handleOpenDialog: HandleOpenDialog = ({ url, maskUrl, maskUrlList }) => {
    config.value.url = url;
    config.value.maskUrl = maskUrl;
    config.value.maskUrlList = maskUrlList;
    openDialog();
  };

  return {
    handleOpenDialog
  };
};
