package tech.tiangong.sdp.vo.req;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;

import java.io.Serial;
import java.io.Serializable;

/**
* 设计打版操作日志
* <br>CreateDate August 10,2021
* @author lujunxuan
* @since 1.0
*/
@Data
@SuperBuilder
@Accessors(chain = true)
@NoArgsConstructor
public class DesignLogBizListReq implements Serializable {
    @Serial
    private static final long serialVersionUID = -512827233104710830L;

    /**
    * 业务id
    */
    // @NotNull(message = "业务id不能为空")
    private Long bizId;

    /**
     * SPU  现货管理的日志传spu
     */
    private String styleCode;

}
