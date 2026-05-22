package tech.tiangong.sdp.vo.req;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * 设计师
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/4 10:03
 */
@Data
public class DesignerRemoteReq implements Serializable {

    @Serial
    private static final long serialVersionUID = 2964207772035363581L;
    /**
     * 设计师id【设计师】
     */
    private String designerId;
    /**
     * 设计师id集合【设计师】
     */
    private List<String> designerIdList;
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
