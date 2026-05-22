package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.tiangong.sdp.common.resp.BaseVO;
import tech.tiangong.sdp.vo.dto.SizePartValueDTO;

import java.io.Serial;
import java.util.List;

/**
 * 档差
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/25 15:09
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class SizeDiffResp extends BaseVO {

    @Serial
    private static final long serialVersionUID = 7296061274680234055L;
    /**
     * 主键id
     */
    private Long sizeDiffId;

    /**
     * 尺码
     */
    private String sizeCode;

    /**
     * 尺码名称
     */
    private String sizeName;

    /**
     * 部位
     */
    private String part;

    /**
     * 尺码
     */
    private String size;


    /**
     * 是否启用【1启用；0禁用】
     */
    private Integer enable;
    /**
     * 档差值
     */
    private List<SizePartValueDTO> diffs;
}
