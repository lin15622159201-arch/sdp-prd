package tech.tiangong.sdp.vo.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

/**
 * 批量取消设计款-请求PLM
 * @author liuhongfu
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BatchCancelDesignCodeReq implements Serializable {

    @Serial
    private static final long serialVersionUID = 4596431991444125073L;


    /**
     * 设计款取消信息列表
     */
    List<CancelDesignCodeReq> cancelItems;


    /**
     * SPU-SKC 请求信息
     */
    @Data
    @SuperBuilder
    @Accessors(chain = true)
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CancelDesignCodeReq implements Serializable {
        @Serial
        private static final long serialVersionUID = -3572155942378577417L;

        /**
         * 设计款编码
         */
        private String designCode;

        /**
         * 取消原因
         */
        private String cancelReason;

        /**
         * 取消备注
         */
        private String cancelRemark;

        /**
         * 版单取消时间
         */
        private LocalDateTime cancelTime;

        /**
         * 取消版单操作人id
         */
        private Long cancelUserId;

        /**
         * 取消版单操作人编号
         */
        private String cancelUserCode;

        /**
         * 版单取消操作人姓名
         */
        private String cancelUserName;

    }

}
