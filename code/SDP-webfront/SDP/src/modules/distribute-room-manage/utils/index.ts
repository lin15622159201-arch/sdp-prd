import { getRoute } from '@/core/utils/route-util';
import { EXTERNAL_ROOM_MAPS, EXTERNAL_ROOM_DETAIL_LISTS, EXTERNAL_ROOM_DETAIL_MAPS } from '../constant';

export const getExternalRoomEnum = () => {
  const { path } = getRoute();
  const subPath = path?.split('/')[2];
  return EXTERNAL_ROOM_MAPS[subPath as keyof typeof EXTERNAL_ROOM_MAPS];
};

export const getRoomEnumForDetailRouter = () => {
  const { path } = getRoute();
  const subPath = path?.split('/')[2];

  return EXTERNAL_ROOM_DETAIL_MAPS[subPath as keyof typeof EXTERNAL_ROOM_DETAIL_MAPS];
};

export const getRouterLinkName = (type: keyof typeof EXTERNAL_ROOM_DETAIL_LISTS) => {
  const { path } = getRoute();
  const subPath = path?.split('/')[2];
  const list = EXTERNAL_ROOM_DETAIL_LISTS[type];
  return list[subPath as keyof typeof EXTERNAL_ROOM_MAPS];
};

export function isEmpty(val: string | undefined | null) {
  return val === null || val === '' || val === undefined;
}

export function formatPhoneHide(phone: string | undefined | null, defaultValue = '-') {
  if (isEmpty(phone)) {
    return defaultValue;
  }
  const phoneNumber = phone?.toString();
  return `${phoneNumber?.substr(0, 3)}****${phoneNumber?.substr(9, 11)}`;
}

/**
 * 校验 手机
 * 规则: 以1为开头，总共11位数
 * @export
 * @param {*} val
 * @returns
 */
export function isMobileSimple(val: string | number) {
  const reg = /^1\d{10}$/;
  return reg.test(val.toString());
}

export const isPartTimeRoom = () => {
  const { path } = getRoute();
  const subPath = path?.split('/')[2];
  if (subPath?.indexOf('part-time-room') > -1) {
    return true;
  }
  return false;
};

export const getEditPath = () => {
  const { path } = getRoute();
  const subPath = path?.split('/')[2];
  const _path = subPath.replace('detail', 'edit');
  return _path;
};

export const getDetailPath = () => {
  const { path } = getRoute();
  const subPath = path?.split('/')[2];
  let _path = subPath.replace('add', 'detail');
  _path = _path.replace('edit', 'detail');
  return _path;
};

export const getListPath = () => {
  const { path } = getRoute();
  const subPath = path?.split('/')[2];
  const _path = subPath.replace('detail', 'list');
  return _path;
};

export const getExternalRoomType = () => {
  const { path } = getRoute();
  const subPath = path?.split('/')[2];
  let _path = subPath.replace('add', 'list');
  _path = _path.replace('edit', 'list');
  return EXTERNAL_ROOM_MAPS[_path as keyof typeof EXTERNAL_ROOM_MAPS];
};
