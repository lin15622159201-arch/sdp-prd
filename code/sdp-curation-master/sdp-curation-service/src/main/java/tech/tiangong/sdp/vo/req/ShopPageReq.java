package tech.tiangong.sdp.vo.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import team.aikero.blade.core.protocol.PageReq;

import java.io.Serial;
import java.time.LocalDateTime;

/**
 * 店铺 - 分页
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/3 16:58
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class ShopPageReq extends PageReq {

    @Serial
    private static final long serialVersionUID = 8739452072134486893L;
    /**
     * 店铺类型
     */
    private String shopType;
    /**
     * 运营人员 ID
     */
    private Long businessOperatorId;
    /**
     * 是否启用【1启用；0禁用】
     */
    private Integer enable;
    /**
     * 是否有效【1有效；0无效】
     */
    private Integer expired;
    /**
     * 店铺名
     */
    private String shopName;
    /**
     * 平台编码
     */
    private String platformCode;
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
     * 租户 id
     */
    private Long tenantId;



    /**
     * 创建人姓名
     */
    private String creatorName;

    /**
     * 主体编码
     */
    private String subjectCode;

    /**
     * 主体名称
     */
    private String subjectName;
}
