import { ISizeConfigListResSizeConfigListItem } from './api/type';

export type ISizeConfig = ISizeConfigListResSizeConfigListItem & {
  children?: ISizeConfig[];
  name: string;
};
