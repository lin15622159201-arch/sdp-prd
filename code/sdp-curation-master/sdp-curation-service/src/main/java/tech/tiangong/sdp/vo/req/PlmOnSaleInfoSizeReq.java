package tech.tiangong.sdp.vo.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

/**
 * Plm动销尺码
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/15 16:03
 */
@AllArgsConstructor
@NoArgsConstructor
@Data
public class PlmOnSaleInfoSizeReq implements Serializable {
    @Serial
    private static final long serialVersionUID = 131953774417775449L;
    /**
     * 生产尺码
     */
    private String size;
    /**
     * 生产数量
     */
    private Long quantity;
}
