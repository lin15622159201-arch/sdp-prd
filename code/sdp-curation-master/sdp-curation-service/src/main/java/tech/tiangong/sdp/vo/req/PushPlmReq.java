package tech.tiangong.sdp.vo.req;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.io.Serializable;
import java.util.List;

/**
 * 推送PLMReq
 *
 * @author husky
 * @since 2021-08-09 14:43:20
 */
@Data
public class PushPlmReq implements Serializable {

    private static final long serialVersionUID = -2217516204964690926L;

    /**
     * SKC主键ID数组
     */
    @NotEmpty(message = "SKC主键ID数组不能为空! ")
    private List<Long> prototypeIds;

    /**
     * 设计师id【设计师】,PLM的
     */
    @NotNull(message = "设计师id不能为空! ")
    private Long designerId;

    /**
     * 设计师名称【设计师】,PLM的
     */
    private String designerName;

    /**
     * 是否是复色的推送
     */
    private Boolean colorMaking = false;


}