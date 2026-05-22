package tech.tiangong.sdp.vo.req;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import java.io.Serializable;
import java.util.List;

/**
 * 测价是否通过
 *
 * @author liuhongfu
 * @since 2021-08-09 14:43:20
 */
@Data
@Accessors(chain = true)
@NoArgsConstructor
public class DesignStylePricePassed implements Serializable {

    private static final long serialVersionUID = -2217516204964690926L;

    /**
     * SPU-ID数组
     */
    @NotNull(message = "SPU-ID不能为空! ")
    private List<Long> designStyleIds;


    /**
     * 测价通过状态 0=否 1=是
     */
    @NotNull(message = " 测价通过状态不能为空! ")
    private Integer pricePassedState;
}