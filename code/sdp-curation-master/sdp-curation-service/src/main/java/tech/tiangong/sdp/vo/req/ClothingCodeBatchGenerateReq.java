package tech.tiangong.sdp.vo.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * 批量样衣编号生成（SPU和SKC）
 * @author liuhongfu
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClothingCodeBatchGenerateReq implements Serializable {

    @Serial
    private static final long serialVersionUID = 4596431991444125073L;

    private String sourceEnum;

    List<ClothingCodeGenerateReq> spuCodes;


    /**
     * SPU-SKC 请求信息
     */
    @Data
    @SuperBuilder
    @Accessors(chain = true)
    @NoArgsConstructor
    public static class ClothingCodeGenerateReq implements Serializable {
        @Serial
        private static final long serialVersionUID = -3572155942378577417L;

        /**
         * 关联PLM spu的唯一标识。可不传
         */
        private String key;

        /**
         * 是否创建SPU
         * 若是，不用传styleCode，否则必传
         */
        private boolean createNewSpu;

        /**
         * spu款号
         * 若传spu款号，则会基于当前spu生成skc.
         */
        private String styleCode;

        /**
         * skc款号数量
         * 若传0，则不生成skc code
         */
        private Integer designCodeCount;

    }

}
