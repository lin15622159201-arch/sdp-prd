import { IConfigItem } from '@toy/business-components';
import { useList } from '@toy/v-use';
import { IMAGE_UPDATE_STATE_LIST, IMAGE_UPDATE_TASK_TYPE_LIST } from '../../../constant';
import { IImageUpdatePageReq } from '../../../api/type';
import { fetchImageUpdatePage, fetchImageUpdateStateTotal } from '../../../api';
import { computed, ref } from 'vue';
import { useDictionary } from '@/hooks/use-dictionary';
import { CUSTOM_DICTIONARY_KEY, DICTIONARY_KEY } from '@/constant/dictionary';
import { YES_NO_STRING_ENUM } from '@/constant';
import { useAccountStore } from '@/store/account';

export const useSearch = () => {
  const { getDictionaryOptions } = useDictionary();

  const SHOP_LIST = computed(() => getDictionaryOptions(CUSTOM_DICTIONARY_KEY.SHOP_LIST));
  const WAVE_BAND_LIST = computed(() => getDictionaryOptions(DICTIONARY_KEY.PLM_CLOTHING_BAND));
  const taskStatusCountMap = ref<Record<number, number>>([]);

  const searchConfig = computed<IConfigItem<IImageUpdatePageReq>[]>(() => [
    { name: '波段', valueName: 'wavebandCodes', component: 'select', props: { multiple: true }, options: WAVE_BAND_LIST.value },
    { name: '创建人', slotName: 'creatorId', component: 'slot' },
    {
      name: '创建时间',
      component: 'datePicker',
      valueName: ['createdStartTime', 'createdEndTime']
    },
    {
      name: '店铺',
      valueName: 'storeIds',
      component: 'select',
      props: { multiple: true },
      options: SHOP_LIST.value
    },
    { name: '设计师', slotName: 'desingerName', component: 'slot' },
    // 如果搜索范围是组内，隐藏设计组搜索项
    ...(searchRange.value !== 'group'
      ? [{ name: '设计组', slotName: 'designerGroupCodes', component: 'slot' }]
      : []) as IConfigItem<IImageUpdatePageReq>[],
    { name: '任务类型', valueName: 'taskType', component: 'select', options: IMAGE_UPDATE_TASK_TYPE_LIST },
    { name: 'SPU款号', slotName: 'spuCode', component: 'slot' },
    { name: '任务编号', slotName: 'taskCode', component: 'slot' },
  ]);

  const handleCodesStr = (codesStr?: string) => {
    if (!codesStr) return undefined;
    return codesStr.split(/,| /).map(code => code.trim()).filter(Boolean).join(',');
  };

  const searchRange = ref('');
  // 根据分组和我的搜索范围，处理请求参数
  const handleSearchRange = ({ designerIds, designerGroupCodes, ...args }: IImageUpdatePageReq) => {
    return {
      ...args,
      sameGroup: searchRange.value === 'group' ? YES_NO_STRING_ENUM.YES : undefined,
      designerIds: searchRange.value === 'me' ? [(useAccountStore().account?.id!)] : designerIds,
      // 如果搜索范围是组内，则不传设计组参数
      designerGroupCodes: searchRange.value !== 'group' ? designerGroupCodes : undefined,
    };
  };
  const {
    params,
    tableTotal,
    tableData,
    tableLoading,
    handleSearch,
    handleReset: onHandleReset,
    handleSizeChange,
    handleCurrentChange,
  } = useList({
    request: {
      api: fetchImageUpdatePage,
      params: {
        pageNum: 1,
        pageSize: 20,
      },
      handleParams({ spuCode, taskCode, ...args }) {
        return handleSearchRange({
          ...args,
          spuCode: handleCodesStr(spuCode),
          taskCode: handleCodesStr(taskCode),
        });
      }
    },
  });

  const getTastStatusCount = async () => {
    const { taskStatus, ..._params } = params.value;
    const { data } = await fetchImageUpdateStateTotal(handleSearchRange(_params));
    taskStatusCountMap.value = data.reduce((acc, cur) => {
      acc[cur.taskStatus] = cur.total;
      return acc;
    }, {} as Record<number, number>);
  };

  const handleSearchWithStatusCount = (pageNum?: number) => {
    handleSearch(pageNum);
    getTastStatusCount();
  };

  const conditionState = computed(() => {
    return {
      title: '任务状态：',
      conditionList: [{ value: '', label: '全部' }, ...IMAGE_UPDATE_STATE_LIST.map(item => ({
        label: `${item.label}(${taskStatusCountMap.value[item.value] || 0})`,
        value: item.value,
      }))
      ],
    };
  });

  const handleReset = () => {
    onHandleReset();
    getTastStatusCount();
  };

  return {
    searchConfig,
    conditionState,
    params,
    searchRange,
    tableTotal,
    tableData,
    tableLoading,
    handleSearch,
    handleSearchWithStatusCount,
    handleReset,
    handleSizeChange,
    handleCurrentChange,
  };
};
