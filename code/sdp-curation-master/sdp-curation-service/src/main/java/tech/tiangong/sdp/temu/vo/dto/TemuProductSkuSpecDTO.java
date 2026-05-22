package tech.tiangong.sdp.temu.vo.dto;

import lombok.Data;

/**
 * TemuProductSkuSpecDTO
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:55
 */
@Data
public class TemuProductSkuSpecDTO {

    /**
     * 规格 id
     */
    private Long specId;
    /**
     * 规格名称
     */
    private String specName;
    /**
     * 父规格 id
     */
    private Long parentSpecId;
    /**
     * 父规格名称
     */
    private String parentSpecName;
}
