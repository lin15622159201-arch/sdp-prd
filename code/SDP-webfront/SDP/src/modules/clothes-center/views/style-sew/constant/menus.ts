import { IMathMenuItem } from '@/modules/common/components/child-menu/types';
import { PROCESS_NODE_CODE_ENUM, PROCESS_STEP_CODE_ENUM } from '@/modules/clothes-center/constant';

/** 侧边栏类型 */
export enum ASIDE_TYPE_ENUM {
  /** 齐套签收 */
  COLLECTLIST = 'COLLECTLIST',
  /** 车版分单 */
  CAR_ORDER_SEPERATE = 'CAR_ORDER_SEPERATE',
  /** 内部车版 */
  CAR_INSIDE_CUT = 'CAR_INSIDE_CUT',
  CAR_INSIDE_SLICE = 'CAR_INSIDE_SLICE',
  CAR_INSIDE_SEAM = 'CAR_INSIDE_SEAM',
  CAR_OUTSIDE_CUT = 'CAR_OUTSIDE_CUT',
  CAR_OUTSIDE_SEAM = 'CAR_OUTSIDE_SEAM',
  CAR_OUTSIDE_SLICE = 'CAR_OUTSIDE_SLICE',
  CAR_OUTSIDE_DELIVERY = 'CAR_OUTSIDE_DELIVERY',
  CAR_PRODUCT_REPROCESS = 'CAR_PRODUCT_REPROCESS',
  CAR_QC_LIST = 'CAR_QC_LIST',
}

export interface IMenuItem extends IMathMenuItem {
  componentName?: ASIDE_TYPE_ENUM;
}

export const getMenus = (): IMenuItem[] => {
  const mode_ = 'style-sew';
  const menuLists = [
    {
      resourceName: '齐套签收',
      resourceUrl: `/clothes-center/${mode_}/collect-list`,
      componentName: ASIDE_TYPE_ENUM.COLLECTLIST,
      processStep: PROCESS_STEP_CODE_ENUM.SEW,
      processNode: PROCESS_NODE_CODE_ENUM.SEW_FABRIC_ACCESSORIES_SIGN_IN,
      stepNodeStateList: [
        {
          // 待签收
          processStepCode: PROCESS_STEP_CODE_ENUM.SEW,
          processNodeCode: PROCESS_NODE_CODE_ENUM.SEW_FABRIC_ACCESSORIES_SIGN_IN,
          nodeStateCode: '0'
        }
      ]
    },
    {
      resourceName: '车版',
      resourceUrl: `/clothes-center/${mode_}/car`,
      childList: [
        {
          resourceName: '车版分单',
          resourceUrl: `/clothes-center/${mode_}/car/order-seperate`,
          componentName: ASIDE_TYPE_ENUM.CAR_ORDER_SEPERATE,
          processStep: PROCESS_STEP_CODE_ENUM.SEW,
          processNode: PROCESS_NODE_CODE_ENUM.SEW_ALLOCATE,
          stepNodeStateList: [
            {
              // 待签收
              processStepCode: PROCESS_STEP_CODE_ENUM.SEW,
              processNodeCode: PROCESS_NODE_CODE_ENUM.SEW_ALLOCATE,
              nodeStateCode: '0'
            }
          ],
        },
        {
          resourceName: '内部车版',
          resourceUrl: `/clothes-center/${mode_}/car/inside`,
          childList: [
            {
              resourceName: '裁剪',
              resourceUrl: `/clothes-center/${mode_}/car/inside/cut`,
              componentName: ASIDE_TYPE_ENUM.CAR_INSIDE_CUT,
              processStep: PROCESS_STEP_CODE_ENUM.SEW,
              processNode: PROCESS_NODE_CODE_ENUM.SEW_INNER_PROCESS_CUTTING,
              stepNodeStateList: [
                {
                  // 裁剪中
                  processStepCode: PROCESS_STEP_CODE_ENUM.SEW,
                  processNodeCode: PROCESS_NODE_CODE_ENUM.SEW_INNER_PROCESS_CUTTING,
                  nodeStateCode: '1'
                }
              ],
            },
            {
              resourceName: '裁片二次工艺',
              resourceUrl: `/clothes-center/${mode_}/car/inside/slice`,
              componentName: ASIDE_TYPE_ENUM.CAR_INSIDE_SLICE,
              processStep: PROCESS_STEP_CODE_ENUM.SEW,
              processNode: PROCESS_NODE_CODE_ENUM.SEW_INNER_PROCESS_CUTTING_SECOND_CRAFT,
              stepNodeStateList: [
                {
                  // 进行中
                  processStepCode: PROCESS_STEP_CODE_ENUM.SEW,
                  processNodeCode: PROCESS_NODE_CODE_ENUM.SEW_INNER_PROCESS_CUTTING_SECOND_CRAFT,
                  nodeStateCode: '1'
                }
              ],
            },
            {
              resourceName: '车缝',
              resourceUrl: `/clothes-center/${mode_}/car/inside/seam`,
              componentName: ASIDE_TYPE_ENUM.CAR_INSIDE_SEAM,
              processStep: PROCESS_STEP_CODE_ENUM.SEW,
              processNode: PROCESS_NODE_CODE_ENUM.SEW_INNER_PROCESS,
              stepNodeStateList: [
                {
                  // 进行中
                  processStepCode: PROCESS_STEP_CODE_ENUM.SEW,
                  processNodeCode: PROCESS_NODE_CODE_ENUM.SEW_INNER_PROCESS,
                  nodeStateCode: '0'
                },
                {
                  // 车缝中
                  processStepCode: PROCESS_STEP_CODE_ENUM.SEW,
                  processNodeCode: PROCESS_NODE_CODE_ENUM.SEW_INNER_PROCESS,
                  nodeStateCode: '1'
                },
                {
                  // 半成品工艺中
                  processStepCode: PROCESS_STEP_CODE_ENUM.SEW,
                  processNodeCode: PROCESS_NODE_CODE_ENUM.SEW_INNER_PROCESS_HALF_SECOND_CRAFT,
                  nodeStateCode: '1'
                }
              ],
            },
          ]
        },
        {
          resourceName: '外部车版',
          resourceUrl: `/clothes-center/${mode_}/car/outside`,
          childList: [
            {
              resourceName: '裁剪',
              resourceUrl: `/clothes-center/${mode_}/car/outside/cut`,
              componentName: ASIDE_TYPE_ENUM.CAR_OUTSIDE_CUT,
              processStep: PROCESS_STEP_CODE_ENUM.SEW,
              processNode: '408',
              stepNodeStateList: [
                {
                  // 待接单
                  processStepCode: PROCESS_STEP_CODE_ENUM.SEW,
                  processNodeCode: PROCESS_NODE_CODE_ENUM.SEW_OUTER_PROCESS_ACCEPT,
                  nodeStateCode: '2'
                },
                {
                  // 进行中
                  processStepCode: PROCESS_STEP_CODE_ENUM.SEW,
                  processNodeCode: PROCESS_NODE_CODE_ENUM.SEW_OUTER_PROCESS_CUTTING,
                  nodeStateCode: '1'
                },
              ],
            },
            {
              resourceName: '裁片二次工艺',
              resourceUrl: `/clothes-center/${mode_}/car/outside/slice`,
              componentName: ASIDE_TYPE_ENUM.CAR_OUTSIDE_SLICE,
              processStep: PROCESS_STEP_CODE_ENUM.SEW,
              processNode: PROCESS_NODE_CODE_ENUM.SEW_OUTER_PROCESS_CUTTING_SECOND_CRAFT,
              stepNodeStateList: [
                {
                  // 进行中
                  processStepCode: PROCESS_STEP_CODE_ENUM.SEW,
                  processNodeCode: PROCESS_NODE_CODE_ENUM.SEW_OUTER_PROCESS_CUTTING_SECOND_CRAFT,
                  nodeStateCode: '1'
                },
              ],
            },
            {
              resourceName: '车缝',
              resourceUrl: `/clothes-center/${mode_}/car/outside/seam`,
              componentName: ASIDE_TYPE_ENUM.CAR_OUTSIDE_SEAM,
              processStep: PROCESS_STEP_CODE_ENUM.SEW,
              processNode: '410',
              stepNodeStateList: [
                {
                  // 进行中
                  processStepCode: PROCESS_STEP_CODE_ENUM.SEW,
                  processNodeCode: PROCESS_NODE_CODE_ENUM.SEW_OUTER_PROCESS,
                  nodeStateCode: '0'
                },
                {
                  // 半成品工艺中
                  processStepCode: PROCESS_STEP_CODE_ENUM.SEW,
                  processNodeCode: PROCESS_NODE_CODE_ENUM.SEW_OUTER_PROCESS_HALF_SECOND_CRAFT,
                  nodeStateCode: '1'
                },
                {
                  // 车缝中
                  processStepCode: PROCESS_STEP_CODE_ENUM.SEW,
                  processNodeCode: PROCESS_NODE_CODE_ENUM.SEW_OUTER_PROCESS,
                  nodeStateCode: '1'
                },
              ],
            },
            {
              resourceName: '收货',
              resourceUrl: `/clothes-center/${mode_}/car/outside/delivery`,
              componentName: ASIDE_TYPE_ENUM.CAR_OUTSIDE_DELIVERY,
              processStep: PROCESS_STEP_CODE_ENUM.SEW,
              processNode: PROCESS_NODE_CODE_ENUM.SEW_OUTER_PROCESS_RECEIVING,
              stepNodeStateList: [
                {
                  // 待收货
                  processStepCode: PROCESS_STEP_CODE_ENUM.SEW,
                  processNodeCode: PROCESS_NODE_CODE_ENUM.SEW_OUTER_PROCESS_RECEIVING,
                  nodeStateCode: '0'
                },
              ],
            },
          ]
        },
        {
          resourceName: '成品二次工艺',
          resourceUrl: `/clothes-center/${mode_}/car/product-reprocess`,
          componentName: ASIDE_TYPE_ENUM.CAR_PRODUCT_REPROCESS,
          processStep: PROCESS_STEP_CODE_ENUM.SEW,
          processNode: PROCESS_NODE_CODE_ENUM.SEW_PRODUCT_SECOND_CRAFT,
          stepNodeStateList: [
            {
              // 进行中
              processStepCode: PROCESS_STEP_CODE_ENUM.SEW,
              processNodeCode: PROCESS_NODE_CODE_ENUM.SEW_PRODUCT_SECOND_CRAFT,
              nodeStateCode: '1'
            },
          ],
        },
        {
          resourceName: '样衣质检',
          resourceUrl: `/clothes-center/${mode_}/car/qc-list`,
          componentName: ASIDE_TYPE_ENUM.CAR_QC_LIST,
          processStep: PROCESS_STEP_CODE_ENUM.QC,
          processNode: PROCESS_NODE_CODE_ENUM.SAMPLE_QC,
          stepNodeStateList: [
            {
              // 进行中
              processStepCode: PROCESS_STEP_CODE_ENUM.QC,
              processNodeCode: PROCESS_NODE_CODE_ENUM.SAMPLE_QC,
              nodeStateCode: '0'
            },
          ],
        },
      ]
    },
  ];
  return menuLists;
};
