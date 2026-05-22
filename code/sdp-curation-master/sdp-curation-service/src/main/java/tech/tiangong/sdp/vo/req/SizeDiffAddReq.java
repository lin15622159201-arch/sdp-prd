package tech.tiangong.sdp.vo.req;

import com.baomidou.mybatisplus.annotation.TableField;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * 档差-新增
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/2/27 10:11
 */
@Data
public class SizeDiffAddReq implements Serializable {
    @Serial
    private static final long serialVersionUID = 8457048523486857756L;

    /**
     * 尺码
     */
    @NotEmpty(message = "尺码不能为空")
    private String sizeCode;

    /**
     * 尺码名称
     */
    @NotEmpty(message = "尺码不能为空")
    private String sizeName;

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
