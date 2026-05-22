import { IConfigItem } from '@toy/business-components';
import { computed, Ref } from 'vue';
import { CANCEL_NODE_LIST, UNDERTAKE_WAY_LIST, SAMPLE_TYPE_LIST, CURRENT_NODE_ENUM } from '../constant';
import { ISecondCraftListReq } from '../api/types';

interface IProps {
  params: Ref<ISecondCraftListReq>;
}

export const useSearch = ({ params }: IProps) => {
  const searchConfig = computed<IConfigItem[]>(() => {
    const list: IConfigItem[] = [
      {
        name: 'SKC',
        component: 'input',
        valueName: 'designCode',
      },
      {
        name: '工艺类型',
        component: 'slot',
        slotName: 'craftTypeList',
      }
    ];
      // 已关闭，去除创建时间，显示取消时间、取消环节
    if (!params.value.state || ![CURRENT_NODE_ENUM.BEING_CLOSED].includes(params.value.state)) {
      list.push({
        name: '创建时间',
        component: 'datePicker',
        valueName: ['currentStateCreatedTimeStart', 'currentStateCreatedTimeEnd'],
      });
    }
    // 已关闭的不显示
    if (CURRENT_NODE_ENUM.BEING_CLOSED === params.value.state) {
      list.push({
        name: '取消时间',
        component: 'datePicker',
        valueName: ['cancelTimeStart', 'cancelTimeEnd'],
      });
    }
    if (CURRENT_NODE_ENUM.BEING_CLOSED !== params.value.state) {
      list.push({
        name: '当前耗时',
        component: 'slot',
        slotName: 'timeConsumingStart',
      });
    }
    const list2: IConfigItem[] = [
      {
        name: '设计师',
        component: 'slot',
        slotName: 'designerIdList',
      },
      {
        name: '设计组别',
        component: 'slot',
        slotName: 'designerGroupCodeList',
      },
      {
        name: '工艺环节',
        component: 'slot',
        slotName: 'craftsProcessCode',
      },
    ];
    if (params.value.state === CURRENT_NODE_ENUM.BEING_CLOSED) {
      list2.push({
        name: '取消环节',
        component: 'select',
        valueName: 'cancelPreState',
        options: CANCEL_NODE_LIST,
      });
    }
    return [
      ...list,
      ...list2,
      {
        name: '样衣版本',
        valueName: 'clothesVersion',
        component: 'slot',
        slotName: 'clothesVersion',
      },
      {
        name: '承接方式',
        component: 'select',
        valueName: 'undertakeType',
        options: UNDERTAKE_WAY_LIST,
      },
      {
        name: '打版类型',
        component: 'select',
        valueName: 'sampleType',
        options: SAMPLE_TYPE_LIST,
      },
    ];
  });
  return {
    searchConfig,
  };
};
