package tech.tiangong.sdp.temu.vo.req;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuReq;
import tech.tiangong.sdp.temu.vo.dto.TemuSemiManagedSiteModeDTO;

import java.io.Serial;
import java.util.List;

/**
 * Temu商品-半托管相关信息
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:04
 */
@Data
public class TemuProductSemiManagedReq implements TemuReq {
    @Serial
    private static final long serialVersionUID = 6325145497524093382L;
    /**
     * 半托管-素材语种策略
     */
    private Integer semiLanguageStrategy ;
    /**
     * 绑定站点列表
     */
    private List<TemuSemiManagedSiteModeDTO> bindSiteIds;
}
