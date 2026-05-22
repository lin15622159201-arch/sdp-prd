package tech.tiangong.sdp.vo.req;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;
import tech.tiangong.sdp.enums.SkcTypeEnum;

import java.io.Serializable;

/**
 * spu创建skc Req
 *
 * @author while
 */
@Data
@SuperBuilder
@Accessors(chain = true)
@NoArgsConstructor
public class SpuCreateSkcReq implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * 款类型
     */
    private SkcTypeEnum skcTypeEnum;

    /**
     * 品质等级
     */
    private String qualityLevel;

    /**
     * 品质等级编号
     */
    private String qualityLevelCode;


}