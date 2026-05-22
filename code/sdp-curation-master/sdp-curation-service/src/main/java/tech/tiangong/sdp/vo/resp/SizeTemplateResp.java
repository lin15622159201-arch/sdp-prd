package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.tiangong.sdp.common.resp.BaseVO;

import java.io.Serial;
import java.util.List;

/**
 * 尺码模板
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/25 15:09
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class SizeTemplateResp extends BaseVO {
    @Serial
    private static final long serialVersionUID = 8563669740226567684L;
    /**
     * 模板 ID
     */
    private Long templateId;
    /**
     * 模板名
     */
    private String templateName;

    /**
     * 品类 ID
     */
    private Long catId;
    /**
     * 品类名称
     */
    private String catName;

    /**
     * 尺码组编码
     */
    private String groupCode;
    /**
     * 尺码组名称
     */
    private String groupName;
    /**
     * 是否启用【1启用；0禁用】
     */
    private Integer enable;
    /**
     * 尺码
     */
    private List<String> sizes;
    /**
     * 部位
     */
    private List<String> parts;
    /**
     * 尺码列表
     */
    private List<SizeTemplateVO> temps;
}
