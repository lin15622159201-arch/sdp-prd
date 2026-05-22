package tech.tiangong.sdp.vo.req;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import java.io.Serializable;

/**
 * 款式管理批量上架不通过请求
 *
 * @author liuhongfu
 * @since 2021-08-09 14:43:20
 */
@Data
@Accessors(chain = true)
@NoArgsConstructor
public class PrototypeBatchOnShelvesResultReq implements Serializable {

    private static final long serialVersionUID = -2217516204964690926L;

    /**
     * SPU-ID
     */
    @NotNull(message = "SPU-ID不能为空! ")
    private Long spuId;


    /**
     * 审核结果
     * 通过：true
     * 不通过：false
     */
    @NotNull(message = "审核结果不能为空! ")
    private Boolean pass;

    /**
     *  驳回原因
     */
    private String listingFailReason;
}