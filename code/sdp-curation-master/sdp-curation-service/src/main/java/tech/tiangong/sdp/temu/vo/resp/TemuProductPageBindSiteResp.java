package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;

/**
 * 商品列表查询-站点
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/3/17 18:32
 */
@Data
public class TemuProductPageBindSiteResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = -919472761228655052L;
    private Integer siteId;
    private String siteName;
}
