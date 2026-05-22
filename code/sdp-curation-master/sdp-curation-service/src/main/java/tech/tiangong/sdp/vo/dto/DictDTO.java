package tech.tiangong.sdp.vo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import team.aikero.admin.common.vo.AttributeVo;
import team.aikero.admin.common.vo.LabelVo;

import java.util.List;

/**
 * 字典DTO
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/3 14:08
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DictDTO {
    /**
     * 字典id
     */
    private Long id;
    /**
     * 父任务ID
     */
    private Long parentId;
    /**
     * 字典名称
     */
    private String dictName;

    /**
     * 字典编号
     */
    private String dictCode;

    /**
     * 排序值
     */
    private Integer sorted;

    /**
     * 是否启用
     * <p>
     * 0 禁用  1启用
     */
    private Integer state;

    /**
     * 层级
     */
    private Integer level;

    /**
     * 标签
     */
    private List<LabelVo> labels;

    /**
     * 属性
     */
    private List<AttributeVo> attributes;
}
