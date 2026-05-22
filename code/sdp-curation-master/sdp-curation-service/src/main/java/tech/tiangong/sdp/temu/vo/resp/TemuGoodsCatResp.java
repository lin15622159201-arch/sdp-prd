package tech.tiangong.sdp.temu.vo.resp;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;

/**
 * Temu商品品类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/25 15:09
 */
@Data
public class TemuGoodsCatResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = 4071810225717045170L;
    /**
     * Category ID
     */
    private Long catId;
    /**
     * Category Name
     */
    private String catName;
    /**
     * Parent Category ID: The ID of the parent category. parent_id=0 indicates a top-level node.
     */
    @JsonProperty(value = "parentCatId")
    private Long parentId;
    /**
     * Category status: 0-Available, 1-Not available
     */
    @JsonProperty(value = "hiddenType")
    private Integer availableStatus;
    /**
     * Category Level: 1 - Primary Category, 2 - Secondary Category, 3 - Tertiary Category, 4 - Quaternary Category
     */
    @JsonProperty(value = "catLevel")
    private Integer level;

    /**
     * whether second hand category
     */
    private Boolean secondHandCategory;
    /**
     * Category Type: 0 - Apparel, 1 - Other
     */
    private Integer catType;
    /**
     * Is Leaf Category
     */
    @JsonProperty(value = "isLeaf")
    private Boolean leaf;
    /**
     * Expand category type: 0-Apparel, 1-Others, 2-Books, 3-DVD, 4-CD, 5-Seed
     */
    private Integer expandCatType;

}
