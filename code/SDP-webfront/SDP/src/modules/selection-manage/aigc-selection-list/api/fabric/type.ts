import { FABRIC_FACE_ENUM } from '../../constant';

// ⬇️ 查看AI设计生图推荐面料结果（传每个分组第一张图片ID）响应体 接口：https://yapi.tiangong.site/project/18/interface/api/3202
export interface IFabricInfoRes {
  /**
   * 图片id
   */
  pictureId: string;
  /**
   * 图片url
   */
  pictureUrl: string;
  /**
   * 推荐面料
   */
  fabricList: IFabricInfoResFabricListItem[];
}
export interface IFabricInfoResFabricListItem {
  /**
   * 推荐面料ID
   */
  id: string;
  /**
   * 家族代表面料类目
   */
  familyFabricCategory: string;
  /**
   * 中台主商品ID
   */
  sourceCommodityId: string;
  /**
   * 商品ID
   */
  commodityId: string;
  /**
   * 商品编码
   */
  commodityCode: string;
  /**
   * 商品名称
   */
  commodityName: string;
  /**
   * 商品图片
   */
  commodityPicture: string;
  /**
   * 纹理色块图
   */
  colorPicture: string;
  /**
   * SKU-ID
   */
  skuId: string;
  /**
   * SKU-编码
   */
  skuCode: string;
  /**
   * 色号
   */
  colorCode: string;
  /**
   * RGB
   */
  rgb: string;
}
// ⬆️ 查看AI设计生图推荐面料结果（传每个分组第一张图片ID）响应体

// ⬇️ FM面料详情响应体 接口：https://yapi.tiangong.site/project/855/interface/api/59122
export interface IFabricFmRes {
  /**
   * SPU ID
   */
  commodityId: string;
  /**
   * SPU 编码
   */
  commodityCode: string;
  /*
  * 天工SPU编码
  *  */
  tgCommodityCode?: string;
  /**
   * 商品名称
   */
  commodityName: string;
  /**
   * 商品货号
   */
  commodityNumber: string;
  /**
   * 面料商品品类
   * <pre>多个,号分隔,全路径用-拼接</pre>
   */
  fabricCategory: string;
  /**
   * FM商品品类
   * <pre>多个,号分隔</pre>
   */
  category: string;
  /**
   * 商品图片
   * <pre>多个,号分隔</pre>
   */
  image: string;
  /**
   * 商品细节图
   * <pre>多个,号分隔</pre>
   */
  detailImage?: string;
  /**
   * 商品色卡图
   * <pre>多个,号分隔</pre>
   */
  colorCardImage?: string;
  /**
   * 价格
   */
  price: string;
  /**
   * SKU数量
   */
  skuQuantity: string;
  /**
   * 商品克重
   */
  goodsWeight: string;
  /**
   * 商品克重正负差
   */
  goodsWeightGap: string;
  /**
   * 商品克重正负差name
   */
  goodsWeightGapName: string;
  /**
   * 商品克重单位
   */
  goodsWeightUnit: string;
  /**
   * 商品克重单位name
   */
  goodsWeightUnitName: string;
  /**
   * 包边门幅
   */
  packageWidth: string;
  /**
   * 包边门幅正负差
   */
  packageWidthGap: string;
  /**
   * 包边门幅正负差name
   */
  packageWidthGapName: string;
  /**
   * 门幅单位（默认cm）
   */
  widthUnit: string;
  /**
   * 实用门幅，等于 包边门幅-4
   */
  practicalWidth: string;
  /**
   * 实用门幅正负差
   */
  practicalWidthGap: string;
  /**
   * 成分
   */
  compositions: IFabricFmResCompositionsItem[];
  /**
   * SKU
   */
  skus: IFabricFmResSkusItem[];
  /**
   * 弹性分层
   */
  elasticityLayeredDesc: string;
  /**
   * 正面纹理描述
   */
  frontTextureDesc: string;
  /**
   * 反面纹理描述
   */
  reverseTextureDesc: string;
  /**
   * 面料面数
   */
  fabricFace: FABRIC_FACE_ENUM;
  /**
   * 季节描述，多个使用逗号隔开
   */
  seasonDesc: string;
}
export interface IFabricFmResCompositionsItem {
  /**
   * 布料名称
   */
  name: string;
  /**
   * 百分比（数字，不带百分号）
   */
  percentage: string;
}
export interface IFabricFmResSkusItem {
  /**
   * skuId
   */
  skuId: string;
  /**
   * skuCode
   */
  skuCode: string;
  /**
   * 色系
   */
  colorSystem: string;
  /**
   * 色系名称
   */
  colorSystemName: string;
  /**
   * 色号
   */
  colorCode: string;
  /**
   * 颜色
   */
  color: string;
  /**
   * rgb值
   */
  rgb: string;
  /**
   * 色彩模型的编号
   */
  colorRo: string;
  /**
   * 商品图片
<pre>多个,号分隔</pre>
   */
  image: string;
}
// ⬆️ FM面料详情响应体
