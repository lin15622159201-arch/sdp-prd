package tech.tiangong.sdp.vo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;

/**
 * 放码规则DTO
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/16 16:22
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GradingRuleDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = -1047147811716636672L;
    /**
     * 放码段
     */
    private String gradingSegment;
    /**
     * 放码尺寸
     */
    private BigDecimal gradingSize;

}
