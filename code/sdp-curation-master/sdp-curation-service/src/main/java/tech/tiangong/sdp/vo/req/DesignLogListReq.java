package tech.tiangong.sdp.vo.req;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
* 设计打版操作日志
* <br>CreateDate August 10,2021
* @author lujunxuan
* @since 1.0
*/
@Data
@SuperBuilder
@Accessors(chain = true)
@NoArgsConstructor
public class DesignLogListReq implements Serializable {


    /**
    * SKC主键ID不能为空
    */
    @NotNull(message = "SKC主键ID不能为空!")
    private Long prototypeId;

}
