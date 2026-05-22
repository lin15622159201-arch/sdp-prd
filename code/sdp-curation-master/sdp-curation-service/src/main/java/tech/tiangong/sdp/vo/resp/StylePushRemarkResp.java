package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;

import java.io.Serial;
import java.io.Serializable;

/**
 * @author liuhongfu
 */
@Data
@SuperBuilder
@Accessors(chain = true)
@NoArgsConstructor
public class StylePushRemarkResp implements Serializable {

    @Serial
    private static final long serialVersionUID = 7004855187305100586L;

    /**
     * 自增id
     */
    private Long designRemarksId;

    /**
     * 业务id
     */
    private Long bizId;

    /**
     * 业务类型
     */
    private String bizType;

    /**
     * 打版信息id
     */
    private Long prototypeId;

    /**
     * 成衣SPU(款式SPU)。SPU+年份+6位流水号
     */
    private String styleCode;

    /**
     * 设计款号。 skc+年月日+4位流水号
     */
    private String designCode;

    /**
     * 版本号
     */
    private Integer versionNum;

    /**
     * 业务版本号
     */
    private Integer bizVersionNum;

    /**
     * 备注信息
     */
    private String remark;

    /**
     * 操作人id
     */
    private Long creatorId;

    /**
     * 操作人名称
     */
    private String createdName;

    /**
     * 创建时间
     */
    private String createdTime;


}
