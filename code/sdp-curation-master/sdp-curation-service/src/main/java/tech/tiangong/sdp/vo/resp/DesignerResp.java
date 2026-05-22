package tech.tiangong.sdp.vo.resp;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * @author liuhongfu
 */
@Data
public class DesignerResp implements Serializable {

    @Serial
    private static final long serialVersionUID = 7004855187305100586L;

    /**
     *
     */
    private Long id;
    /**
     * 设计师id【设计师】
     */
    private String designerId;

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
