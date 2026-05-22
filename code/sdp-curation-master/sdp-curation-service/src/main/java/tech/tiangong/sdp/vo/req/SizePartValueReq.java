package tech.tiangong.sdp.vo.req;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * 尺码档差值
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/2/27 10:01
 */
@Data
public class SizePartValueReq implements Serializable {
    @Serial
    private static final long serialVersionUID = -809468071521099274L;
    /**
     * 尺码
     */
    @NotEmpty(message = "尺码不能为空")
    private String size;

    /**
     * 部档差值
     */
    @NotEmpty(message = "部档差值不能为空")
    @Valid
    private List<PartValueReq> parts;
}
