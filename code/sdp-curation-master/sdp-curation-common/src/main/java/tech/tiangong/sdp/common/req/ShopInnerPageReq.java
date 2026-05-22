package tech.tiangong.sdp.common.req;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import team.aikero.blade.core.protocol.PageReq;

import java.io.Serial;

/**
 * 店铺内部查询
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/22 11:38
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class ShopInnerPageReq extends PageReq {
    @Serial
    private static final long serialVersionUID = -6400696031386864285L;
    /**
     * 租户 ID
     */
    private Long tenantId;
    /**
     * 创建人 ID
     */
    private Long creatorId;

    /**
     * 是否启用【1启用；0禁用】
     */
    private Integer enable;

    /**
     * 店铺名
     */
    private String shopName;
    /**
     * 平台编码
     */
    private String platformCode;

    /**
     * 主体编码
     */
    private String subjectCode;

    /**
     * 主体名称
     */
    private String subjectName;
}
