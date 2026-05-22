package tech.tiangong.sdp.vo.req;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * 尺码模板 - 启用
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/4 10:50
 */
@Data
public class SizeTemplateEnableReq implements Serializable {
    @Serial
    private static final long serialVersionUID = -841442809616966851L;
    /**
     * 模板 ID
     */
    @NotNull(message = "模板 ID不能为空")
    private Long templateId;
    /**
     * 是否启用【1启用；0禁用】
     */
    @NotNull(message = "是否启用不能为空")
    private Integer enable;
}
