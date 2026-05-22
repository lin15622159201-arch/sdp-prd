package tech.tiangong.sdp.vo.req;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
* 设计打版备注信息
* <br>CreateDate August 10,2021
* @author lujunxuan
* @since 1.0
*/
@Data
public class DesignRemarksReq implements Serializable {

    private static final long serialVersionUID = 4946220323212053211L;

    /**
    * 业务id
    */
    @NotNull(message = "业务id不能为空")
    private Long bizId;
    /**
    * 业务类型
     * @see DesignRemarksBizTypeEnum
    */
    @NotBlank(message = "业务类型不能为空")
    private String bizType;
    /**
    * 备注信息
    */
    @NotBlank(message = "备注信息不能为空")
    private String remark;

    /**
     * 业务子id 如：BOM单具体的某个物料主键id
     */
    private Long bizChildId;

    /**
     * 暂存状态: 0:非暂存; 1,暂存; (默认0)
     */
    private Integer transientState = 0;

}
