package tech.tiangong.sdp.vo.req;


import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * 设计师查询
 *
 * @author while
 * @since 2025-02-25 11:37:13
 */
@Data
public class DesignerReq implements Serializable {

    @Serial
    private static final long serialVersionUID = 6872339691539289672L;

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

}
