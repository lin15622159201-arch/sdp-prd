package tech.tiangong.sdp.temu.vo.dto;

import lombok.Data;

import java.util.List;

/**
 * TemuSizeSpecClassCatDTO
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:55
 */
@Data
public class TemuSizeSpecClassCatDTO {
    /**
     * 分类 ID
     */
    private Long catId;

    /**
     * 类目 ID
     */
    private Long classId;

    /**
     * 父类目 ID
     */
    private Long parentClassId;

    /**
     * 相关类目 ID列表
     */
    private List<Long> relatedClassIds;

    /**
     * 类目类型
     */
    private Integer classType;
}
