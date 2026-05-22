package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;
import java.util.List;

/**
 * Temu-商品搜索SKC
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/31 18:23
 */
@Data
public class TemuSearchSkcResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = -1574019591152163164L;
    /**
     * 货品skc Id
     */
    private Long skcId;

    /**
     * 选品状态
     * "selectStatus": 7,--价格申报中
     * "selectStatus": 9,--价格已作废
     * "selectStatus": 10,--未发布到站点
     * "selectStatus": 12,--已发布到站点
     * "selectStatus": 13,--已下架/终止
     */
    private Integer selectStatus;

    /**
     * 申诉JIT的状态
     * 1 - 可申请
     * 3 - 不可申请
     */
    private Integer applyJitStatus;

    /**
     * 是否建议关闭 JIT按钮
     */
    private Boolean suggestCloseJit;
    /**
     * sku 列表
     */
    private List<TemuSearchSkuResp> skuList;
}
