// 字典类型
export enum DICTIONARY_TYPE_ENUM {
  /** 内部字典 */
  FASHION_DESIGN_NB = 'fashion_design_NB',
  /** 客户字典 */
  FASHION_DESIGN_KH = 'fashion_design_KH',
}

// 内部字典 key
export enum DICTIONARY_KEY {
  /** 部位库 */
  POSITION = '0002',
  /** 品类 */
  CATEGORY = '0001',
  /** 面料单位 */
  FABRIC_UNIT = '0004',
  /** 区域 */
  AREA = '0006',
  /** 人体部位 */
  BODY_PART = '0007',
  /** 辅料单位 */
  ACCESSORY_UNIT = '0005',
  /** 廓形 */
  SILHOUETTE = '0003',
  /*
  * 织造方式
  *  */
  FABRIC_TYPE = '0023',
  /*
  * 品质要求
  *  */
  QUALITY_REQUIREMENT = '0022',
  /**
   * 模特姿势
   */
  MODEL_POSE = '0008',
  /**
   * 颜色
   */
  COLOR = 'D-COLOR',
  /**
   * 模特图库
   */
  MODEL_GALLERY = 'fm_models',
  /**
   * 场景图库
   */
  SCENE_GALLERY = 'fm_scenes',
  /**
   * 模特面部
   */
  FM_MODELFACE = 'fm_modelface',
  /** 部位 */
  PARTS = '0002',
  /**
   * 尺码组
   */
  CUSTOMER_SIZE_GROUP = '0001',
  /** 风格 */
  STYLE = 'style',
  /**
   * 爆款
   */
  POPULAR = 'popular',
  /**
   * 年龄
   */
  AGE = 'age',
}

// 客户字典 key
export enum CUSTOMER_DICTIONARY_KEY {
  /** 尺码组 */
  SIZE = '0001',
}

// 字典启用禁用
export enum DICTIONARY_STATUS_ENUM {
  /** 启用 */
  ENABLE = '1',
  /** 禁用 */
  DISABLE = '0',
}
