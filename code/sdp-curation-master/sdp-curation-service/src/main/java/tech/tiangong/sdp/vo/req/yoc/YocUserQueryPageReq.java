package tech.tiangong.sdp.vo.req.yoc;


import lombok.Data;
import lombok.EqualsAndHashCode;
import team.aikero.blade.core.protocol.PageReq;

import java.io.Serial;
import java.io.Serializable;

@EqualsAndHashCode(callSuper = true)
@Data
public class YocUserQueryPageReq extends PageReq {
    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * 组织ID
     */
    private Long originId;

    /**
     * 过滤条件
     */
    private Filter filters;

    @Data
    public static class Filter implements Serializable {
        @Serial
        private static final long serialVersionUID = 1L;

        /**
         * 租户id
         */
        private Long tenantId;

        /**
         * 工号
         */
        private String code;

        /**
         * 状态：true-启用，false-停用
         */
        private Boolean state;

        /**
         * 姓名
         */
        private String name;

        /**
         * 手机号
         */
        private String phone;
    }



}
