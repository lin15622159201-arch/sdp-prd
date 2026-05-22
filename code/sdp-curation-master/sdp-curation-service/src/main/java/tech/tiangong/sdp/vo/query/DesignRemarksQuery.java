package tech.tiangong.sdp.vo.query;

import lombok.Data;
import lombok.EqualsAndHashCode;
import team.aikero.blade.core.protocol.PageReq;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
* 设计打版备注信息
* <br>CreateDate August 10,2021
* @author lujunxuan
* @since 1.0
*/
@Data
@EqualsAndHashCode(callSuper = false)
public class DesignRemarksQuery extends PageReq implements Serializable {

    private static final long serialVersionUID = 8081976025866451245L;

    /**
    * 自增id
    */
    private Long id;
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
    private LocalDateTime createdTime;
}
