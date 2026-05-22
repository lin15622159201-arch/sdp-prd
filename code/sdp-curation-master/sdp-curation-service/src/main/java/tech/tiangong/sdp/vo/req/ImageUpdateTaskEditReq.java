package tech.tiangong.sdp.vo.req;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.io.Serializable;
import java.util.List;

/**
 * 图片修复任务 - 编辑
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/3 18:52
 */
@Data
public class ImageUpdateTaskEditReq implements Serializable {

    /**
     *  任务ID
     */
    @NotNull(message = "任务ID不能为空")
    private Long taskId;

    /**
     * 修图需求说明
     */
    private String repairDescribe;

    /**
     * 修图需求总说明附件
     */
    private String repairAttachment;

    /**
     * skc-图片信息
     */
    @NotEmpty(message = "skc不能为空")
    private List<ImageUpdateTaskAddReq.Skc> skc;


}
