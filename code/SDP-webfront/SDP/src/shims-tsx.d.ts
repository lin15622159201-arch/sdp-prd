import { IFilters, IHas } from '@/core/plugins/filter';
import { JSBridge } from '@/core/bridge';
import { ENV_ENUM } from '@/core/http/env';
import { EventCenterForMicroApp } from '@micro-zoe/micro-app';

declare global {
  type Char = string | number;
  interface Window {
    JSBridge: JSBridge;
    // eslint-disable-next-line camelcase
    h5_Android: { [key: string]: any; };

    webkit: {
      messageHandlers: { [key: string]: any; };
    };
    $frontEnv: ENV_ENUM;
    $system: string;
    microAppEventCenter: Record<string, EventCenterForMicroApp>;
    CHILD_APP_CODE: string;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $filters: IFilters;
    $has: IHas;
  }
  export interface GlobalComponents {
    AddressPicker: typeof import('./components/address-picker')['default'];
    Pagination: typeof import('./components/pagination')['default'];
    Upload: typeof import('./components/upload')['default'];
    InputNumber: typeof import('./components/input-number')['default'];
    InputNumberRanger: typeof import('./components/input-number-ranger')['default'];
    QuerySelect: typeof import('./components/query-select')['default'];
    Empty: typeof import('./components/empty')['default'];
    Tabs: typeof import('./components/tabs')['default'];
    DictionarySelect: typeof import('./components/dictionary-select')['default'];
    HeaderArea: typeof import('./components/header-area')['default'];
    DetailTitle: typeof import('./components/detail-title')['default'];
    CustomLogs: typeof import('./components/custom-logs')['default'];
    ColorCascader: typeof import('./components/color-cascader')['default'];
    Uploader: typeof import('./components/uploader')['default'];
    CustomImage: typeof import('./components/custom-image')['default'];
    OperationDrawer: typeof import('./components/operation-drawer')['default'];
  }
}
