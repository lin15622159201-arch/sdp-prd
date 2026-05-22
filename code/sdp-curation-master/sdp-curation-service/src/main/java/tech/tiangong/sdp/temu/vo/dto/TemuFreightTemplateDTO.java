package tech.tiangong.sdp.temu.vo.dto;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * 运费模板 DTO
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:06
 */
@Data
public class TemuFreightTemplateDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 5028393322393723106L;
    /**
     * 运费模板 ID
     */
    private String freightTemplateId;

    /**
     * 运费模板名称
     */
    private String templateName;
}
