package tech.tiangong.sdp.vo.req;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * 尺码模板 - 新增
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/4 10:50
 */
@Data
public class SizeTemplateAddReq implements Serializable {
    @Serial
    private static final long serialVersionUID = -4229050885533990579L;

    /**
     * 模板名
     */
    @NotEmpty(message = "模板名不能为空")
    private String templateName;

    /**
     * 品类 ID
     */
    @NotNull(message = "品类 ID不能为空")
    private Long catId;
    /**
     * 品类 ID
     */
    @NotEmpty(message = "品类名称不能为空")
    private String catName;

    /**
     * 尺码组编码
     */
    @NotEmpty(message = "尺码组编码不能为空")
    private String groupCode;
    /**
     * 尺码组名称
     */
    @NotEmpty(message = "尺码组名称不能为空")
    private String groupName;
    /**
     * 尺码
     */
    @NotEmpty(message = "尺码不能为空")
    private List<String> sizes;
    /**
     * 部位
     */
    @NotEmpty(message = "部位不能为空")
    private List<String> parts;
    /**
     * 尺码列表
     */
    @NotEmpty(message = "尺码列表不能为空")
    @Valid
    private List<SizeTemplateReq> sizeReqs;
}
