package tech.tiangong.sdp.vo.req;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;

import java.io.Serial;
import java.io.Serializable;
import tech.tiangong.sdp.enums.DesignLogBizTypeEnum;

/**
 * 设计打版操作日志
 * <br>CreateDate August 10,2021
 *
 * @author lujunxuan
 * @since 1.0
 */
@Data
@SuperBuilder
@Accessors(chain = true)
@NoArgsConstructor
public class DesignLogReq implements Serializable {

    @Serial
    private static final long serialVersionUID = 5567925945269203153L;
    /**
     * 业务id
     */
    private Long bizId;
    /**
     * 业务类型
     */
    private DesignLogBizTypeEnum bizType;

    /**
     * 设计款号ID
     */
    private Long prototypeId;

    /**
     * 设计款号
     */
    private String designCode;

    /**
     * 业务版本号
     */
    private Integer bizVersionNum;

    /**
     * 日志信息
     */
    private String content;
}
