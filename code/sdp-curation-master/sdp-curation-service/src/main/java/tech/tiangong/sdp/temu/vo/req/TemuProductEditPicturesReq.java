package tech.tiangong.sdp.temu.vo.req;

import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.tiangong.sdp.temu.vo.TemuCommonReq;
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
@EqualsAndHashCode(callSuper = true)
@Data
public class TemuProductEditPicturesReq extends TemuCommonReq {
    @Serial
    private static final long serialVersionUID = -8307419318548278648L;
    /**
     * 货品 ID
     */
    private Long productId;
    private String materialImgUrl; // 素材图
    private List<String> carouselImageUrls; // 货品轮播图
    /**
     * 图片多语言列表
     */
    private List<String> materialMultiLanguages;
    private List<TemuGoodsAddReq.CarouselImageI18nReq> carouselImageI18nReqs; // 货品SPU 多语言轮播图
    /**
     * 轮播视频, 空list视为删除，null视为不改动
     */
    private List<TemuGoodsAddReq.ProductCarouseVideoReq> productCarouseVideoReqList ;
    /**
     * 商详视频, 空list视为删除，null视为不改动
     */
    private List<TemuGoodsAddReq.ProductCarouseVideoReq> productDetailVideoReqList ;

    private List<TemuGoodsAddReq.GoodsLayerDecorationReq> goodsLayerDecorationReqs; // 商详装饰
    private List<TemuProductEditPictureSkcReq> skcList; // skc 信息

}
