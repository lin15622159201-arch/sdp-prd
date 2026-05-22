package tech.tiangong.sdp.temu.vo.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import tech.tiangong.sdp.temu.vo.TemuCommonReq;

import java.io.Serial;
import java.util.List;

/**
 * Temu商品-新增
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:03
 */
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TemuGoodsAddReq extends TemuCommonReq {
    @Serial
    private static final long serialVersionUID = 8518819703638838529L;
    private Long goodsId; // 商品ID
    private String categoryType; // 类目类型
    private Integer cat1Id; // 一级类目id
    private Integer cat2Id; // 二级类目id
    private Integer cat3Id; // 三级类目id
    private Integer cat4Id; // 四级类目id，没有的情况传0
    private Integer cat5Id; // 五级类目id，没有的情况传0
    private Integer cat6Id; // 六级类目id，没有的情况传0
    private Integer cat7Id; // 七级类目id，没有的情况传0
    private Integer cat8Id; // 八级类目id，没有的情况传0
    private Integer cat9Id; // 九级类目id，没有的情况传0
    private Integer cat10Id; // 十级类目id，没有的情况传0
    private ProductWarehouseRouteReq productWarehouseRouteReq; // 库存仓库配置对象
    private List<ProductI18nReq> productI18nReqs; // 多语言标题设置
    private String productName; // 货品名称
    private List<ProductCarouseVideoReq> productCarouseVideoReqList; // 商品主图视频
    private ProductCustomReq productCustomReq; // 货品关务标签
    private List<String> carouselImageUrls; // 货品轮播图
    private List<CarouselImageI18nReq> carouselImageI18nReqs; // 货品SPU多语言轮播图
    private List<ProductOuterPackageImageReq> productOuterPackageImageReqs; // 外包装图片
    private String materialImgUrl; // 素材图
    private List<ProductPropertyReq> productPropertyReqs; // 货品属性
    private List<ProductSpecPropertyReq> productSpecPropertyReqs; // 货品规格属性
    private ProductWhExtAttrReq productWhExtAttrReq; // 货品仓配供应链侧扩展属性请求
    private List<ProductSkcReq> productSkcReqs; // 货品skc列表
    private List<Long> sizeTemplateIds; // 尺码表模板id
    private List<GoodsModelReq> goodsModelReqs; // 商品模特列表请求
    private List<Long> showSizeTemplateIds; // 套装尺码表展示
    private ProductOuterPackageReq productOuterPackageReq; // 货品外包装信息
    private List<ProductGuideFileReq> productGuideFileReqs; // 说明书请求对象
    private List<GoodsLayerDecorationReq> goodsLayerDecorationReqs; // 商详装饰

    private ProductSemiManagedReq productSemiManagedReq; //
    private ProductShipmentReq productShipmentReq; //
    private List<String> materialMultiLanguages;
    // Getters and Setters for all fields

    @Data
    public static class ProductWarehouseRouteReq {
        private List<TargetRoute> targetRouteList;

        // Getters and Setters

        @Data
        public static class TargetRoute {
            private List<Long> siteIdList;
            private String warehouseId;

            // Getters and Setters
        }
    }

    @Data
    public static class ProductI18nReq {
        private String language;
        private String productName;

        // Getters and Setters
    }

    @Data
    public static class ProductCarouseVideoReq {
        private String vid;
        private String coverUrl;
        private String videoUrl;
        private Integer width;
        private Integer height;

        // Getters and Setters
    }

    @Data
    public static class ProductCustomReq {
        private String goodsLabelName;
        private Boolean isRecommendedTag;

        // Getters and Setters
    }

    @Data
    public static class CarouselImageI18nReq {
        private List<String> imgUrlList;
        private String language;

        // Getters and Setters
    }

    @Data
    public static class ProductOuterPackageImageReq {
        private String imageUrl;

        // Getters and Setters
    }

    /**
     * "productPropertyReqs"：[
     * {
     * "templatePid": 197127,  //取properties.templatePid
     * "pid": 3,   //取properties.pid
     * "refPid": 19,   //取properties.refPid
     * "propName": "风格",  //取properties.name
     * "vid": 2076, //取properties.values.vid
     * "propValue": "现代", //取properties.values.value
     * "valueUnit": "",  //取properties.valueUnit
     * "numberInputValue":""  //
     * }
     * ]
     */
    @Data
    public static class ProductPropertyReq {
        private Integer templatePid;
        private Integer pid;
        private Integer refPid;
        private String propName;
        private Integer vid;
        private String propValue;
        private String valueUnit;
        private String numberInputValue;
        private String valueExtendInfo;

        // Getters and Setters
    }

    @Data
    public static class ProductSpecPropertyReq {
        private Integer templatePid;
        private Integer pid;
        private Integer refPid;
        private Integer vid;
        private String propName;
        private String propValue;
        private Integer parentSpecId;
        private String parentSpecName;
        private Integer specId;
        private String specName;
        private Integer valueGroupId;
        private String valueGroupName;
        private String numberInputValue;
        private String valueUnit;
        private String valueExtendInfo;

        // Getters and Setters
    }

    @Data
    public static class ProductWhExtAttrReq {
        private String outerGoodsUrl;
        private ProductOrigin productOrigin;

        // Getters and Setters

        @Data
        public static class ProductOrigin {
            private String countryShortName;
            private Long region2Id;

        }
    }

    @Data
    public static class ProductSkcReq {
        private List<String> previewImgUrls;
        private List<ProductSkcCarouselImageI18nReq> productSkcCarouselImageI18nReqs;
        private String colorImageUrl;
        private List<MainProductSkuSpecReq> mainProductSkuSpecReqs;
        private List<ProductSkuReq> productSkuReqs;
        private String extCode;

        // Getters and Setters

        @Data
        public static class ProductSkcCarouselImageI18nReq {
            private List<String> imgUrlList;
            private String language;

            // Getters and Setters
        }

        @Data
        public static class MainProductSkuSpecReq {
            private Integer parentSpecId;
            private String parentSpecName;
            private Integer specId;
            private String specName;

            // Getters and Setters
        }

        @Data
        public static class ProductSkuReq {
            private String thumbUrl;
            private List<ProductSkuThumbUrlI18nReq> productSkuThumbUrlI18nReqs;
            private String extCode;
            private List<ProductSkuSpecReq> productSkuSpecReqs;
            private Integer supplierPrice;
            private String currencyType;
            private ProductSkuStockQuantityReq productSkuStockQuantityReq;
            private ProductSkuMultiPackReq productSkuMultiPackReq;
            private ProductSkuSuggestedPriceReq productSkuSuggestedPriceReq;
            private ProductSkuWhExtAttrReq productSkuWhExtAttrReq;
            private List<SiteSupplierPrice> siteSupplierPrices;
            // 包装清单,对应SKU分类信息
            private ProductSkuAccessoriesReq productSkuAccessoriesReq;

            @Data
            public static class ProductSkuAccessoriesReq {
                private List<ProductSkuAccessories> productSkuAccessories;
            }

            @Data
            public static class ProductSkuAccessories {
                private Integer vid;
                private Integer num;
                private Integer unitCode;
            }

            @Data
            public static class SiteSupplierPrice {
                private Long siteId;
                private Integer supplierPrice;
            }

            @Data
            public static class ProductSkuThumbUrlI18nReq {
                private List<String> imgUrlList;
                private String language;

                // Getters and Setters
            }

            @Data
            public static class ProductSkuSpecReq {
                private Integer specId;
                private String parentSpecName;
                private Integer parentSpecId;
                private String specName;

                // Getters and Setters
            }

            @Data
            public static class ProductSkuStockQuantityReq {
                private List<WarehouseStockQuantityReq> warehouseStockQuantityReqs;

                // Getters and Setters

                @Data
                public static class WarehouseStockQuantityReq {
                    private String targetStockAvailable;
                    private String warehouseId;

                    // Getters and Setters
                }
            }

            @Data
            public static class ProductSkuMultiPackReq {
                private Integer numberOfPieces;
                private ProductSkuNetContentReq productSkuNetContentReq;
                private Integer skuClassification;
                private Integer pieceUnitCode;
                private String individuallyPacked;//是否独立包装，当sku分类为同款多件装或混合套装时，必填1:是，0:否
                // Getters and Setters

                @Data
                public static class ProductSkuNetContentReq {
                    private Integer netContentUnitCode;
                    private Integer netContentNumber;

                    // Getters and Setters
                }
            }

            @Data
            public static class ProductSkuSuggestedPriceReq {
                private String specialSuggestedPrice;
                private String suggestedPriceCurrencyType;
                private Integer suggestedPrice;

                // Getters and Setters
            }

            @Data
            public static class ProductSkuWhExtAttrReq {
                // 对应 SKU重量
                private ProductSkuWeightReq productSkuWeightReq;
                private ProductSkuSameReferPriceReq productSkuSameReferPriceReq;
                private ProductSkuSensitiveLimitReq productSkuSensitiveLimitReq;
                private ProductSkuVolumeReq productSkuVolumeReq;
                private ProductSkuSensitiveAttrReq productSkuSensitiveAttrReq;
                private List<ProductSkuBarCodeReq> productSkuBarCodeReqs;

                // Getters and Setters

                @Data
                public static class ProductSkuWeightReq {
                    private Integer value;

                    // Getters and Setters
                }

                @Data
                public static class ProductSkuSameReferPriceReq {
                    private String url;

                    // Getters and Setters
                }

                @Data
                public static class ProductSkuSensitiveLimitReq {
                    private Integer maxBatteryCapacity;
                    private Integer maxBatteryCapacityHp;
                    private Integer maxLiquidCapacity;
                    private Integer maxLiquidCapacityHp;
                    private Integer maxKnifeLength;
                    private Integer maxKnifeLengthHp;
                    private KnifeTipAngle knifeTipAngle;

                    // Getters and Setters

                    @Data
                    public static class KnifeTipAngle {
                        private Integer degrees;

                        // Getters and Setters
                    }
                }

                @Data
                public static class ProductSkuVolumeReq {
                    private Integer len;
                    private Integer width;
                    private Integer height;

                    // Getters and Setters
                }

                @Data
                public static class ProductSkuSensitiveAttrReq {
                    private Integer isSensitive;
                    private List<Integer> sensitiveList;

                    // Getters and Setters
                }

                @Data
                public static class ProductSkuBarCodeReq {
                    private String code;
                    private Integer codeType;

                    // Getters and Setters
                }
            }
        }
    }

    @Data
    public static class GoodsModelReq {
        private String modelProfileUrl;
        private String sizeSpecName;
        private Long modelId;
        private Long sizeSpecId;
        private String modelWaist;
        private Integer modelType;
        private String modelName;
        private String modelHeight;
        private Integer modelFeature;
        private String modelFootWidth;
        private String modelBust;
        private String modelFootLength;
        private Integer tryOnResult;
        private String modelHip;

        // private String modelName;
        //  private List<GoodsModelImageReq> goodsModelImageReqs;

        // Getters and Setters

        @Data
        public static class GoodsModelImageReq {
            private String imageUrl;
            private Integer modelImageType;

            // Getters and Setters
        }
    }

    @Data
    public static class ProductOuterPackageReq {

        private int packageShape;

        private int packageType;

        // Getters and Setters
    }

    @Data
    public static class ProductGuideFileReq {
        private String fileName;
        private String pdfMaterialId;
        private List<String> languages;

        // Getters and Setters
    }

    @Data
    public static class GoodsLayerDecorationReq {
        private Long floorId;
        private String key;//楼层类型的key,目前默认传'DecImage'
        private String lang; //语言类型
        private Integer priority;//楼层排序
        private String type;//组件类型type,图片-image,文本-text商详需要包含至少一个图片类型组件
        private List<ContentList> contentList;


        @Data
        public static class ContentList {
            private Integer height;//图片高度--通用，高度最小480px
            private String imgUrl;//图片地址--通用，图片最大3M
            private Integer width;//图片宽度--通用，宽度最小480px
            private String text;//文字信息--文字模块，文本-text必填，长度限制500字符内
            private TextModuleDetail textModuleDetails;//文字模块详情文本-text必填
        }
    }

    @Data
    public static class TextModuleDetail {
        private String backgroundColor; //背景颜色文本-text必填，六位值，例#ffffff
        private String fontFamily; //字体类型文本-text不传
        private String fontSize;//文字模块字体大小文本-text必传12
        private String align;//文字对齐方式，left--左对齐；right--右对齐；center--居中；justify--两端对齐文本-text必填
        private String fontColor;//文字颜色文本-text必填，六位值，例#333333
    }

    @Data
    public static class ProductSemiManagedReq {
        private List<Long> bindSiteIds;
    }

    @Data
    public static class ProductShipmentReq {
        private String freightTemplateId;

        private String shipmentLimitSecond;
    }
}
