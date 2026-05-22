import { DICTIONARY_KEY } from '@/constant/dictionary';
import { useDictionary } from '@/hooks/use-dictionary';
import { isEmpty } from '@toy/utils';
import { computed, ref, Ref } from 'vue';
import { IColorItem } from './types';
import { SYS_ADMIN_WEB_ATTRIBUTE_CODE_ENUM } from '@/modules/base-config/views/color-library/constant';

/** 获取颜色选项 */
export const useColorOptions = (props: {
  isCanSelectedAll?: Ref<boolean>;
}) => {
  const { isCanSelectedAll } = props;
  const { getDictionaryOptionsSync } = useDictionary();
  const CLOTHING_COLOR = ref<IColorItem[]>([]);
  const getColors = async () => {
    const list = await getDictionaryOptionsSync(DICTIONARY_KEY.CLOTHING_COLOR, 2, 2, isCanSelectedAll?.value);
    const colors: IColorItem[] = [];
    list.forEach((v) => {
      const curColorList: IColorItem[] = [];
      // if (v.label === '花色系') return;
      v.children?.forEach((it) => {
        if (it.attributes?.length === 0) return;
        const colorAbbrCode = it.attributes
          ?.find(item => item.code === SYS_ADMIN_WEB_ATTRIBUTE_CODE_ENUM.YWSX)?.name!;
        const colorEnglishName = it.attributes
          ?.find(item => item.code === SYS_ADMIN_WEB_ATTRIBUTE_CODE_ENUM.YWFY)?.name!;
        const colorNumber = it.attributes
          ?.find(item => item.code === SYS_ADMIN_WEB_ATTRIBUTE_CODE_ENUM.SH)?.name!;
        const coverUrl = it.attributes
          ?.find(a => a.code === SYS_ADMIN_WEB_ATTRIBUTE_CODE_ENUM.SYT)?.name;
        if (isEmpty(colorAbbrCode) || isEmpty(colorNumber)) return;
        curColorList.push({
          ...it,
          pathCode: `${v.value}-${it.value}`,
          colorNumber,
          colorEnglishName,
          colorAbbrCode,
          coverUrl,
          children: [],
        });
      });
      if (curColorList.length) {
        colors.push({
          ...v,
          children: curColorList,
          colorEnglishName: '',
          pathCode: '',
          colorAbbrCode: '',
          colorNumber: '',
        });
      }
    });
    CLOTHING_COLOR.value = colors;
  };
  const CLOTHING_COLOR_MAP = computed(() => {
    const map = new Map<string, IColorItem>();
    CLOTHING_COLOR.value.forEach((v) => {
      v.children.forEach((it) => {
        map.set(it.value, it);
        map.set(it.pathCode, it);
      });
    });
    return map;
  });
  const CLOTHING_COLOR_LABEL_MAP = computed(() => {
    const map = new Map<string, IColorItem>();
    console.log('🚀 ~ useColorOptions ~ CLOTHING_COLOR.value:', CLOTHING_COLOR.value);
    CLOTHING_COLOR.value.forEach((v) => {
      v.children.forEach((it) => {
        map.set(it.label, it);
      });
    });
    return map;
  });
  getColors();
  return {
    getColors,
    CLOTHING_COLOR,
    CLOTHING_COLOR_MAP,
    CLOTHING_COLOR_LABEL_MAP
  };
};
