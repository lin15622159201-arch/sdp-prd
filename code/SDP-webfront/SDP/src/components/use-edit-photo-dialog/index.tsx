import { useDialog } from '@toy/business-components';
import { ref } from 'vue';
import PhotoEditor from './photo-editor/index.vue';
import './style.scss';

export type HandleOpenDialog = (copyTarget: {
  url: string;
}) => void;

type Props = {
  handleSuccess: (url: string) => void;
};

export const useEditPhotoDialog = ({ handleSuccess }: Props) => {
  const photoUrl = ref('');

  const { openDialog, closeDialog } = useDialog(() => ({
    title: '',
    fullscreen: true,
    showConfirmBtn: false,
    showCancelBtn: false,
    showClose: false,
    class: 'clear-dialog-body-padding clear-dialog-header-padding clear-dialog-inner-scroll',
    render() {
      return (
        <PhotoEditor
          confirm-button-text='确认'
          url={photoUrl.value}
          onSave={savePhotoEditor}
          onCancel={closePhotoEditor}
        />
      );
    },
  }));

  const savePhotoEditor = (url: string) => {
    closeDialog();
    handleSuccess(url);
  };
  const closePhotoEditor = () => {
    closeDialog();
  };

  const handleOpenDialog: HandleOpenDialog = ({ url }) => {
    photoUrl.value = url;
    openDialog();
  };

  return {
    handleOpenDialog
  };
};
