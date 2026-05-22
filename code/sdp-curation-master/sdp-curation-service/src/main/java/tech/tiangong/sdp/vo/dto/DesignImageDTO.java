package tech.tiangong.sdp.vo.dto;

import lombok.Data;

/**
 * 款式图 - 新增
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/3/4 10:35
 */
@Data
public class DesignImageDTO {
    /**
     * 图片ID
     */
    private Long imageId;
    /**
     * SKCID
     */
    private Long skcId;


    /**
     * SKC编码
     */
    private String skcCode;

    /**
     * 向量类型
     */
    private String type;

    /**
     * 分数
     */
    private Float score;

    /**
     * 开款任务ID
     */
    private Long developTaskId;
}
