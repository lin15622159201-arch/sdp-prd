import { ref, computed, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import useCategory from './use-category';
import {
  getSizeTempalteDetailApi,
} from '../api';
import type {
  ITemplateDetailedInfoRes,
} from '../api/type';

function useDetail() {
  const route = useRoute();

  /**
 * 详情 templateCode
 * 有则是编辑，否则添加
 */
  const templateCode = computed<string>(() => {
    return route.query.templateCode as string;
  });

  const {
    categoryTreeMap,
    categoryTreeList,
    isDone,
  } = useCategory();

  const detailInfo = ref<Partial<ITemplateDetailedInfoRes>>({
    templateName: '',
    templateCode: '',
    threeCategory: '',
    threeCategoryCode: '',
    sizeInfoJsons: [],
  });
  const categoryData = ref<string[]>([]);
  /**
   * 给列表设置默认数据
   */
  const setSizeListDefaultData = () => {
    detailInfo.value.sizeInfoJsons?.push({
      position: '',
      dimension: '',
      measureMethod: '',
      errorRange: '',
      positionCode: '',
    });
  };

  const handleReset = () => {
    categoryData.value = [];

    detailInfo.value = {
      templateName: '',
      templateCode: '',
      threeCategory: '',
      sizeInfoJsons: [],
    };
    setSizeListDefaultData();
  };

  const handleGetDetail = async (_templateCode?: string) => {
    if (_templateCode) {
      const { data } = await getSizeTempalteDetailApi(_templateCode);
      detailInfo.value = data;
    } else {
      setSizeListDefaultData();
    }
  };

  let stopWatch = false;
  const handleCategory = () => {
    stopWatch = true;
    const code = categoryData.value[2] || '';

    if (code) {
      detailInfo.value.threeCategoryCode = code;
      detailInfo.value.threeCategory = categoryTreeMap.value.codeMap[code][2] || '';
    }
  };

  watch(
    () => [detailInfo.value.threeCategory, isDone, categoryTreeMap.value],
    () => {
      if (stopWatch) return;

      const { threeCategoryCode } = detailInfo.value;

      if (isDone.value && threeCategoryCode) {
        if (threeCategoryCode) {
          categoryData.value = categoryTreeMap.value.valueMap[threeCategoryCode!];
          console.log('categoryData==', categoryData.value);
        }
      }
    },
    {
      deep: true,
    }
  );

  onMounted(() => {
    handleGetDetail(templateCode.value);
  });

  return {
    categoryTreeMap,
    categoryTreeList,

    templateCode,
    categoryData,
    detailInfo,

    handleGetDetail,
    handleCategory,
    setSizeListDefaultData,
    handleReset,
  };
}

export default useDetail;
