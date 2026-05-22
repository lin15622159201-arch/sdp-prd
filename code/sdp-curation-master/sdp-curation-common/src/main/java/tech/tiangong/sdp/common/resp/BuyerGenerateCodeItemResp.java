package tech.tiangong.sdp.common.resp;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * 买手取消参数
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/2 14:38
 */
@Data
public class BuyerGenerateCodeItemResp implements Serializable {

    @Serial
    private static final long serialVersionUID = 4146325760875132294L;
    /**
     * 关联PLM spu的唯一标识。可不传。
     */
    private String key;
    /**
     * spu款号
     */
    private String styleCode;
    /**
     * skc设计款款号列表
     */
    private List<String> designCodes;
}
