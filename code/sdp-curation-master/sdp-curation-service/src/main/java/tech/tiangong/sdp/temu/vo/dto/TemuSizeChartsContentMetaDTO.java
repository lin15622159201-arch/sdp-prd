package tech.tiangong.sdp.temu.vo.dto;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.resp.TemuIdNameResp;

import java.util.List;

/**
 * TemuSizeChartsContentMetaDTO
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/8 14:42
 */
@Data
public class TemuSizeChartsContentMetaDTO {
    /**
     * 尺码组元数据
     */
    private List<TemuIdNameResp> groupList;
    /**
     * 尺码参数组元数据
     */
    private List<TemuIdNameResp> elementList;
}
