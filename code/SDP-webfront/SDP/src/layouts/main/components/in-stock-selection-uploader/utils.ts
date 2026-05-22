import { EVENT_BUS_ENUM } from './event/constant';
import eventBus from './event';
import { IAddUploaderTaskPayload } from './type';

export const addUploaderTask = (payload: IAddUploaderTaskPayload) => {
  eventBus.emit(EVENT_BUS_ENUM.ADD_UPLOADER_TASK, payload);
};

export const updateSuccessComponentProps = (taskId: string, props: Record<string, any>) => {
  eventBus.emit(EVENT_BUS_ENUM.UPDATE_SUCCESS_COMPONENT_PROPS, {
    taskId,
    props,
  });
};
