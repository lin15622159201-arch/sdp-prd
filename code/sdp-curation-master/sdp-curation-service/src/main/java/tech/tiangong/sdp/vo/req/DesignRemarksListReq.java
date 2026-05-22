package tech.tiangong.sdp.vo.req;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.io.Serializable;

/**
* 设计打版备注信息
* <br>CreateDate August 10,2021
* @author lujunxuan
* @since 1.0
*/
@Data
public class DesignRemarksListReq implements Serializable {

    private static final long serialVersionUID = 4946220323212053211L;



    /**
    * 设计款号。 skc+年月日+4位流水号
    */
    @NotBlank(message = "设计款号不能为空")
    private String designCode;

}
