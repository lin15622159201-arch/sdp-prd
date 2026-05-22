package tech.tiangong.sdp.vo.resp;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * Temu品类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/25 15:09
 */
@Data
public class TemuCategoryResp implements Serializable {
    @Serial
    private static final long serialVersionUID = -7122380163823764188L;
    /**
     * 品类 ID
     */
    private Long categoryId;

    /**
     * 父品类 ID
     */
    private Long parentId;

    /**
     * 品类名
     */
    private String categoryName;


    /**
     * 品类层级
     */
    private Integer level;

    /**
     * 叶子
     * 1:叶子
     */
    private Integer leaf;

    /**
     * 套装
     * 1:套装
     */
    private Integer suiting;

    /**
     * 可以用的
     * 0:可用
     */
    private Integer available;
}
