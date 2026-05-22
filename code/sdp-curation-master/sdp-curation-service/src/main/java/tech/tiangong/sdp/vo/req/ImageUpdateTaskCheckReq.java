package tech.tiangong.sdp.vo.req;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import tech.tiangong.sdp.enums.ImageUpdateTaskResultEnum;
import javax.validation.ValidationException;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;

/**
 * 任务审核
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/3 18:52
 */
@Data
public class ImageUpdateTaskCheckReq implements Serializable {

    /**
     * 图片任务ID
     */
    @NotNull(message = "图片任务ID不能为空")
    private Long taskId;

    /**
     * 审核结果：0-审核不通过，1-审核通过
     */
    @NotNull(message = "审核结果不能为空")
    private Integer result;


    /**
     * 返修说明，审核不通过必填
     */
    private String reason;

    /**
     * 审核不通过图片说明
     */
    private String notPassDescribePicture;


    /**
     * 任务类型,0-图片，1-视频
     */
    private Integer taskType;

    public void validation() {
        if (Objects.equals(ImageUpdateTaskResultEnum.NOT_PASS.getCode(),result) && StringUtils.isBlank(reason)) {
            throw new ValidationException("审核不通过，返修说明必填！");
        }
    }

    /**
     * skc-图片信息
     */
    @NotEmpty(message = "skc不能为空")
    private List<ImageUpdateTaskUploadReq.Skc> skcList;

}
