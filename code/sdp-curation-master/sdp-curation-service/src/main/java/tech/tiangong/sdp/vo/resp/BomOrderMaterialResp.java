package tech.tiangong.sdp.vo.resp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;
import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * @author liuhongfu
 */
@Data
public class BomOrderMaterialResp implements Serializable {

    @Serial
    private static final long serialVersionUID = 7004855187305100586L;



    /**
     * SPU编码
     */
    private String styleCode;

    /**
     * Bom列表信息
     */
    private List<BomResp> bomOrderMaterialList;


    @Data
    @SuperBuilder
    @Accessors(chain = true)
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BomResp implements Serializable {

        @Serial
        private static final long serialVersionUID = -3572155942378577417L;

        /**
         * 物料类型: 1, 面料; 2, 辅料; 3:特殊辅料
         */
        private Integer demandType;


        /**
         * 物料SPU-ID（商品id）
         */
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

}
