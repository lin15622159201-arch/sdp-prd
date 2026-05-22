package tech.tiangong.sdp.vo.req;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * 店铺 - 编辑
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/4 10:50
 */
@Data
public class ShopEditReq implements Serializable {

    @Serial
    private static final long serialVersionUID = -8538580888571961123L;
    /**
     * 主键 ID
     */
    @NotNull(message = "主键 ID不能为空")
    private Long shopId;
    /**
     * 是否启用【1启用；0禁用】
     */
    private Integer enable;
    /**
     * 平台编码
     */
    @NotEmpty(message = "平台编码不能为空")
    private String platformCode;

    /**
     * 平台名称
     */
    @NotEmpty(message = "平台名称不能为空")
    private String platformName;

    /**
     * 主体编码
     */
    @NotEmpty(message = "主体编码不能为空")
    private String subjectCode;

    /**
     * 主体名称
     */
    @NotEmpty(message = "主体名称不能为空")
    private String subjectName;

    /**
     * 店铺名
     */
    @NotEmpty(message = "店铺名不能为空")
    private String shopName;

    /**
     * 店铺类型
     */
    @NotEmpty(message = "店铺类型不能为空")
    private String shopType;

    /**
     * 商品 token
     */
    @NotEmpty(message = "商品 token不能为空")
    private String productToken;

    /**
     * 订单 token
     */
    private String orderToken;

    /**
     * 标签
     */
    private String label;

    /**
     * 运营人员 ID
     */
    @NotNull(message = "运营人员 ID不能为空")
    private Long businessOperatorId;

    /**
     * 运营人员名称
     */
    @NotEmpty(message = "运营人员名称不能为空")
    private String businessOperatorName;
}
