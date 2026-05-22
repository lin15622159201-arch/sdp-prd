package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;

/**
 * 商品列表查询-品类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/3/17 18:32
 */
@Data
public class TemuProductPageCategoriesResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = -6777352028003790681L;
    private TemuProductPageCategoryResp cat1Id; // 一级类目id
    private TemuProductPageCategoryResp cat2Id; // 二级类目id
    private TemuProductPageCategoryResp cat3Id; // 三级类目id
    private TemuProductPageCategoryResp cat4Id; // 四级类目id
    private TemuProductPageCategoryResp cat5Id; // 五级类目id
    private TemuProductPageCategoryResp cat6Id; // 六级类目id
    private TemuProductPageCategoryResp cat7Id; // 七级类目id
    private TemuProductPageCategoryResp cat8Id; // 八级类目id
    private TemuProductPageCategoryResp cat9Id; // 九级类目id
    private TemuProductPageCategoryResp cat10Id; // 十级类目id
}
