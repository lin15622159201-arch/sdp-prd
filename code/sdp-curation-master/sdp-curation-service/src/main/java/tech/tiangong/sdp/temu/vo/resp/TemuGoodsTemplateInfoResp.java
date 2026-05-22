package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;
import java.util.List;

/**
 * 模板信息实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/29 9:57
 */
@Data
public class TemuGoodsTemplateInfoResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = 830634179418237577L;
    /**
     * Template ID
     */
    private Long templateId;
    /**
     * Common product attributes
     */
    private List<TemuGoodsPropertyResp> goodsProperties;
    /**
     * Product sales attributes (specifications)
     */
    private List<TemuGoodsPropertyResp> goodsSpecProperties;


}
