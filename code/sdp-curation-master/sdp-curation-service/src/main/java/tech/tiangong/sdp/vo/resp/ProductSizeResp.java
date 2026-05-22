package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.resp.TemuIdNameResp;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * 商品-SKC尺码
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/13 11:39
 */
@Data
public class ProductSizeResp implements Serializable {
    @Serial
    private static final long serialVersionUID = -6358521801826194447L;
    /**
     * 尺码
     */
    private String size;
    /**
     * 平台尺码
     */
    private String platformSize;
    /**
     * 部位尺码
     */
    private List<ProductSizePartResp> parts;
    /**
     * 尺码参数组元数据
     */
    private List<TemuIdNameResp> elementList;
}
