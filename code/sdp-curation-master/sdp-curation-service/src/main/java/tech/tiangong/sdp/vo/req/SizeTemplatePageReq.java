package tech.tiangong.sdp.vo.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import team.aikero.blade.core.protocol.PageReq;

import java.io.Serial;
import java.time.LocalDateTime;

/**
 * 尺码模板 - 分页
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/3 16:58
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class SizeTemplatePageReq extends PageReq {

    @Serial
    private static final long serialVersionUID = 8739452072134486893L;
    /**
     * 是否启用【1启用；0禁用】
     */
    private Integer enable;
    /**
     * 模板名
     */
    private String templateName;

    /**
     * 品类 ID
     */
    private Long catId;

    /**
     * 尺码组编码
     */
    private String groupCode;
    /**
     * 创建开始时间
     */
    private LocalDateTime createdStartTime;

    /**
     * 创建结束时间
     */
    private LocalDateTime createdEndTime;
    /**
     * 创建人 id
     */
    private Long creatorId;

    /**
     * 创建人姓名
     */
    private String creatorName;
}
