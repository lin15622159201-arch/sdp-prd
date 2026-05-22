import { ref } from 'vue';
import { cloneDeep } from 'lodash-es';
import {
  getStepNodeStateCount,
} from '@/modules/clothes-center/api';
import { IStepNodeStateCountRes } from '@/modules/clothes-center/api/types';
import { IMathMenuItem } from '@/modules/common/components/child-menu/types';
import NP, { plus } from 'number-precision';

export interface IMenuItem extends IMathMenuItem {
  componentName?: string;
  processStepCode?: string;
  processNode?: string;
  processNodeCode?: string;
}

export const useStepState = () => {
  const menusList = ref();
  const stepNodeStateCountData = ref<IStepNodeStateCountRes>([]);
  // 打版统计列表(车版、纸样使用)
  const getStepNodeStateCountList = async (params = {}) => {
    const { data } = await getStepNodeStateCount({
      clothesStep: '',
      clothesNode: '',
      clothesStepNodeState: '',
      ...params,
    });
    stepNodeStateCountData.value = cloneDeep(data);
  };
  // 更新menu列表的count值(车版、纸样、3D使用)
  const updateMenuCount = (menu: IMenuItem[], dataList: IStepNodeStateCountRes) => {
    const getCount = (
      processStep: string,
      processNode: string,
      stepNodeStateList?: any
    ) => {
      let arr: string[] = [];
      if (stepNodeStateList && stepNodeStateList.length > 0) {
        stepNodeStateList.forEach((item: IMenuItem) => {
          // eslint-disable-next-line vue/max-len
          const foundItems = dataList.filter(it => it.processStepCode === item.processStepCode && it.processNodeCode === item.processNodeCode && it.nodeStateCode === item.nodeStateCode);
          arr.push(...(foundItems || []).map(v => v.unFinishCount ?? '0'));
        });
      } else {
        // eslint-disable-next-line vue/max-len
        arr = dataList
          .filter(item => item.processStepCode === processStep && item.processNodeCode === processNode)
          .map(v => v.unFinishCount ?? '0');
      }
      return plus(...arr);
    };
    const processMenuItems = (menuItems: IMenuItem[]) => {
      menuItems.forEach((item) => {
        item.count = getCount(item.processStep, item.processNode!, item.stepNodeStateList);
        if (item.childList && item.childList.length > 0) {
          processMenuItems(item.childList);
          item.count = item.childList.reduce((sum, child) => NP.plus(sum, child.count || 0), item.count || 0);
        }
      });
    };
    processMenuItems(menu);
  };

  // 获取并更新
  const getStepNodeStateCountListAndUpdateMenu = async (menu: IMenuItem[], params = {}) => {
    await getStepNodeStateCountList(params);
    updateMenuCount(menu, stepNodeStateCountData.value);
  };

  // 获取componentName对应的processStep和processNode
  const findStepNodeByName = (componentName: string, menus: any[]) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const menu of menus) {
      // 如果当前菜单匹配componentName，返回processStep和processNode
      if (menu.componentName === componentName) {
        return {
          processStep: menu.processStep,
          processNode: menu.processNode
        };
      }
      // 如果存在子菜单（childList），递归查找
      if (menu.childList) {
        const result: any = findStepNodeByName(componentName, menu.childList);
        if (result) return result;
      }
    }
    return null; // 如果没有找到
  };

  return {
    menusList,
    getStepNodeStateCountList,
    stepNodeStateCountData,
    getStepNodeStateCountListAndUpdateMenu,
    findStepNodeByName,
  };
};
