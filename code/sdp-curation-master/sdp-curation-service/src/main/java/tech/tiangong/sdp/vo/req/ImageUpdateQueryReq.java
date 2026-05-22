package tech.tiangong.sdp.vo.req;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * 图片修复任务 - 根据spu信息查询
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/3 16:58
 */
@Data
public class ImageUpdateQueryReq implements Serializable {
    @Serial
    private static final long serialVersionUID = 2462758647556473588L;


    /**
     * SPU编码
     */
    @NotEmpty(message = "SPU编码数组不能为空")
    private List<String> spuCodes;


    /**
     * 任务类型,0-图片，1-视频
     */
    @NotNull(message = "任务类型不能为空")
    private Integer taskType;


}
