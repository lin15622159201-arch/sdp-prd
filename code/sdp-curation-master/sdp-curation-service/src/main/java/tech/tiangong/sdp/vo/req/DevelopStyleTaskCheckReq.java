package tech.tiangong.sdp.vo.req;

import lombok.Data;
import tech.tiangong.sdp.enums.DevelopStyleCheckResultEnum;

import jakarta.validation.ValidationException;
import jakarta.validation.constraints.NotNull;
import java.io.Serial;
import java.io.Serializable;

/**
 * 开款任务 - 审款
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/4 10:03
 */
@Data
public class DevelopStyleTaskCheckReq implements Serializable {
    @Serial
    private static final long serialVersionUID = 4949865195660339427L;
    /**
     * 任务id
     */
    @NotNull(message = "任务id不能为空")
    private Long taskId;
    /**
     * 审核结果
     */
    @NotNull(message = "审核结果不能为空")
    private DevelopStyleCheckResultEnum checkResult;
    /**
     * 备注信息
     */
    private String remark;

    public void validation() {
        if (!DevelopStyleCheckResultEnum.check(checkResult.getCode())) {
            throw new ValidationException("审核结果非法");
        }
    }
}
