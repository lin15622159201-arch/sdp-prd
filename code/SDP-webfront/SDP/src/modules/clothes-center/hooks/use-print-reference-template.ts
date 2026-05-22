import { ref } from 'vue';
import { YES_NO_NUMBER_ENUM } from '@/constant';
import {
  positionTemplateListWithEntry, sizeTemplateList,
  sewingComponentTemplatePage
} from '@/modules/clothes-center/api';
import {
  IPositionTemplateListWithEntryResItem, ITemplateListResItem,
  ISewingComponentTemplatePageResListItem
} from '@/modules/clothes-center/api/types';

/**
 * 模板搜索
 * @returns
 */
export const usePrintReferenceTemplate = () => {
  const referenceTemplateList = ref<IPositionTemplateListWithEntryResItem[]>([]);
  const referenceSizeTemplateList = ref<ITemplateListResItem[]>([]); // 尺寸模板列表
  const sewingComponentTemplateList = ref<ISewingComponentTemplatePageResListItem[]>([]); // 部件模板列表

  const getReferenceTemplate = async () => {
    try {
      const params = {
        positionTemplateName: '',
        pageNum: 1,
        pageSize: 1000,
        state: YES_NO_NUMBER_ENUM.YES,
      };
      const { data } = await positionTemplateListWithEntry(params);
      referenceTemplateList.value = data ?? [];
    } catch (err) {
      console.error(err);
    }
  };
  const getSizeTemplateList = async (query?: string) => {
    try {
      const params = {
        templateName: query ? query.trim() : '',
        threeCategory: '',
        pageNum: 1,
        pageSize: 1000,
        state: YES_NO_NUMBER_ENUM.YES,
      };
      const { data } = await sizeTemplateList(params);
      referenceSizeTemplateList.value = data ?? [];
    } catch (err) {
      console.error(err);
    }
  };

  const getSewingComponentTemplatePage = async (query?: string) => {
    try {
      const params = {
        componentName: query ? query.trim() : '',
        processName: '',
        parentType: '',
        regionId: '',
        pageNum: 1,
        pageSize: 1000,
        // state: YES_NO_NUMBER_ENUM.YES,
      };
      const { data } = await sewingComponentTemplatePage(params);
      sewingComponentTemplateList.value = data.list ?? [];
    } catch (err) {
      console.error(err);
    }
  };

  getReferenceTemplate();
  return {
    referenceTemplateList,
    referenceSizeTemplateList,
    getSizeTemplateList,
    getSewingComponentTemplatePage,
    sewingComponentTemplateList,
  };
};
