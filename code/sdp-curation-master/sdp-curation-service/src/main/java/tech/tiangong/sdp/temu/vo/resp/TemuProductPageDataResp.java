package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;
import java.util.List;

/**
 * 商品列表查询-数据
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/3/17 18:32
 */
@Data
public class TemuProductPageDataResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = -8638737899505243270L;
    private List<TemuProductPagePropertyResp> productProperties;
    private Long productId;
    private TemuProductPageJitModeResp productJitMode;
    private List<TemuProductPageSkuSummaryResp> productSkuSummaries;
    private String productName;
    private Long createdAt;
    private TemuProductPageSemiManagedResp productSemiManaged;
    private Boolean isSupportPersonalization;
    private String extCode;
    private TemuProductPageCategoryResp leafCat;
    private Integer skcSiteStatus;
    private TemuProductPageCategoriesResp categories;
    private Long productSkcId;
    private String mainImageUrl;
    private Boolean matchSkcJitMode;
}
