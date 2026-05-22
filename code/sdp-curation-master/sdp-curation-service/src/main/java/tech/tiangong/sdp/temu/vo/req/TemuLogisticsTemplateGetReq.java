package tech.tiangong.sdp.temu.vo.req;

import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.tiangong.sdp.temu.vo.TemuCommonReq;

import java.io.Serial;
import java.util.List;

/**
 * Temu商品-查询运费模板列表
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:55
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class TemuLogisticsTemplateGetReq extends TemuCommonReq {

    @Serial
    private static final long serialVersionUID = 2315221655048528764L;
    /**
     * 站点列表
     */
    private List<Integer> siteIds;
}
