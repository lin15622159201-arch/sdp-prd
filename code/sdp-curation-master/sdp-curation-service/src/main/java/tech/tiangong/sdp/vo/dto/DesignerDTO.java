package tech.tiangong.sdp.vo.dto;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * 设计师
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/4 10:03
 */
@Data
public class DesignerDTO implements Serializable {

    @Serial
    private static final long serialVersionUID = 4458781511887081171L;
    /**
     *
     */
    private Long id;
    /**
     * 设计师id【设计师】
     */
    private Long designerId;

    /**
     * 设计师编号【设计师】
     */
    private String designerCode;

    /**
     * 设计师名称【设计师】
     */
    private String designerName;

    /**
     * 设计师组别编码
     */
    private String designerGroupCode;

    /**
     * 设计师组别名称
     */
    private String designerGroupName;

    /**
     * 手机号码
     */
    private String mobilePhone;


}