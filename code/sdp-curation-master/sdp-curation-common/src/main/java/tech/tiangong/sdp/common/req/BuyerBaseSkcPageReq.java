package tech.tiangong.sdp.common.req;

import lombok.Data;
import lombok.EqualsAndHashCode;
import team.aikero.blade.core.protocol.PageReq;

import java.io.Serial;
import java.util.List;

/**
 * 买手SKC查询参数
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/2 14:38
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class BuyerBaseSkcPageReq extends PageReq {


    @Serial
    private static final long serialVersionUID = 6750080800812280684L;
    /**
     * skc 模糊查询
     */
    private String designCode;
    /**
     * SKC编码
     */
    private List<String> designCodeList;
    /**
     * 现货编码
     */
    private List<String> styleCodeList;
}
