package tech.tiangong.sdp.vo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;

/**
 * 成分
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/11 16:47
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpotStyleIngredientDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 7095710532534199793L;
    /**
     * 成分名称
     */
    private String ingredientName;

    /**
     * 成分比例
     */
    private BigDecimal ingredientRatio;
}
