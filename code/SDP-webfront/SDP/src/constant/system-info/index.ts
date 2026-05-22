import { nameZh, name } from '@root/package.json';
import { capitalize } from 'lodash-es';

const getSystemEnglishName = () => {
  const arr = name.split('-');
  return arr.map(v => capitalize(v)).join(' ');
};
export const SYSTEM_INFO_ENUM = {
  COPYRIGHT: 'Copyright © 2021 广州致景信息科技有限公司',
  SYSTEM_NAME: nameZh,
  SYSTEM_ENGLISH_NAME: getSystemEnglishName(),
};
