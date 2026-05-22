package tech.tiangong.sdp.vo.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * @author liuhongfu
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DesignerDataReq implements Serializable {

    @Serial
    private static final long serialVersionUID = 4596431991444125073L;


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
