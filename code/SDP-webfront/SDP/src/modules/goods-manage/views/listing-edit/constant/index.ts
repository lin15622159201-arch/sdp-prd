// import i18n from '@/i18n';

// const { t } = i18n.global;
const t = () => {};

/**
 * 控件类型：
 * INPUT(0, "可输入"),
 * CHOOSE(1, "可勾选"),
 * INPUT_CHOOSE(3, "可输入又可勾选"),
 * SINGLE_YMD_DATE(5, "单项时间选择器-年月日"),
 * MULTIPLE_YMD_DATE(6, "双项时间选择器-年月日"),
 * SINGLE_YM_DATE(7, "单项时间选择器-年月"),
 * MULTIPLE_YM_DATE(8, "双项时间选择器-年月"),
 * COLOR_SELECTOR(9, "调色盘"),
 * SIZE_SELECTOR(10, "尺码选择器"),
 * NUMBER_RANGE(11, "输入数值范围"),
 * NUMBER_PRODUCT_DOUBLE(12, "输入数值乘积-2维"),
 * NUMBER_PRODUCT_TRIPLE(13, "输入数值乘积-3维"),
 * AUTO_COMPUTE(14, "自动计算框"),
 * REGION_CHOOSE(15, "地区选择器"),
 * PROPERTY_CHOOSE_AND_INPUT(16, "属性勾选和数值录入"),
 */
export enum CONTROL_TYPE_ENUM {
  /**
   * 可输入
   */
  INPUT = 0,
  /**
   * 可勾选
   */
  CHOOSE = 1,
  /**
   * 可输入又可勾选
   */
  INPUT_CHOOSE = 3,
  /**
   * 单项时间选择器-年月日
   */
  SINGLE_YMD_DATE = 5,
  /**
   * 双项时间选择器-年月日
   */
  MULTIPLE_YMD_DATE = 6,
  /**
   * 单项时间选择器-年月
   */
  SINGLE_YM_DATE = 7,
  /**
   * 双项时间选择器-年月
   */
  MULTIPLE_YM_DATE = 8,
  /**
   * 调色盘
   */
  COLOR_SELECTOR = 9,
  /**
   * 尺码选择器
   */
  SIZE_SELECTOR = 10,
  /**
   * 输入数值范围
   */
  NUMBER_RANGE = 11,
  /**
   * 输入数值乘积-2维
   */
  NUMBER_PRODUCT_DOUBLE = 12,
  /**
   * 输入数值乘积-3维
   */
  NUMBER_PRODUCT_TRIPLE = 13,
  /**
   * 自动计算框
   */
  AUTO_COMPUTE = 14,
  /**
   * 地区选择器
   */
  REGION_CHOOSE = 15,
  /**
   * 属性勾选和数值录入
   */
  PROPERTY_CHOOSE_AND_INPUT = 16,
}

/**
 * 数值规则：SUM_OF_VALUES_IS_100(1, "数值之和等于100")
 */
export enum VALUE_RULE_ENUM {
  /**
   * 数值之和等于100
   */
  SUM_OF_VALUES_IS_100 = '1',
}
export const VALUE_RULE_LIST = [
  { value: VALUE_RULE_ENUM.SUM_OF_VALUES_IS_100, label: '所有成分比例之和需等于100%' },
];

/**
 * 大类排序规则
 */
export enum PRIORITYAGES {
  /**
   * 套装组成件数
   */
  FORM_KEY_2089 = '2089',
  /**
   * 面料纹理
   */
  FORM_KEY_2054 = '2054',
  /**
   * 面料纹理1克重
   */
  FORM_KEY_2052 = '2052',
  /**
   * 里料纹理
   */
  FORM_KEY_2050 = '2050',
  /**
   * 成分比例
   */
  FORM_KEY_2 = '2',
}

/**
 * 小类排序规则
 */
export enum PRIORITYAGES_MIN {
  /**
   * 套装组成件数
   */
  FORM_KEY_NAME1 = '套装组成件数',
  /**
   * 面料纹理1
   */
  FORM_KEY_NAME2 = '面料纹理1',
  /**
   * 面料纹理1克重（g/m²)
   */
  FORM_KEY_NAME3 = '面料纹理1克重（g/m²)',
  /**
   * 面料1克重（g/m²)
   */
  FORM_KEY_NAME4 = '面料1克重（g/m²)',
  /**
   * 面料克重1（g/m²)
   */
  FORM_KEY_NAME5 = '面料克重1（g/m²)',
  /**
   * 面料纹理1成分
   */
  FORM_KEY_NAME6 = '面料纹理1成分',
  /**
   * 面料纹理2
   */
  FORM_KEY_NAME7 = '面料纹理2',
  /**
   * 面料纹理2克重（g/m²)
   */
  FORM_KEY_NAME8 = '面料纹理2克重（g/m²)',
  /**
   * 面料克重2（g/m²)
   */
  FORM_KEY_NAME9 = '面料克重2（g/m²)',
  /**
   * 面料纹理2成分
   */
  FORM_KEY_NAME10 = '面料纹理2成分',
  /**
   * 面料纹理3
   */
  FORM_KEY_NAME11 = '面料纹理3',
  /**
   * 面料纹理3克重（g/m²)
   */
  FORM_KEY_NAME12 = '面料纹理3克重（g/m²)',
  /**
   * 面料克重3（g/m²)
   */
  FORM_KEY_NAME13 = '面料克重3（g/m²)',
  /**
   * 面料纹理3成分
   */
  FORM_KEY_NAME14 = '面料纹理3成分',
  /**
   * 面料纹理4
   */
  FORM_KEY_NAME15 = '面料纹理4',
  /**
   * 面料纹理4克重（g/m²)
   */
  FORM_KEY_NAME16 = '面料纹理4克重（g/m²)',
  /**
   * 面料克重4（g/m²)
   */
  FORM_KEY_NAME17 = '面料克重4（g/m²)',
  /**
   * 面料纹理4成分
   */
  FORM_KEY_NAME18 = '面料纹理4成分',
  /**
   * 面料纹理5
   */
  FORM_KEY_NAME19 = '面料纹理5',
  /**
   * 面料纹理5克重（g/m²)
   */
  FORM_KEY_NAME20 = '面料纹理5克重（g/m²)',
  /**
   * 面料克重5（g/m²)
   */
  FORM_KEY_NAME21 = '面料克重5（g/m²)',
  /**
   * 面料纹理5成分
   */
  FORM_KEY_NAME22 = '面料纹理5成分',
  /**
   * 里料纹理
   */
  FORM_KEY_NAME23 = '里料纹理',
  /**
   * 里料克重（g/m²)
   */
  FORM_KEY_NAME24 = '里料克重（g/m²)',
  /**
   * 里衬成分
   */
  FORM_KEY_NAME25 = '里衬成分',
  /**
   * 里料纹理1
   */
  FORM_KEY_NAME26 = '里料纹理1',
  /**
   * 里料纹理1克重（g/m²)
   */
  FORM_KEY_NAME27 = '里料纹理1克重（g/m²)',
  /**
   * 里料纹理1成分
   */
  FORM_KEY_NAME28 = '里料纹理1成分',
  /**
   * 里料纹理2
   */
  FORM_KEY_NAME29 = '里料纹理2',
  /**
   * 里料纹理2克重（g/m²)
   */
  FORM_KEY_NAME30 = '里料纹理2克重（g/m²)',
  /**
   * 里料纹理2成分
   */
  FORM_KEY_NAME31 = '里料纹理2成分',
  /**
   * 里料纹理3
   */
  FORM_KEY_NAME32 = '里料纹理3',
  /**
   * 里料纹理3克重（g/m²)
   */
  FORM_KEY_NAME33 = '里料纹理3克重（g/m²)',
  /**
   * 里料纹理3成分
   */
  FORM_KEY_NAME34 = '里料纹理3成分',
  /**
   * 里料纹理4
   */
  FORM_KEY_NAME35 = '里料纹理4',
  /**
   * 里料纹理4克重（g/m²)
   */
  FORM_KEY_NAME36 = '里料纹理4克重（g/m²)',
  /**
   * 里料纹理4成分
   */
  FORM_KEY_NAME37 = '里料纹理4成分',
  /**
   * 里料纹理5
   */
  FORM_KEY_NAME38 = '里料纹理5',
  /**
   * 里料纹理5克重（g/m²)
   */
  FORM_KEY_NAME39 = '里料纹理5克重（g/m²)',
  /**
   * 里料纹理5成分
   */
  FORM_KEY_NAME40 = '里料纹理5成分',
}
