package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.enums.AiCategoryMappingTypeEnum;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * AI品类映射关系表VO
 */
@Data
public class AiCategoryMappingVO implements Serializable {

    @Serial
    private static final long serialVersionUID = -6977384160661779145L;
    private Long aiCategoryMappingId; // AI品类映射关系表id

    private String aiCategoryCode; // AI品类编码

    private String aiCategoryName; // AI品类名称

    private String categoryCode; // 前三级品类编码

    private String categoryName; // 前三级品类名称

    private String remark; // 备注
    private AiCategoryMappingTypeEnum type; // 映射类型
    /**
     * 创建人id
     */
    private Long creatorId;

    /**
     * 创建人名称
     */
    private String creatorName;

    /**
     * 创建时间
     */
    private LocalDateTime createdTime;

    /**
     * 修改人id
     */
    private Long reviserId;

    /**
     * 修改人名称
     */
    private String reviserName;

    /**
     * 修改时间
     */
    private LocalDateTime revisedTime;
}
