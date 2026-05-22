package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;

/**
 *
 * 正常打版SKC resp
 * @author while
 * @date 2022/8/27 18:37
 */

@Data
@Accessors(chain = true)
public class NormalSkcCreateResp implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * spuId主键
     */
    private Long designStyleId;

    /**
     * 成衣SPU(款式SPU)。SPU+年份+6位流水号
     */
    private String styleCode;

    /**
     * 版单id
     */
    private Long prototypeId;

    /**
     * 设计款号。 skc+年月日+4位流水号
     */
    private String designCode;
}
