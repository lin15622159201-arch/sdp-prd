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
 * 批量更新客户图片-请求PLM
 * @author liuhongfu
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BatchUpdateSkcCustomerPictureReq implements Serializable {

    @Serial
    private static final long serialVersionUID = 4596431991444125073L;


    /**
     * 设计款取消信息列表
     */
    List<UpdateSkcCustomerPicture> items;


    /**
     * 更新商品图 请求信息
     */
    @Data
    @SuperBuilder
    @Accessors(chain = true)
    @NoArgsConstructor
    public static class UpdateSkcCustomerPicture implements Serializable {
        @Serial
        private static final long serialVersionUID = -3572155942378577417L;

        /**
         * 设计款编码
         */
        private String designCode;

        /**
         * skc营销图片
         */
        private List<String> marketingPicture;

        /**
         * skc营销图片
         */
        private List<String> styleMarketingPicture;

    }

}
