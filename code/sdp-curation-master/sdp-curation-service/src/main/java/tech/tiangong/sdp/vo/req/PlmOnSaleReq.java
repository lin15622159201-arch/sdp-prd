package tech.tiangong.sdp.vo.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

/**
 * Plm动销
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/15 16:00
 */
@AllArgsConstructor
@NoArgsConstructor
@Data
public class PlmOnSaleReq implements Serializable {
    @Serial
    private static final long serialVersionUID = 7618414141018873218L;
    /**
     * SPU款号
     */
    private String styleCode;
    /**
     * 动销信息
     */
    private PlmOnSaleInfoReq onSaleInfo;
}
