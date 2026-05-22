package tech.tiangong.sdp.vo.req;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;

/**
 * 排单变更Req
 *
 * @author husky
 * @since 2021-08-09 14:43:20
 */
@Data
public class ChgDesignerReq implements Serializable {

    private static final long serialVersionUID = -2217516204964690926L;
    /**
     * 设计款号。
     */
    /*@NotEmpty(message = "设计款号为空! ")
    private List<String> designCodeList;*/

    /**
     * SKC主键ID数组
     */
    @NotEmpty(message = "SKC主键ID为空! ")
    private List<Long> prototypeIdList;
    
    /**
     * 设计师id【设计师】
     */
    @NotNull(message = "设计师id不能为空")
    private Long designerId;

}