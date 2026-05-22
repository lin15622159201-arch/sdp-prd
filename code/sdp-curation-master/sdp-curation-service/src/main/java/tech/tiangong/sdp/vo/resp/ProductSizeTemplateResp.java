package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.temu.vo.resp.TemuIdNameResp;
import tech.tiangong.sdp.vo.req.ProductSizeReq;

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
public class ProductSizeTemplateResp implements Serializable {

    @Serial
    private static final long serialVersionUID = 8092367284471774939L;
    /**
     * 主键 id
     */
    private Long productSizeId;


    /**
     * 商品 ID
     */
    private Long productId;
    /**
     * 名称
     */
    private String name;
    /**
     * 重点部位
     * Yes:重点部位
     */
    private Bool show;
    /**
     * 尺码
     */
    private String size;
    /**
     * 平台尺码
     */
    private String platformSize;
    /**
     * 尺码参数组元数据
     */
    private List<TemuIdNameResp> elementList;
    /**
     * 尺码 列表

    private List<ProductSizeResp> sizes;
     */
    /**
     * 部位尺码
     */
    private List<ProductSizePartResp> parts;
}
