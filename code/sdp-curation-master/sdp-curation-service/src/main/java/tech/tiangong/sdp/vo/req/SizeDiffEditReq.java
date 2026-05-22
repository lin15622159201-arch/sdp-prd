package tech.tiangong.sdp.vo.req;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * 档差-编辑
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/2/27 10:11
 */
@Data
public class SizeDiffEditReq implements Serializable {
    @Serial
    private static final long serialVersionUID = 8457048523486857756L;

    /**
     * 档差 ID
     */
    @NotNull(message = "档差 id不能为空")
    private Long sizeDiffId;

    /**
     * 选中部位
     */
    @NotEmpty(message = "部位不能为空")
    private String part;

    /**
     * 选中尺码
     */
    @NotEmpty(message = "尺码不能为空")
    private String size;

    /**
     * 档差值
     */
    @NotEmpty(message = "档差值不能为空")
    @Valid
    private List<SizePartValueReq> diffs;
}
