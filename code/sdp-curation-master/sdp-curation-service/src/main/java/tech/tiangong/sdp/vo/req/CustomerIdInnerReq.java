package tech.tiangong.sdp.vo.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serial;
import java.io.Serializable;

/**
 * 客户 - 详情
 *
 * @author : liuhongfu
 * @version : 1.0
 * @date : 2025/8/19 14:14
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerIdInnerReq implements Serializable {
    @Serial
    private static final long serialVersionUID = 1894598483804879422L;
    /**
     * 客户id 和 客户编码二选一
     */
    private Long customerId;

    /**
     * 客户编码
     */
    private String customerCode;

}
