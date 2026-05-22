package tech.tiangong.sdp.vo.resp;


import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;

import java.io.Serial;
import java.io.Serializable;

/**
 * SPU创建 resp
 *
 * @author while
 */
@Data
@SuperBuilder
@Accessors(chain = true)
@NoArgsConstructor
public class DesignStyleCreateResp implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * spuId主键
     */
    private Long designStyleId;

    /**
     * SPU编码
     */
    private String styleCode;

    /**
     * SPU版本号
     */
    private Integer versionNum;

    /**
     * 正常打版的 版单id
     */
    private Long prototypeId;

    /**
     * 正常打版的 设计款号
     */
    private String designCode;


}
