package tech.tiangong.sdp.vo.req;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import team.aikero.blade.core.protocol.PageReq;

import java.io.Serial;
import java.util.List;

/**
 * 包装清单
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/4 10:50
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class AccessoriesReq extends PageReq {
    @Serial
    private static final long serialVersionUID = 6354807010498056069L;
    /**
     * 店铺 ID
     */
    @NotNull(message = "主键 ID不能为空")
    private Long shopId;
    /**
     * 属性值（模糊搜索）
     */
    private String fuzzyValue ;

    /**
     * 属性ID
     */
    private List<Integer> vidList;
}
