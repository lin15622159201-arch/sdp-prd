package tech.tiangong.sdp.common.req;

import lombok.Data;
import tech.tiangong.sdp.common.resp.BuyerCategoryTag;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

/**
 * 买手创建SPU
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/2 15:30
 */
@Data
public class BuyerCreateSkcReq implements Serializable {
    @Serial
    private static final long serialVersionUID = 4237695647432221992L;
    /**
     * 买手款号skc code
     */
    private String designCode;

    /**
     * 款类型: 1-正常款; 2-复色款
     */
    private Integer prototypeType;

    /**
     * SKC特别标签。可用于特定标识。建议传小写英文。
     * 如：来自sdp款的标识，传的是：sdp_y2
     */
    private List<String> specialTag;

    /**
     * 款式名称
     */
    private String styleName;

    /**
     * 款式颜色
     */
    private String color;

    /**
     * 颜色编码 --v5.10
     */
    private String colorCode;

    /**
     * 吊牌颜色
     */
    private String tagColor;

    /**
     * 图案元素
     */
    private String patternElement;

    /**
     * 供应商货号
     */
    private String supplierArticleNumber;

    /**
     * 成本价 单位:元
     */
    private BigDecimal costPrice;

    /**
     * 利润点(单位：原始值，例：11%的原始值为0.11)
     */
    private BigDecimal profitPoint;

    /**
     * 卖点
     */
    private String sellPoint;

    /**
     * 款式图片(多张以英文逗号分隔)
     */
    private List<String> customerPictureList;

    /**
     * 是否拼接 (0-否, 1-是)
     */
    private Integer isSplicing;

    /**
     * 款式标签
     */
    private List<BuyerCategoryTag> categoryTags;
}
