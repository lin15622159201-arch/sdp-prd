package tech.tiangong.sdp.vo.req;

import lombok.Data;
import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 特目请求款式管理 - 开款
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/4 11:14
 */
@Data
public class TemuOrderReq implements Serializable {
    @Serial
    private static final long serialVersionUID = 4441462669874845280L;

    /**
     * SKC ID
     */
    private Long skcId;

    /**
     * 款号
     */
    private String spuCode;


    /**
     * 商品状态:1,在售;0:未发布到站点;0:下架
     */
    private Integer skcSiteStatus;


    /**
     * 创建时间
     */
    private LocalDateTime createdTime;
}
