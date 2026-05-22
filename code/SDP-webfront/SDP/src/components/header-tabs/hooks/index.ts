import { ref, onMounted } from 'vue';
import { isUndefined } from 'lodash-es';
import { LabelListItem } from '@/core/plugins/filter';

interface IHeaderTabs<T, U> {
  /**
   * 枚举列表
   */
  list: LabelListItem<T>[];
  /**
   * 获取数据方法
   */
  getData: () => U | Promise<U>;
  /**
   * 处理 tabList 中的 value 与 countsData 中的key 不一致时传入
   * getDate返回类型： 如果 返回数据中的对象 key 与 LabelListItem 中的 T 类型对应得上。则需要传入该参数
   * 例：
   * {
   *   T: '接口返回中 T 对应的 key', 例如 获取总数 接口放回 allCount 代表 T中的全部 则
   *   T.all: 'allCount'
   * }
   */
  keyMap?: any;
}

/*
* T list 中的 value 类型
* U getDate 放回类型
* */
export default function useHeaderTabs<T = any, U = any>(data: IHeaderTabs<T, U>) {
  const tabList = ref(data.list.map(item => Object.assign({ count: 0 }, item)));
  const handleGetCounts = async () => {
    const countsData = await data.getData();

    tabList.value.forEach((it) => {
      let key = it.value as keyof U;
      if (data.keyMap) {
        key = data.keyMap[it.value];
      }
      it.count = isUndefined(key) ? 0 : Number(countsData[key] || 0);
    });
  };

  onMounted(() => {
    handleGetCounts();
  });

  return {
    tabList,

    handleGetCounts,
  };
}
