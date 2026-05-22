import type {
  HOULIU_BOM_APP_EVENT_TYPE,
} from '@/core/plugins/micro-app/hooks/use-event-config';
import { EVENT_BUS_ENUM } from './constant';

export type IEvents = HOULIU_BOM_APP_EVENT_TYPE & {
  [EVENT_BUS_ENUM.UPDATE_ACTIVE_MENU]: string;
};
