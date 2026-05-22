import { IMathMenuItem } from '@/modules/common/components/child-menu/types';
import { PROCESS_NODE_CODE_ENUM, PROCESS_STEP_CODE_ENUM } from '@/modules/clothes-center/constant';

/** 侧边栏类型 */
export enum ASIDE_TYPE_ENUM {
  PAPER_TASK_ORDER = 'PAPER_TASK_ORDER',
  PAPER_TASK_INSIDE = 'PAPER_TASK_INSIDE',
  PAPER_TASK_OUTSIDE = 'PAPER_TASK_OUTSIDE',
}

export interface IMenuItem extends IMathMenuItem {
  componentName?: ASIDE_TYPE_ENUM;
  processStep?: string;
  processNode?: string;
}

export const processStep = '300';

export const getMenus = (): IMenuItem[] => {
  const mode_ = 'paper-task';
  const menuLists = [
    {
      resourceName: '纸样分单',
      resourceUrl: `/clothes-center/${mode_}/order`,
      componentName: ASIDE_TYPE_ENUM.PAPER_TASK_ORDER,
      processStep: '300',
      processNode: '301',
      stepNodeStateList: [
        {
          // 待分单
          processStepCode: PROCESS_STEP_CODE_ENUM.PATTERN,
          processNodeCode: PROCESS_NODE_CODE_ENUM.PATTERN_ALLOCATE,
          nodeStateCode: '0'
        },
      ]
    },
    {
      resourceName: '内部纸样',
      resourceUrl: `/clothes-center/${mode_}/inside`,
      componentName: ASIDE_TYPE_ENUM.PAPER_TASK_INSIDE,
      processStep: '300',
      processNode: '302',
      stepNodeStateList: [
        {
          // 待提交
          processStepCode: PROCESS_STEP_CODE_ENUM.PATTERN,
          processNodeCode: PROCESS_NODE_CODE_ENUM.PATTERN_INNER_PROCESS,
          nodeStateCode: '4'
        },
      ]
    },
    {
      resourceName: '外部纸样',
      resourceUrl: `/clothes-center/${mode_}/outside`,
      componentName: ASIDE_TYPE_ENUM.PAPER_TASK_OUTSIDE,
      processStep: '300',
      processNode: '303',
      stepNodeStateList: [
        {
          // 待接单
          processStepCode: PROCESS_STEP_CODE_ENUM.PATTERN,
          processNodeCode: PROCESS_NODE_CODE_ENUM.PATTERN_OUTER_ACCEPT,
          nodeStateCode: '2'
        },
        {
          // 待提交
          processStepCode: PROCESS_STEP_CODE_ENUM.PATTERN,
          processNodeCode: PROCESS_NODE_CODE_ENUM.PATTERN_OUTER_PROCESS,
          nodeStateCode: '4'
        },
      ]
    },
  ];
  return menuLists;
};
