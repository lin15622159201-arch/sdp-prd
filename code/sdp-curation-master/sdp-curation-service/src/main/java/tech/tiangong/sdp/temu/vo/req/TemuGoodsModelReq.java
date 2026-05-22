package tech.tiangong.sdp.temu.vo.req;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuReq;
import tech.tiangong.sdp.temu.vo.dto.TemuWarehouseRouteDTO;

import java.io.Serial;
import java.util.List;

/**
 * Temu商品-商品模特列表请求
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:04
 */
@Data
public class TemuGoodsModelReq implements TemuReq {
    @Serial
    private static final long serialVersionUID = -5424461712701883376L;
    /**
     * 模特头像
     */
    private String modelProfileUrl;

    /**
     * 试穿尺码规格名称
     */
    private String sizeSpecName;

    /**
     * 模特id，新增虚拟模特场景不传
     */
    private Long modelId;

    /**
     * 试穿尺码规格 id
     */
    private Integer sizeSpecId;

    /**
     * 模特腰围文本
     */
    private String modelWaist;

    /**
     * 模特类型
     * 1：成衣模特，2：鞋模
     */
    private Integer modelType;

    /**
     * 模特名称
     */
    private String modelName;

    /**
     * 模特身高文本
     */
    private String modelHeight;

    /**
     * 模特特性
     * 1：真实模特，2：虚拟模特
     */
    private Integer modelFeature;

    /**
     * 模特脚宽文本
     */
    private String modelFootWidth;

    /**
     * 模特胸围文本
     */
    private String modelBust;

    /**
     * 模特脚长文本
     */
    private String modelFootLength;

    /**
     * 试穿心得
     * TRUE_TO_SIZE(1, "舒适"), TOO_SMALL(2, "紧身"), TOO_LARGE(3, "宽松"),
     */
    private Integer tryOnResult;

    /**
     * 模特臀围文本
     */
    private String modelHip;

}
