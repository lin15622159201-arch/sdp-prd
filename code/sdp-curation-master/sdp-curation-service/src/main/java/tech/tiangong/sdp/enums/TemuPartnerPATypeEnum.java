package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;
import java.util.Objects;

/**
 * Temu国区PA平台接口枚举
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/23 16:11
 */
@Getter
@AllArgsConstructor
public enum TemuPartnerPATypeEnum {
    GOODS_ADD("bg.glo.goods.add", "商品-新增"),
    IMAGE_UPLOAD("bg.goods.image.upload.global", "商品-图片上传"),
    LOGISTICS_TEMPLATE("bg.glo.logistics.template.get", "查询运费模板列表"),
    WAREHOUSE_LIST("bg.btg.goods.stock.warehouse.list.get", "查询可绑定的发货仓库信息接口"),
    VIDEO_UPLOAD_SIGN("bg.goods.video.upload.sign.get.global", "查询视频上传 sign接口"),
    VIDEO_UPLOAD_RESULT("bg.goods.big.video.upload.result.get.global", "查询视频转码结果"),
    PRODUCT_SEARCH("bg.glo.product.search", "查询货品生命周期状态"),
    EDIT_PICTURES("bg.glo.goods.edit.pictures.submit", "修改商品素材"),
    ACCESS_TOKEN_INFO("bg.open.accesstoken.info.get.global", "获取Token信息"),
    PRICE_REVIEW_PAGE("bg.semi.price.review.page.query.order", "分页查询半托管核价单"),
    GOODS_LIST_GET("bg.glo.goods.list.get", "货品skc列表查询"),
    GOODS_STOCK_QUANTITY_GET("bg.btg.goods.stock.quantity.get", "查询半托管商品销售库存"),
    GOODS_PRICE_LIST_GET("bg.glo.goods.price.list.get", "货品供货价查询"),
    GOODS_PRICE_REVIEW_REJECT("bg.semi.price.review.reject.order", "半托管不同意核价单建议价（并给出新的申报价）"),
    GOODS_PRICE_REVIEW_CONFIRM("bg.semi.price.review.confirm.order", "半托管同意核价单建议价"),
    GOODS_ACCESSORIES_GET("bg.glo.goods.accessories.get", "货品包装清单类型查询"),
    ;
    private final String code;
    private final String vale;

    public static TemuPartnerPATypeEnum from(final String code) {
        return Arrays.stream(values())
                .filter(t -> Objects.equals(t.getCode(), code)).findFirst().orElseThrow(() ->
                        new IllegalArgumentException("TemuPartnerPATypeEnum not found by code " + code));
    }
}
