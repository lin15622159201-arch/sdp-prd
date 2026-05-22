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
public class TemuProductEditPictureSkcReq implements TemuReq {
    @Serial
    private static final long serialVersionUID = -8307419318548278648L;
    /**
     * 商品skc Id
     */
    private Long skcId;
    private String colorImageUrl; // SKC色块图
    private List<String> previewImgUrls; // 轮播图列表，非服饰类目不用传
    private List<TemuGoodsAddReq.ProductSkcReq.ProductSkcCarouselImageI18nReq> productSkcCarouselImageI18nReqs;
    private List<TemuProductEditPictureSkuReq> skuCommonReqList;

}
