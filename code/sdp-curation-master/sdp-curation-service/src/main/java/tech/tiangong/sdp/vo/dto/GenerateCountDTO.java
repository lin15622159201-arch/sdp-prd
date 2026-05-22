package tech.tiangong.sdp.vo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.io.Serial;
import java.io.Serializable;

/**
 * 生成SPU-SKC个数
 *
 * @author liuhongfu@zj.tech
 * @since 2025-11-03 14:39:39
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GenerateCountDTO implements Serializable {

    @Serial
    private static final long serialVersionUID = -5697174772476386379L;

    /**
     * 生成数量
     */
    @NotNull(message = "生成数量不能为空！")
    private Integer generateCount;


}