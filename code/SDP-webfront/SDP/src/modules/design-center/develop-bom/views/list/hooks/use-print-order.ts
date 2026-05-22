import { reactive } from 'vue';
import { IPrintDataItem } from '../types';

export interface PrintState {
  visible: boolean;
  data: IPrintDataItem[]; // 当前工单详情
  type: string;// 打印工单类型
  customer: string[];// 客户图
  design: string[];// 设计图
}

/* 打印设计版单 */
export const usePrintOrder = () => {
  const printState = reactive<PrintState>({
    visible: false,
    type: '',
    data: [],
    customer: [],
    design: [],
  });

  const resetPrintState = () => {
    printState.visible = false;
    printState.type = '';
    printState.data = [];
    printState.customer = [];
    printState.design = [];
  };

  return {
    printState,
    resetPrintState,
    // startPrint,
  };
};
