package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;

/**
 * 商品列表查询-品类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/3/17 18:32
 */
@Data
public class TemuProductPageCategoryResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = -7871664943495365301L;
    private Integer catId;
    private String catName;
}
