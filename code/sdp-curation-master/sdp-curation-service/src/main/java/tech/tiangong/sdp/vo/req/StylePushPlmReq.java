package tech.tiangong.sdp.vo.req;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;

import javax.validation.constraints.NotNull;
import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * 批量新增spu和skc req
 * @author liuhongfu
 * @since 2021/8/16 10:07
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StylePushPlmReq implements Serializable {

    @Serial
    private static final long serialVersionUID = 7966162961716408668L;
    /**
     * 批量新增信息
     */
    @Valid
    @NotEmpty(message = "新增信息不能为空")
    private List<StyleReq> spuSkcList;


    /**
     * SPU-SKC 请求信息
     */
    @Data
    @SuperBuilder
    @Accessors(chain = true)
    @NoArgsConstructor
    @AllArgsConstructor
    public static class StyleReq implements Serializable {

        @Serial
        private static final long serialVersionUID = -3572155942378577417L;

        /**
         * spu款
         */
        @Valid
        @NotNull(message = "SPU款信息不能为空")
        private DesignStylePullReq designStyle;

        /**
         * 批量skc款
         */
        @Valid
        @NotEmpty(message = "SKC款列表不能为空")
        private List<PrototypePullReq> prototypes;

    }

}
