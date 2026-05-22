package tech.tiangong.sdp.temu.vo.req;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuReq;

import java.io.Serial;
import java.util.List;

/**
 * Temu商品-编辑-素材
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:55
 */
@Data
public class TemuProductEditPictureSkuReq implements TemuReq {
    @Serial
    private static final long serialVersionUID = -8307419318548278648L;
    /**
     * 商品sku Id
     */
    private Long skuId;
    // 预览图
    private String thumbUrl;
    // SKU 预览图多语言信息请求
    private List<TemuGoodsAddReq.ProductSkcReq.ProductSkuReq.ProductSkuThumbUrlI18nReq> productSkuThumbUrlI18nReqs;

}
