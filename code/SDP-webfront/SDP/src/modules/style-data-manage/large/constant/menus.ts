import { IMathMenuItem } from '@/modules/common/components/child-menu/types';

export enum ASIDE_TYPE_ENUM {
  /** 任务分单 */
  DISPATCH = 'DISPATCH',
  /** 内部处理 */
  INNER_HANDLE = 'INNER_HANDLE',
  /** 外部处理 */
  OUTER_HANDLE = 'OUTER_HANDLE',
}

export interface IMenuItem extends IMathMenuItem {
  props?: string[];
  componentName?: ASIDE_TYPE_ENUM;
}

export const processStep = '300';

export const getMenus = (): IMenuItem[] => {
  const mode_ = 'style-sew';
  const menuLists = [
    {
      resourceName: '任务分单',
      resourceUrl: `/clothes-center/${mode_}/dispatch`,
      componentName: ASIDE_TYPE_ENUM.DISPATCH,
      props: ['unallocatedCount'],
      count: '0',
    },
    {
      resourceName: '内部处理',
      resourceUrl: `/clothes-center/${mode_}/car`,
      componentName: ASIDE_TYPE_ENUM.INNER_HANDLE,
      props: ['internalUnSubCount'],
      count: '0',
    },
    {
      resourceName: '外部处理',
      resourceUrl: `/clothes-center/${mode_}/outer`,
      componentName: ASIDE_TYPE_ENUM.OUTER_HANDLE,
      props: ['externalUnSubCount', 'externalUnReceivingCount'],
      count: '0',
    },
  ];
  return menuLists;
};
