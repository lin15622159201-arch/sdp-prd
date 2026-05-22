package tech.tiangong.sdp.vo.req;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;

/**
 * 排单变更Req
 *
 * @author husky
 * @since 2021-08-09 14:43:20
 */
@Data
public class SpotStyleChangeDesignerReq implements Serializable {

    private static final long serialVersionUID = -2217516204964690926L;

    /**
     * 现货SPU-ID数组
     */
    @NotEmpty(message = "现货SPU-ID为空! ")
    private List<Long> taskIds;
    
    /**
     * 设计师id【设计师】
     */
    @NotNull(message = "设计师id不能为空")
    private Long designerId;


    /**
     * 设计师名称【设计师】
     */
    private String designerName;

}