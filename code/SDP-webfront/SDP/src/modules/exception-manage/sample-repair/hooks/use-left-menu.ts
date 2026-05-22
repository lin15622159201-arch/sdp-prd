import { ILeftMenuTreeItem } from '@/components/left-menu-tree/type';
import { computed, Ref, ref } from 'vue';
import { REPAIR_STEP_ENUMS } from '../constant';
import { IRepairCountRes } from '../api/type';
import { getRepairCountApi } from '../api';

export interface IMathMenuItem extends ILeftMenuTreeItem {
  mathScope?: REPAIR_STEP_ENUMS[] | boolean;
  [k: string]: any;
  childList?: IMathMenuItem[];
}

export enum MENU_RESOURCE_URL_ENUM {
  /** 全部 */
  ALL = 'ALL',
  /** 返修分单 */
  REPAIR = 'REPAIR',
  /**
   * 内部返修
   */
  INNER = 'INNER',
  /**
   * 外部返修-待接单
   */
  OUTER_WAIT_ORDER = 'OUTER_WAIT_ORDER',
  /**
   * 外部返修-返修中
   */
  OUTER_REPAIRING = 'OUTER_REPAIRING',
  /**
   * 外部返修-收货
   */
  OUTER_RECEIVE = 'OUTER_RECEIVE',
  /**
   * 外部返修-确认耗时
   */
  OUTER_CONFIRMATION_TIME = 'CONFIRMATION_TIME',
  /**
   * 已完成
   */
  COMPLETED = 'COMPLETED',
  /**
   * 已取消
   */
  CANCELLED = 'CANCELLED',
}

export const menu = ref<IMathMenuItem[]>([
  {
    resourceName: '全部',
    resourceUrl: MENU_RESOURCE_URL_ENUM.ALL,
    isCount: false,
    mathScope: true,
  },
  {
    resourceName: '返修分单',
    resourceUrl: MENU_RESOURCE_URL_ENUM.REPAIR,
    mathScope: [REPAIR_STEP_ENUMS.PENDINGORDERS, REPAIR_STEP_ENUMS.DIVIDEDORDER],
  },
  {
    resourceName: '内部返修',
    resourceUrl: MENU_RESOURCE_URL_ENUM.INNER,
    mathScope: [
      REPAIR_STEP_ENUMS.PENDING,
      REPAIR_STEP_ENUMS.INPROGESS,
      // REPAIR_STEP_ENUMS.COMPLETED
    ],
  },
  {
    resourceName: '外部返修',
    resourceUrl: '外部返修',
    resourceType: '',
    childList: [
      {
        resourceName: '待接单',
        resourceUrl: MENU_RESOURCE_URL_ENUM.OUTER_WAIT_ORDER,
        mathScope: [REPAIR_STEP_ENUMS.PENDINGORDER],
      },
      {
        resourceName: '返修中',
        resourceUrl: MENU_RESOURCE_URL_ENUM.OUTER_REPAIRING,
        resourceType: '',
        mathScope: [REPAIR_STEP_ENUMS.REPAIEING],
      },
      {
        resourceName: '收货',
        resourceUrl: MENU_RESOURCE_URL_ENUM.OUTER_RECEIVE,
        resourceType: '',
        mathScope: [REPAIR_STEP_ENUMS.TOBERECEIVE],
      },
      {
        resourceName: '确认耗时',
        resourceUrl: MENU_RESOURCE_URL_ENUM.OUTER_CONFIRMATION_TIME,
        mathScope: [REPAIR_STEP_ENUMS.TOBECONFIRMED],
      },
    ],
  },
  {
    resourceName: '已完成',
    resourceUrl: MENU_RESOURCE_URL_ENUM.COMPLETED,
    isCount: false,
  },
  {
    resourceName: '已取消',
    resourceUrl: MENU_RESOURCE_URL_ENUM.CANCELLED,
    isCount: false,
  },
]);

/* 获得导航项数量 */
const getScopeCounts = (counts: Ref<IRepairCountRes>, mathScope: string[] | boolean) => {
  const res = counts.value?.reduce((pass, current) => {
    const isCan = typeof mathScope === 'boolean' && mathScope;
    const yes = isCan || (mathScope as string[])?.includes(current.code);
    if (yes) pass.count += +current.count || 0;
    return pass;
  }, { count: 0 });
  return res.count || 0;
};

/* 获得导航项数量 */
const getScopeCountsObj = (counts: Ref<IRepairCountRes>, mathScope: string[] | boolean) => {
  const res = counts.value?.reduce((pass: Record<string, number>, current) => {
    const isCan = typeof mathScope === 'boolean' && mathScope;
    const yes = isCan || (mathScope as string[])?.includes(current.code);
    if (yes) {
      pass[current.code] = +current.count || 0;
    }
    return pass;
  }, {});
  return res || 0;
};

/**
 * menuList 混入数量统计
 * @param menuList 二次菜单
 * @param counts 服务端统计数据
 * @returns { menuList }
 */
export const menuListAddCounts = (
  menuList: Ref<IMathMenuItem[]>,
  counts: Ref<IRepairCountRes>,
) => {
  const matchCounts = (current: IMathMenuItem) => {
    if (current.mathScope === undefined && current?.childList?.length) {
      /* 累加子节点的计算范围 */
      const scopes = current.childList.reduce((pass: string[], cur: IMathMenuItem) => {
        const curScope = Array.isArray(cur.mathScope) ? cur.mathScope : [];
        return [...pass, ...curScope];
      }, []);
      current.count = getScopeCounts(counts, scopes);
    } else if (Array.isArray(current.mathScope) && current.mathScope.length) {
      /* 计算自身scope */
      const countObj = getScopeCountsObj(counts, current.mathScope);
      if (countObj) {
        current.count = Object.keys(countObj).reduce((pre, cur) => {
          pre += countObj[cur];
          return pre;
        }, 0);
      }
      current.countObj = getScopeCountsObj(counts, current.mathScope);
    }
    if (current?.childList?.length) current.childList.forEach((item: IMathMenuItem) => matchCounts(item));
    return current;
  };
  return computed(() => {
    return menuList.value.map((item: IMathMenuItem) => matchCounts(item));
  });
};

/**
 * 查询二级菜单计数
 */
export const getMenuCounts = async (countData: Ref<IRepairCountRes>) => {
  const { data } = await getRepairCountApi({});
  countData.value = data || [];
};

export const getMenuList = (countData: Ref<IRepairCountRes>) => {
  /**
   * 更新二级菜单统计数量
   */
  const countsUpdate = () => {
    getMenuCounts(countData);
  };

  return {
    countsUpdate,
    menuList: menuListAddCounts(menu, countData),
  };
};

export function useMenuList() {
  const countData = ref<IRepairCountRes>([]);
  // getMenuCounts(countData);
  const { menuList, countsUpdate } = getMenuList(countData);
  // return menuListAddCounts(menu, countData);
  return { menuList, countsUpdate };
}
