package tech.tiangong.sdp.common.vo.base.prototype;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;
import java.io.Serial;
import java.io.Serializable;

/**
 * OPS基类对象 vo
 * @author while
 * @date 2022/8/27 17:02
 */
@Data
@SuperBuilder
@Accessors(chain = true)
@NoArgsConstructor
public class OpsObject implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * 编码
     */
    @NotBlank(message = "code不能为空")
    private String code;

    /**
     * 值
     */
    @NotBlank(message = "name不能为空")
    private String name;
}
