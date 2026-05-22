package tech.tiangong.sdp.temu.vo.dto;

import lombok.Data;

import java.util.Map;

/**
 * TemuSizeChartsContentRecordDTO
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/8 14:42
 */
@Data
public class TemuSizeChartsContentRecordDTO {
    /**
     * 元数据 ID与值的映射关系
     */
    private Map<String, String> values;
}
