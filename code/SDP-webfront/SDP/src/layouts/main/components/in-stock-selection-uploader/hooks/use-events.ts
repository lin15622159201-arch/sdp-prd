import { onMounted, onUnmounted } from 'vue';
import { IUseUpload } from './use-upload';
import { EVENT_BUS_ENUM } from '../event/constant';
import eventBus from '../event';

export const useEvents = (
  addUploaderTask: IUseUpload['addUploaderTask'],
  updateSuccessComponentProps: IUseUpload['updateSuccessComponentProps'],
) => {
  onMounted(() => {
    eventBus.on(EVENT_BUS_ENUM.ADD_UPLOADER_TASK, addUploaderTask);
    eventBus.on(EVENT_BUS_ENUM.UPDATE_SUCCESS_COMPONENT_PROPS, updateSuccessComponentProps);
  });

  onUnmounted(() => {
    eventBus.off(EVENT_BUS_ENUM.ADD_UPLOADER_TASK, addUploaderTask);
    eventBus.off(EVENT_BUS_ENUM.UPDATE_SUCCESS_COMPONENT_PROPS, updateSuccessComponentProps);
  });
};
