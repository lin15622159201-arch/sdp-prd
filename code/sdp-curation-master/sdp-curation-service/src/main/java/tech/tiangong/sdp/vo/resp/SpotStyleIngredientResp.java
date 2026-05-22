package tech.tiangong.sdp.vo.resp;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;

/**
 * 现货管理 - 成分
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/6 15:07
 */
@Data
public class SpotStyleIngredientResp implements Serializable {
    @Serial
    private static final long serialVersionUID = 2174729440028953153L;
    /**
     * 成分ID
     */
    private Long ingredientId;

    /**
     * 成分编码
     */
    private String ingredientCode;

    /**
     * 成分名称
     */
    private String ingredientName;

    /**
     * 成分比例
     */
    private BigDecimal ingredientRatio;
}
