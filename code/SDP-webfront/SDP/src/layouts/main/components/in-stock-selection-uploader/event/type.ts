import { EVENT_BUS_ENUM } from './constant';
import { IAddUploaderTaskPayload, IUpdateSuccessComponentPropsPayload } from '../type';

// 定义事件类型
export type IEvents = {
  [EVENT_BUS_ENUM.ADD_UPLOADER_TASK]: IAddUploaderTaskPayload;
  [EVENT_BUS_ENUM.UPDATE_SUCCESS_COMPONENT_PROPS]: IUpdateSuccessComponentPropsPayload;
};
