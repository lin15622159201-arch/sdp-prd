package tech.tiangong.sdp.temu.vo.dto;

import lombok.Data;

/**
 * 绑定站点
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:06
 */
@Data
public class TemuSemiManagedSiteModeDTO {
    /**
     * 半托管站点售卖模式，1:泛欧售卖，全欧洲售卖（包含未开站），2:非泛欧售卖，支持选择欧洲站点（包含未开站）
     */
    private Integer semiManagedSiteMode ;
}
