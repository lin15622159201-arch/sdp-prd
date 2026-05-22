package tech.tiangong.sdp.vo.dto;

import lombok.Data;

import java.util.List;

/**
 * 款式图 - 查询
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/3/4 10:35
 */
@Data
public class DesignImageAddDTO {
    /**
     * 向量ID
     */
    private String id;
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
     * 向量
     */
    private List<Float> data;
}
