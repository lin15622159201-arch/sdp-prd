package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;
import java.util.List;

/**
 * 模板结果实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/29 9:57
 */
@Data
public class TemuGoodsTemplateResultResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = -8080885761203515527L;
    /**
     * Upper limit of custom specification values under a single parent specification
     */
    private Integer singleSpecValueNum;
    /**
     * Maximum number of custom parent specifications allowed
     */
    private Integer inputMaxSpecNum;
    /**
     * 限定规格是否全选:0否,1是
     */
    private Boolean chooseAllQualifySpec;
    /**
     * Attribute template
     */
    private TemuGoodsTemplateInfoResp templateInfo;
    /**
     * A list of custom parent specifications to be used when there is no template or the template has custom specifications.
     */
    private List<TemuGoodsUserInputParentSpecResp> userInputParentSpecList;

    /**
     * Product sales attributes (specifications)
     */
    private List<TemuGoodsPropertyResp> properties;
}
