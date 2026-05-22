package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;

import java.io.Serial;
import java.io.Serializable;

/**
 * bom信息-vo
 *
 * @author while
 */

@Data
@SuperBuilder
@Accessors(chain = true)
@NoArgsConstructor
public class BomOrderVo implements Serializable {
    @Serial
    private static final long serialVersionUID = 396431891374319971L;

    /**
     * 主键ID
     */
    private Long id;


    /**
     * 开款任务ID
     */
    private Long developStyleTaskId;

    /**
     * 物料类型: 1, 面料; 2, 辅料; 3:特殊辅料
     */
    private Integer demandType;


    private Long commodityId;

    /**
     * 物料SPU（商品编码）
     */
    private String commodityCode;


    /**
     * skuId
     */
    private Long skuId;

    /**
     * SKU编码
     */
    private String skuCode;

}
