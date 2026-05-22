package tech.tiangong.sdp.vo.resp;

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
public class BatchCreateSpuSkcResp implements Serializable {

    @Serial
    private static final long serialVersionUID = 7004855187305100586L;

    List<SpuCreateResult> spuCreateResults;


    /**
     * SPU-SKC推送返回信息
     */
    @Data
    @SuperBuilder
    @Accessors(chain = true)
    @NoArgsConstructor
    public static class SpuCreateResult implements Serializable {
        @Serial
        private static final long serialVersionUID = -3572155942378577417L;

        /**
         * Spu编码
         */
        private String styleCode;


        /**
         * spu款号
         */
        private List<String> designCodes;

    }


}
