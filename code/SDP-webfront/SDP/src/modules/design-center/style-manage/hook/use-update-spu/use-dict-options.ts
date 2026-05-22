import { CUSTOM_DICTIONARY_KEY, DICTIONARY_KEY } from '@/constant/dictionary';
import { useDictionary } from '@/hooks/use-dictionary';
import { computed } from 'vue';

export const useDictOptions = () => {
  const { getDictionaryOptions, getDictionaryLabel, getDictionaryOptionsSync } = useDictionary();
  /** 季节 */
  const PLM_REFERENCE_SEASON = computed(() => getDictionaryOptions(DICTIONARY_KEY.PLM_REFERENCE_SEASON) || []);
  const SHOP_LIST = computed(() => getDictionaryOptions(CUSTOM_DICTIONARY_KEY.SHOP_LIST) || []);
  /** 合身 */
  const FIT_OPTION = computed(() => getDictionaryOptions(DICTIONARY_KEY.FIT));
  /** 品质等级 */
  const PLM_QUALITY_LEVEL = computed(() => getDictionaryOptions(DICTIONARY_KEY.PLM_QUALITY_LEVEL));
  /** 弹性 */
  const PLM_ELASTIC_REQUIREMENT = computed(() => getDictionaryOptions(DICTIONARY_KEY.PLM_ELASTIC_REQUIREMENT));
  /** 织造方式 */
  const APS_CATEGORY_TYPE = computed(() => getDictionaryOptions(DICTIONARY_KEY.APS_CATEGORY_TYPE));
  /** 场景 */
  const scenes = computed(() => getDictionaryOptions(DICTIONARY_KEY.SCENES) || []);
  /** 标准尺码 true，过滤出已启用的 */
  const PLM_STANDARD_SIZE = computed(() => getDictionaryOptions(DICTIONARY_KEY.PLM_STANDARY_SIZE));
  /** 品类 */
  const pimsCategory = computed(() => getDictionaryOptions(DICTIONARY_KEY.PIMS_CATEGORY, 3) || []);
  /** 波段 */
  const WAVE_BAND_CODE_LIST = computed(() => getDictionaryOptions(DICTIONARY_KEY.PLM_CLOTHING_BAND) || []);
  /** 款式标签 */
  const productTag = computed(() => getDictionaryOptions(DICTIONARY_KEY.PRODUCT_TAG) || []);
  /** 款式级别 */
  const productlevel = computed(() => getDictionaryOptions(DICTIONARY_KEY.PRODUCT_LEVEL) || []);
  /** 风格 */
  const product_style = computed(() => getDictionaryOptions(DICTIONARY_KEY.PRODUCT_STYLE) || []);
  /** 印花类型 */
  const fd_printing = computed(() => getDictionaryOptions(DICTIONARY_KEY.GD_PRINTING) || []);
  /** 节日 */
  const festival = computed(() => getDictionaryOptions(DICTIONARY_KEY.FESTIVAL) || []);
  /** 视觉形式 */
  const visual_style = computed(() => getDictionaryOptions(DICTIONARY_KEY.VISUAL_STYLE) || []);
  /** sku分类 */
  const SKU_CLASSIFICATION = computed(() => getDictionaryOptions(DICTIONARY_KEY.SKU_CLASSIFICATION) || []);

  /**
   * 款式类型
   */
  const styleType = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.STYLETYPE) || [];
  });

  return {
    getDictionaryLabel,
    PLM_REFERENCE_SEASON,
    SHOP_LIST,
    FIT_OPTION,
    PLM_QUALITY_LEVEL,
    PLM_ELASTIC_REQUIREMENT,
    APS_CATEGORY_TYPE,
    scenes,
    PLM_STANDARD_SIZE,
    pimsCategory,
    WAVE_BAND_CODE_LIST,
    productTag,
    productlevel,
    product_style,
    fd_printing,
    festival,
    visual_style,
    SKU_CLASSIFICATION,
    styleType,
    getDictionaryOptionsSync,
  };
};
