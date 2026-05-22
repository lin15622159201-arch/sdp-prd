package tech.tiangong.sdp.common.req;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * 买手分码参数
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/2 14:48
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BuyerGenerateCodeReq implements Serializable {
    @Serial
    private static final long serialVersionUID = 9004509169178155582L;
    @Valid
    @NotEmpty(message = "分码参数不能为空")
    private List<BuyerGenerateCodeItemReq> spuCodes;
}
