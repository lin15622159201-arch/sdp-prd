package tech.tiangong.sdp.temu.vo.req;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuReq;
import tech.tiangong.sdp.temu.vo.dto.TemuCustomizedTechnologyDTO;
import tech.tiangong.sdp.temu.vo.dto.TemuProductNoChargerDTO;
import tech.tiangong.sdp.temu.vo.dto.TemuProductSecondHandDTO;

import java.io.Serial;

/**
 * Temu商品-货品销售域扩展属性请求
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:55
 */
@Data
public class TemuProductSaleExtAttrReq implements TemuReq {


    @Serial
    private static final long serialVersionUID = 7932983748943863091L;
    /**
     * 备货区域，1 表示国内备货，3 表示保税仓备货
     */
    private Integer inventoryRegion;
    /**
     * 货品二手信息，二手店铺传值，其他店铺不传值
     */
    private TemuProductSecondHandDTO productSecondHandReq;

    /**
     * 定制工艺请求
     */
    private TemuCustomizedTechnologyDTO customizedTechnologyReq;

    /**
     * 货品无充电器版本信息 (从有到无要传空list清空)
     */
    private TemuProductNoChargerDTO productNoChargerReq;
}
