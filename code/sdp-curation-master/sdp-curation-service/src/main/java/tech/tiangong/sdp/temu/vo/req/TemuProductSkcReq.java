package tech.tiangong.sdp.temu.vo.req;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuReq;
import tech.tiangong.sdp.temu.vo.dto.TemuProductSkuDTO;
import tech.tiangong.sdp.temu.vo.dto.TemuProductSkuSpecDTO;

import java.io.Serial;
import java.util.List;

/**
 * Temu商品-SKC
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:55
 */
@Data
public class TemuProductSkcReq implements TemuReq {

    @Serial
    private static final long serialVersionUID = 8318373484610305437L;
    /**
     * 货品 skc 外部编码，没有的场景传空字符串（必填）
     * <pre>
     *     必填
     * </pre>
     */
    private String extCode;
    /**
     * 是否底板
     */
    private Integer isBasePlate;

    /**
     * SKC 色块图
     */
    private String colorImageUrl;
    /**
     * 货品 sku 列表（必填，服饰类目最多 10 个）
     * <pre>
     *     必填
     * </pre>
     */
    private List<TemuProductSkuDTO> productSkuReqs;
    /** 主销售规格列表（必填） */
    private List<TemuProductSkuSpecDTO> mainProductSkuSpecReqs;
    /**
     * SKC 轮播图多语言信息
     */
    private List<TemuCarouselImageI18nReq> productSkcCarouselImageI18nReqs;



    /** SKU 预览图（非服饰类目不用传） */
    private List<String> previewImgUrls;
}
