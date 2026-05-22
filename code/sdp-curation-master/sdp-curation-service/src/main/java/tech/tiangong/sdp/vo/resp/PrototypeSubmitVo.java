package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;

/**
 * 拆板-提交vo
 *
 * @author while
 */
@Data
@Accessors(chain = true)
public class PrototypeSubmitVo implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * SKC主键ID不能为空
     */
    private Long prototypeId;

    /**
     * 设计款号。 skc+年月日+4位流水号
     */
    private String designCode;

    /**
     * skc下最新版本的bom单id
     */
    private Long latestVersionBomId;

    /**
     * bom表单编号
     */
    private String bomCode;

}