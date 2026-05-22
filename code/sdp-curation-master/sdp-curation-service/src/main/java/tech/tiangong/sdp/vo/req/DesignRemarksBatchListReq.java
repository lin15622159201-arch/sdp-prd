package tech.tiangong.sdp.vo.req;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Set;

/**
* 设计打版备注信息
* <br>CreateDate August 10,2021
* @author lujunxuan
* @since 1.0
*/
@Data
public class DesignRemarksBatchListReq implements Serializable {

    private static final long serialVersionUID = 4946220323212053211L;


    /**
     * 设计款号。 skc+年月日+4位流水号
     */
   /* @NotNull(message = "设计款号不能为空")
    @Size(min = 1, message = "设计款号不能为空")
    private Set<String> designCodes;*/

    /**
     * 业务ID
     */
    @NotNull(message = "业务ID不能为空")
    @Size(min = 1, message = "业务ID不能为空")
    private Set<Long> bizIds;

}
