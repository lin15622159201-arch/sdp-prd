package tech.tiangong.sdp.temu.vo.dto;

import lombok.Data;

/**
 * WarehouseRoute
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:06
 */
@Data
public class TemuProductSkuNetContentDTO {
    /**
     * 净含量单位，1：液体盎司，2：毫升，3：加仑，4：升，5：克，6：千克，7：常衡盎司，8：磅
     */
    private Integer netContentUnitCode;
    /**
     * 净含量数值
     */
    private Integer netContentNumber;
}
