package tech.tiangong.sdp.temu.vo.req;

import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.tiangong.sdp.temu.vo.TemuCommonReq;

import java.io.Serial;
import java.util.List;

/**
 * Temu商品-货品skc列表查询
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:55
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class TemuProductListGetPageReq extends TemuCommonReq {

    @Serial
    private static final long serialVersionUID = 3756342379861352979L;
    /**
     * 本地SKC款号
     */
    private String skcExtCode ;
    /**
     * 页码
     */
    private Integer page;
    /**
     * 分页大小
     */
    private Integer pageSize;
    /**
     * SKC站点状态
     */
    private Integer skcSiteStatus;
    /**
     * SKC ID
     */
    private List<Long> productSkcIds;
}
