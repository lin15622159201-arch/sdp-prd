import { IMathMenuItem } from '@/modules/common/components/child-menu/types';
import { PROCESS_NODE_CODE_ENUM, PROCESS_STEP_CODE_ENUM } from '@/modules/clothes-center/constant';

/** 侧边栏类型 */
export enum ASIDE_TYPE_ENUM {
  SAMPLE_TASK_ORDER = 'SAMPLE_TASK_ORDER',
  SAMPLE_TASK_INSIDE = 'SAMPLE_TASK_INSIDE',
  SAMPLE_TASK_OUTSIDE = 'SAMPLE_TASK_OUTSIDE',
}

export interface IMenuItem extends IMathMenuItem {
  componentName?: ASIDE_TYPE_ENUM;
  processStep?: string;
  processNode?: string;
}

export const processStep = '500';
export const getMenus = (): IMenuItem[] => {
  const mode_ = 'sample-task';
  const menuLists = [
    {
      resourceName: '3D分单',
      resourceUrl: `/clothes-center/${mode_}/order`,
      componentName: ASIDE_TYPE_ENUM.SAMPLE_TASK_ORDER,
      processStep: '500',
      processNode: '501',
      stepNodeStateList: [
        {
          // 待分单
          processStepCode: PROCESS_STEP_CODE_ENUM.DIMENSION,
          processNodeCode: PROCESS_NODE_CODE_ENUM.DIMENSION_ALLOCATE,
          nodeStateCode: '0'
        },
      ]
    },
    {
      resourceName: '内部处理',
      resourceUrl: `/clothes-center/${mode_}/inside`,
      componentName: ASIDE_TYPE_ENUM.SAMPLE_TASK_INSIDE,
      processStep: '500',
      processNode: '502',
      stepNodeStateList: [
        {
          // 待提交
          processStepCode: PROCESS_STEP_CODE_ENUM.DIMENSION,
          processNodeCode: PROCESS_NODE_CODE_ENUM.DIMENSION_INNER_PROCESS,
          nodeStateCode: '0'
        },
      ]
    },
    {
      resourceName: '外部处理',
      resourceUrl: `/clothes-center/${mode_}/outside`,
      componentName: ASIDE_TYPE_ENUM.SAMPLE_TASK_OUTSIDE,
      processStep: '500',
      processNode: '503',
      stepNodeStateList: [
        {
          // 待接单
          processStepCode: PROCESS_STEP_CODE_ENUM.DIMENSION,
          processNodeCode: PROCESS_NODE_CODE_ENUM.DIMENSION_OUTER_ACCEPT,
          nodeStateCode: '1'
        },
        {
          // 待提交
          processStepCode: PROCESS_STEP_CODE_ENUM.DIMENSION,
          processNodeCode: PROCESS_NODE_CODE_ENUM.DIMENSION_OUTER_PROCESS,
          nodeStateCode: '0'
        },
      ]
    },
  ];
  return menuLists;
};
