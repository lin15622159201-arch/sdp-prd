package tech.tiangong.sdp.vo.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import team.aikero.blade.core.protocol.PageReq;

import java.io.Serial;
import java.time.LocalDateTime;

/**
 * 客户 - 分页
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/3 16:58
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class CustomerPageReq extends PageReq {

    @Serial
    private static final long serialVersionUID = 3047351063626742464L;
    /**
     * 客户名称|编号
     */
    private String keyword;
    /**
     * 客户名称
     */
    private String customerName;
}
