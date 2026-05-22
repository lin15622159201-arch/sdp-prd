package tech.tiangong.sdp.vo.req;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import tech.tiangong.sdp.common.req.BaseTenantUserReq;
import java.io.Serializable;
import java.util.List;

/**
 * 推送PLMReq
 *
 * @author husky
 * @since 2021-08-09 14:43:20
 */
@Data
@Accessors(chain = true)
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class PushPlmSendReq  extends BaseTenantUserReq implements Serializable {

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
     * A数据已经推送
     * B数据进行复色A数据
     * 编辑B数据的时候需要推送B数据以及该SPU下面的图片信息通知PLM
     *
     * 是否是复色-首次编辑的推送
     */
    private Boolean colorMaking = false;


}