package tech.tiangong.sdp.vo.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Plm动销信息
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/15 16:01
 */
@AllArgsConstructor
@NoArgsConstructor
@Data
public class PlmOnSaleInfoReq implements Serializable {
    @Serial
    private static final long serialVersionUID = 3470088789872254307L;
    private String saleOrderCode;
    private LocalDateTime onSaleTime;
    /**
     * 动销首单生产尺码和件数json数组
     */
    private List<PlmOnSaleInfoSizeReq> firstOrderSizeQuantityList;
}
