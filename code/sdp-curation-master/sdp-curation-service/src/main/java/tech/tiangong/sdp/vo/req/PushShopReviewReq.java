package tech.tiangong.sdp.vo.req;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * 推送店家审核
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/3 16:58
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PushShopReviewReq implements Serializable {

    @Serial
    private static final long serialVersionUID = 8739452072134486893L;

    /**
     * 款号ID
     */
    @NotEmpty(message = "SPU-ID不能为空!")
    private List<Long> styleIds;


}
