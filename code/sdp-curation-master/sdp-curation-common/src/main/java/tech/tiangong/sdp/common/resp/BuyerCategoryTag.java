package tech.tiangong.sdp.common.resp;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * BuyerCategoryTag
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/2 15:46
 */
@Data
public class BuyerCategoryTag implements Serializable {
    @Serial
    private static final long serialVersionUID = -8108636075754690525L;
    /**
     * 标签编码
     */
    private String clothTagCode;

    /**
     * 标签名称
     */
    private String clothTagName;

    /**
     * 标签值编码
     */
    private String tagCode;

    /**
     * 标签值名称
     */
    private String tagName;
}
