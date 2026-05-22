package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.tiangong.sdp.temu.vo.TemuResp;
import tech.tiangong.sdp.temu.vo.dto.TemuSizeSpecClassCatDTO;

import java.io.Serial;
import java.util.List;

/**
 * 尺码分组配置
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/29 9:57
 */
@EqualsAndHashCode(callSuper = false)
@Data
public class TemuSizeSpecClassResultResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = 501683019614850936L;
    /**
     * 尺寸规格分类信息
     */
    private TemuSizeSpecClassCatDTO sizeSpecClassCat;
}
