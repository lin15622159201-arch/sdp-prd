import microApp, { EventCenterForMicroApp } from '@micro-zoe/micro-app';
import { MICRO_APP_MAP } from '../constant';
import mitt from '@/core/event';
import { IEvents } from '@/core/event/type';

interface AppEventData<T = unknown> {
  /**
   * 事件类型
   */
  type: string;
  /**
   * 来源: app code
   */
  from: string;
  /**
   * 数据
   */
  data: Record<string, T>;
}

function getEventCenter() {
  const eventCenter: Record<string, EventCenterForMicroApp> = Object.create(null);

  Object.keys(MICRO_APP_MAP).forEach((appName) => {
    const { APP_CODE } = MICRO_APP_MAP[appName];
    eventCenter[APP_CODE] = new EventCenterForMicroApp(APP_CODE);

    microApp.addDataListener(APP_CODE, (event: AppEventData) => {
      const { from, type, data } = event;
      const eventKey = `${from}__${type}`;
      // 不做过滤，有绑定就触发
      mitt.emit(eventKey as keyof IEvents, data as any /** 具体类型绑定时定义 */);
    });
  });

  return new Proxy(eventCenter, {
    get(target, key) {
      if (key in target) {
        return target[key as keyof typeof target];
      }
      return undefined;
    },
    set() {
      return true;
    },
  });
}

export default getEventCenter;
