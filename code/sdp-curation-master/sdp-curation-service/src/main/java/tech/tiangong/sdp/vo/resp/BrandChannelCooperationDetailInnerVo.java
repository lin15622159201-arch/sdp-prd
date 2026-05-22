package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * 合作模式
 *
 * @author ：liuhongfu@zj.tech
 * @version :1.0
 * @date ：2025/12/25 15:09
 */
@EqualsAndHashCode(callSuper = false)
@Data
public class BrandChannelCooperationDetailInnerVo implements Serializable {
    @Serial
    private static final long serialVersionUID = 7507033471735932273L;

    /**
     * 采购商id
     */
    private Long purchaserId;

    /**
     * 采购商编码
     */
    private String purchaserCode;

    /**
     * 采购商名字
     */
    private String purchaserName;

    /**
     * 品牌信息
     */
    private List<BrandInfoInnerVo> brandList;
}
