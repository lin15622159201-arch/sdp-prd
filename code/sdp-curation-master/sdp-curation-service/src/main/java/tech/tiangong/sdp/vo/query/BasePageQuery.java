package tech.tiangong.sdp.vo.query;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import tech.tiangong.sdp.vo.req.BasePageReq;

import java.io.Serial;

/**
 * 分页查询
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/10/31 11:08
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class BasePageQuery extends BasePageReq {
    @Serial
    private static final long serialVersionUID = -7338248265567565230L;
    /**
     * 租户ID
     */
    private Long tenantId;

    /**
     * 是否删除
     */
    private Integer deleted;
}
