package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;

/**
 * 商品列表查询-属性
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/3/17 18:32
 */
@Data
public class TemuProductPagePropertyResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = -3124819374724690640L;
    private Integer vid;
    private String valueUnit;
    private Integer pid;
    private String language;
    private String numberInputValue;
    private Integer templatePid;
    private String propValue;
    private String valueExtendInfo;
    private String propName;
    private Integer refPid;
}
