package tech.tiangong.sdp.temu.vo.req;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuReq;

import java.io.Serial;
import java.util.List;

/**
 * 新增尺码表-附加信息
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:55
 */
@Data
public class TemuSizeChartsExtReq implements TemuReq {
    @Serial
    private static final long serialVersionUID = -8292616007905774145L;
    /**
     * 是否为双码 (不传默认否)
     */
    private Boolean isDoubleSize;

    /**
     * 手动录入的尺码组
     */
    private List<Integer> manualGroupIdList;
}
