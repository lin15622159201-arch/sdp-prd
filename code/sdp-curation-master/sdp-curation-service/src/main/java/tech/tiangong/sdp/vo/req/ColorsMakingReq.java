package tech.tiangong.sdp.vo.req;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * 复色 req
 * @author while
 */
@Data
public class ColorsMakingReq implements Serializable {

    /**
     * 设计款id
     */
    @NotNull(message = "设计款id不能为空")
    private Long prototypeId;

}
