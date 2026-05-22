package tech.tiangong.sdp.common.req;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * AI回调参数
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 11:17
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AiTaskCallbackReq implements Serializable {
    @Serial
    private static final long serialVersionUID = 2673205950357590546L;
    /**
     * AI模型类型，根据这个【类型和业务主键ID】做对应业务逻辑处理
     */
    @NotBlank(message = "AI模型类型不能为空")
    private String modelType;
    /**
     * 业务主键ID
     */
    @NotNull(message = "业务主键ID不能为空")
    private Long busId;

    /**
     * AI任务ID
     */
    private Long taskId;
    /**
     * 任务状态：0-排队中；10-生成中；20-已中止；30-已完成；40-无效；50-失败；60-超时失败；
     * 可以根据任务状态做后续业务逻辑处理
     */
    private Integer taskStatus;
    /**
     * 任务进度0-100
     */
    private Integer taskProgress;
    /**
     * 消息备注
     */
    private String message;

    /**
     * 生成结果图列表（只有taskStatus=30时才有值）某些简单业务场景用到
     */
    private List<String> resImgList;
}
