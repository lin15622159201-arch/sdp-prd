package tech.tiangong.sdp.vo.req;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * 批量新增设计备注 req
 * @author liuhongfu
 * @since 2021/8/16 10:07
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StylePushRemarkReq implements Serializable {

    @Serial
    private static final long serialVersionUID = 7966162961716408668L;



    /**
     * 业务类型
     */
    private String bizType;


    /**
     * 批量新增信息
     */
    @Valid
    @NotEmpty(message = "新增信息不能为空")
    private List<Remark> remarks;


    /**
     * SPU-SKC 请求信息
     */
    @Data
    @SuperBuilder
    @Accessors(chain = true)
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Remark implements Serializable {

        @Serial
        private static final long serialVersionUID = -3572155942378577417L;

        /**
         * skc编码
         */
        @Valid
        private String designCode;

        /**
         * 备注
         */
        private String remark;

    }

}
