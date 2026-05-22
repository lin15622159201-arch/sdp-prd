package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;
import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * 设计款管理 spu + skc
 *
 * @author while
 */
@Data
@SuperBuilder
@Accessors(chain = true)
@NoArgsConstructor
public class PrototypeTagVo implements Serializable {
    @Serial
    private static final long serialVersionUID = 5679086965017512544L;

    /**
     * SPU信息
     */
    private DesignStyleVo styleInfo;

    /**
     * skc基础信息
     */
    private PrototypeInfoVo prototypeInfo;


    /**
     * 上架商品信息 (款式开发)
     */
    private OnShelfInfo onShelfInfo;



    /**
     * 上架商品信息
     */
    @Data
    @SuperBuilder
    @Accessors(chain = true)
    @NoArgsConstructor
    public static class OnShelfInfo implements Serializable {
        @Serial
        private static final long serialVersionUID = -3572155942378577417L;

        /**
         * SPU编码
         */
        private String styleCode;

        /**
         * SKC编码
         */
        private String designCode;

        /**
         * spu详情图集合
         */
        private List<String> spuDetailImageList;

        /**
         * skc图集合
         */
        private List<String> skcImageList;
    }
}
