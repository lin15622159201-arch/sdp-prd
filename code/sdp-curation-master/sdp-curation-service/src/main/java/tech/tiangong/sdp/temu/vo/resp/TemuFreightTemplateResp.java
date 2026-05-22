package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.tiangong.sdp.temu.vo.TemuResp;
import tech.tiangong.sdp.temu.vo.dto.TemuFreightTemplateDTO ;

import java.io.Serial;
import java.util.List;

/**
 * SKU 规格信息
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/29 9:57
 */
@EqualsAndHashCode(callSuper = false)
@Data
public class TemuFreightTemplateResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = 4177296269177953934L;
    /**
     * 运费模板摘要信息列表
     */
    private List<TemuFreightTemplateDTO> freightTemplates;
}
