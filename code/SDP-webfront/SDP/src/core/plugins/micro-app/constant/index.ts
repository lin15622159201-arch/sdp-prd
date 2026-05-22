import type { IMICRO_APP_MAP } from '../types';
/**
 * 好料网 - bom应用
 */
export const HOULIU_BOM_APP = {
  APP_CODE: 'houliu-app1',
  URL: 'houliu.textile-story.com/app1',
  // 开发服务
  DEV_SERVER: {
    port: '4007',
    base: '/child/vite/',
  },
} as const;

const SDP = {
  APP_CODE: 'SDP',
  URL: 'sdp.tiangong.tech',
  DEV_SERVER: {
    port: '8080',
    base: '/',
  },
};

export const MICRO_APP_MAP: IMICRO_APP_MAP = {
  HOULIU_BOM_APP,
  SDP,
} as const;

/**
 * get-material 事件 的场景
 *
 * 场景值： '1' - 面料详情、 '2' - 辅料详情、'3' - 物料车、 '4' - 收藏
 */
export enum GET_MATERIAL_EVENT_SCENE {
  /**
   * 面料详情
   */
  FABRIC = '1',
  /**
   * 辅料详情
   */
  ACCESSORIE = '2',
  /**
   * 物料车
   */
  MATERIAL_CART = '3',
  /**
   * 收藏
   */
  COLLECTION = '4',
}

export enum COMMODITY_TYPE {
  ACCESSORY = 'ACCESSORY',
  FABRIC = 'FABRIC',
}
