package tech.tiangong.sdp.vo.resp;


import lombok.Data;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
* 设计打版备注信息
* <br>CreateDate August 10,2021
* @author lujunxuan
* @since 1.0
*/
@Data
public class DesignRemarksVO implements Serializable {

    private static final long serialVersionUID = -9109541356409156779L;

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
     * @see DesignRemarksBizTypeEnum
    */
    private String bizType;
    /**
    * 成衣SPU(款式SPU)。SPU+年份+6位流水号
    */
    private String styleCode;
    /**
    * 设计款号。 skc+年月日+4位流水号
    */
    private String designCode;
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
    private LocalDateTime createdTime;
}
