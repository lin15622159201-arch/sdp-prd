package tech.tiangong.sdp.vo.req;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * 版单批量打印Req
 *
 * @author husky
 * @since 2021-08-09 14:43:20
 */
@Data
public class BatchPrintReq implements Serializable {

    private static final long serialVersionUID = -2217516204964690926L;

    /**
     * 设计款号集合
     */
    /*@NotEmpty(message = "设计款号为空! ")
    private List<String> designCodeList;*/

    /**
     * 设计款号ID集合
     */
    @NotEmpty(message = "设计款号ID为空! ")
    private List<Long> prototypeIdList;

}