package tech.tiangong.sdp.vo.req;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;
import tech.tiangong.sdp.enums.DesignLogBizTypeEnum;

import javax.validation.constraints.NotNull;
import java.io.Serial;
import java.io.Serializable;
import jakarta.validation.constraints.NotBlank;

/**
 * 日志创建 req
 *  主要用于 灵感设计与数码印花款
 *
 * @author while
 * @since 1.0
 */
@Data
@SuperBuilder
@Accessors(chain = true)
@NoArgsConstructor
public class DesignLogSdpSaveReq implements Serializable {

    @Serial
    private static final long serialVersionUID = 5567925945269203153L;
    /**
     * 业务id
     */
    @NotNull(message = "业务id不能为空")
    private Long bizId;

    /**
     * 业务类型
     */
    @NotNull(message = "业务类型不能为空")
    private DesignLogBizTypeEnum bizType;

    /**
     * SPU
     */
    private String styleCode;

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
    @NotBlank(message = "日志信息不能为空")
    private String content;
}
