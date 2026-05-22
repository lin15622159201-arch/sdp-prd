import { IConfigItem } from '@toy/business-components';
import { computed, Ref, ref } from 'vue';
import { MAKE_CLOTHES_TYPE_LIST } from '@/modules/clothes-center/constant';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { ISampleAuditPageReq } from '../api/types';
import { STATUS_LIST_ENUM } from '../constant';

export const useSearch = (params: Ref<ISampleAuditPageReq>) => {
  const { getDictionaryOptions } = useDictionary();
  /** 波段 */
  const plmClothingBand = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.PLM_CLOTHING_BAND) || [];
  });
  const searchConfig = computed<IConfigItem[]>(() => (
    [
      {
        name: 'SKC',
        component: 'input',
        valueName: 'designCode',
        props: {
          placeholder: '请输入',
          clearable: true,
        }
      },
      {
        name: 'SPU',
        component: 'input',
        valueName: 'styleCode',
        props: {
          placeholder: '请输入',
          clearable: true,
        }
      },
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
        name: '审版工艺师',
        component: 'slot',
        slotName: 'reviewCraftsmanId',
      },
      {
        name: '打版方式',
        component: 'select',
        valueName: 'makeClothesType',
        options: MAKE_CLOTHES_TYPE_LIST,
      },
      {
        name: '波段',
        component: 'select',
        valueName: 'waveBandCodeList',
        props: {
          multiple: true,
          filterable: true,
          collapseTags: true,
        },
        options: plmClothingBand.value
      },
      {
        name: '质检师',
        component: 'slot',
        slotName: 'qualityCheckerId',
      },
      // {
      //   name: '耗时',
      //   component: 'slot',
      //   slotName: 'timeConsuming',
      // },
      {
        name: '创建时间',
        component: 'datePicker',
        valueName: ['auditCreatedTimeStart', 'auditCreatedTimeEnd'],
      },
      {
        name: '提交时间',
        component: 'datePicker',
        valueName: ['startAuditTime', 'endAuditTime'],
        // isHidden: params.value.auditStatus === STATUS_LIST_ENUM.WAIT,
      },
    ]));
  return {
    searchConfig,
  };
};
