package tech.tiangong.sdp.vo.resp;


import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import tech.tiangong.sdp.req.TenantUserReq;
import java.io.Serial;
import java.io.Serializable;

/**
 * SPU创建 resp
 *
 * @author while
 */
@Data
@Accessors(chain = true)
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class DesignStyleCreateSendMqReq  extends TenantUserReq implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * spuId主键
     */
    private Long designStyleId;

    /**
     * SPU编码
     */
    private String styleCode;

    /**
     * SPU版本号
     */
    private Integer versionNum;

    /**
     * 正常打版的 版单id
     */
    private Long prototypeId;

    /**
     * 正常打版的 设计款号
     */
    private String designCode;


}
