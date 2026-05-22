package tech.tiangong.sdp.vo.req;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * @Created by jeromeliu
 * @ClassName PrototypeExcelReq
 * @Description
 * @Date 2025/1/16 16:45
 */
@Data
public class PrototypeExcelReq {

    @NotNull(message = "设计款号不能为空")
    private List<String> designCodeList;
}
