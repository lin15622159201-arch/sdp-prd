package tech.tiangong.sdp.temu.vo.req;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuReq;
import tech.tiangong.sdp.temu.vo.dto.TemuSizeChartsContentMetaDTO;
import tech.tiangong.sdp.temu.vo.dto.TemuSizeChartsContentRecordDTO;

import java.io.Serial;
import java.util.List;

/**
 * 新增尺码表-内容
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:55
 */
@Data
public class TemuSizeChartsContentReq implements TemuReq {

    @Serial
    private static final long serialVersionUID = 9158193501899164943L;
    /**
     * 发布码类型 (同尺码组id)
     */
    private Integer generalSizeType;
    /**
     * 本地码来源
     */
    private Integer localSizeSource;

    /**
     * 尺码组与尺码参数元数据
     */
    private TemuSizeChartsContentMetaDTO meta;
    /**
     * 基码表尺码组与尺码参数元数据
     */
    private TemuSizeChartsContentMetaDTO bodyMeta;
    /**
     * 商品尺码表元数据-值映射关系
     */
    private List<TemuSizeChartsContentRecordDTO> records;

    /**
     * 基码表元数据-值映射关系
     */
    private List<TemuSizeChartsContentRecordDTO> bodyRecords;
}
