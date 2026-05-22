import { useList } from '@/hooks/use-list';
import { fetchReplaceColorTaskPage } from '../../api';
import type { IReplaceColorTaskPageItem, IReplaceColorTaskPageReq } from '../../api/type';
import type { IConditionInfo, IConfigItem } from '@toy/business-components';
import { TASK_STATUS_ENUM, TASK_STATUS_LIST, TASK_TYPE_ENUM } from '@/constant/task';
import { computed, onActivated } from 'vue';
import { useDictionary } from '@/hooks/use-dictionary2';
import { DICTIONARY_KEY } from '@/constant/dictionary';

type IReq = IReplaceColorTaskPageReq & { taskCodeStr?: string; };
export const useSearch = (afterSearch: () => void) => {
  const { tableData, tableTotal, params, handleSearch, handleReset, handleCurrentChange, handleSizeChange } = useList<IReplaceColorTaskPageItem, IReq>({
    request: {
      api: fetchReplaceColorTaskPage,
      params: {
        pageNum: 1,
        pageSize: 20
      },
      handleParams: ({ taskCodeStr, ..._params }) => {
        // 处理查询参数
        return {
          ..._params,
          taskCodeList: taskCodeStr ? taskCodeStr.split(/,| /).filter(Boolean) : undefined,
        };
      }
    },
    response: {
      handleResponseData: (data) => {
        afterSearch();
        return data;
      }
    }
  });
  onActivated(() => {
    // handleSearch();
  });
  handleSearch();

  const { getEnableDictionaryOptions } = useDictionary();
  const taskSourceList = computed(() => {
    const list = getEnableDictionaryOptions(DICTIONARY_KEY.AIFUNCTIONCALL_CONFIGURATION);
    // 只显示能发送到服装换色的任务来源
    return list.filter(item => item.attributes?.some(attr => attr.code === TASK_TYPE_ENUM.REPLACE_COLOR));
  });

  const searchConfig = computed<IConfigItem<IReq>[]>(() => [
    { name: '任务编号', valueName: 'taskCodeStr', component: 'input', props: { placeholder: '支持批量查询，空格或","隔开' } },
    { name: '创建人', slotName: 'creatorId', component: 'slot' },
    { name: '创建时间', valueName: ['startTime', 'endTime'], component: 'datePicker' },
    { name: '任务来源', valueName: 'taskSource', component: 'select', options: taskSourceList.value },
  ]);

  const conditionInfo: IConditionInfo = {
    title: '生成状态：',
    conditionList: [
      {
        value: '',
        label: '全部',
      },
      ...TASK_STATUS_LIST.filter(item => item.value !== TASK_STATUS_ENUM.TIMEOUT).map(item => ({
        label: item.label,
        value: item.value,
      })),
    ],
  };

  return {
    tableData,
    tableTotal,
    params,
    searchConfig,
    conditionInfo,
    handleSearch,
    handleReset,
    handleCurrentChange,
    handleSizeChange
  };
};
