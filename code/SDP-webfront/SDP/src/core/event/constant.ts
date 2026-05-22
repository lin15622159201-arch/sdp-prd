import { useEventConfig } from '@/core/plugins/micro-app/hooks/use-event-config';

const HOULIU_BOM_APP_EVENT = useEventConfig();

export const EVENT_BUS_ENUM = Object.freeze({
  /** 更新当前激活菜单 */
  UPDATE_ACTIVE_MENU: 'UPDATE_ACTIVE_MENU',
  /**
   * 微前端事件
   *
   * @see https://zhijing19.feishu.cn/docx/doxcneueRGXyYPA1Riwp4ghBfXg
   */
  HOULIU_BOM_APP: HOULIU_BOM_APP_EVENT,
});
