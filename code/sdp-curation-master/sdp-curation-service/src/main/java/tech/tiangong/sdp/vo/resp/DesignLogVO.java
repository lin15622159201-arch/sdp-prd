package tech.tiangong.sdp.vo.resp;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
* 设计打版操作日志
* <br>CreateDate August 10,2021
* @author lujunxuan
* @since 1.0
*/
@Data
public class DesignLogVO implements Serializable {

    @Serial
    private static final long serialVersionUID = -8619268730408217178L;

    /**
    * id
    */
    private Long designLogId;
    /**
    * 业务id
    */
    private Long bizId;
    /**
     * 业务类型:
     *  1:设计拆版 2:物料确认(旧) 3:开发bom 4:采购申请 5:采购齐套管理 6:上新管理(旧) 7:设计需求(旧);  8:需求任务(旧); 9:灵感设计需求; 10: 数码印花
     * @see
    */
    private String bizType;
    /**
    * 成衣SPU(款式SPU)
    */
    private String styleCode;
    /**
    * 设计款号
    */
    private String designCode;
    /**
    * 业务版本号
    */
    private Integer bizVersionNum;
    /**
    * 日志信息
    */
    private String content;
    /**
    * 操作人id
    */
    private Long creatorId;
    /**
    * 操作人名称
    */
    private String creatorName;
    /**
    * 创建时间
    */
    private LocalDateTime createdTime;
}
