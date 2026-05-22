package tech.tiangong.sdp.common.req;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * 买手取消参数
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/2 14:38
 */
@Data
public class BuyerGenerateCodeItemReq implements Serializable {

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
     * 创建skc款号必须传：品类名称
     */
    private String categoryName;
    /**
     * skc款号数量
     */
    @NotNull(message = "skc款号数量不能为空")
    private Integer designCodeCount;

    /**
     * 是否创建SPU
     */
    @NotNull(message = "是否创建SPU不能为空")
    private Boolean createNewSpu;
}
