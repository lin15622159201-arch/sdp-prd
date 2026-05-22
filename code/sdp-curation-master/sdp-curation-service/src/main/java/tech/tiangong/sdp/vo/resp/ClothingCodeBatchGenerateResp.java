package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;
import tech.tiangong.sdp.vo.req.ClothingCodeBatchGenerateReq;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * @author liuhongfu
 */
@Data
public class ClothingCodeBatchGenerateResp implements Serializable {

    @Serial
    private static final long serialVersionUID = 7004855187305100586L;

    List<ClothingCodeGenerateResp> spuCodes;


    /**
     * SPU-SKC 请求信息
     */
    @Data
    @SuperBuilder
    @Accessors(chain = true)
    @NoArgsConstructor
    public static class ClothingCodeGenerateResp implements Serializable {
        @Serial
        private static final long serialVersionUID = -3572155942378577417L;

        /**
         * 关联PLM spu的唯一标识。可不传
         */
        private String key;


        /**
         * spu款号
         */
        private String styleCode;

        /**
         * skc设计款款号列表
         */
        private List<String> designCodes;

    }


}
