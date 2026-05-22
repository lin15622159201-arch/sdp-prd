package tech.tiangong.sdp.vo.req;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;
import java.util.List;

/**
 * SPU批量查询参数
 * @author liuhongfu
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpuBatchQueryReq implements Serializable {
    /**
     * spu集合
     */
    @NotEmpty(message = "spu数组信息不能为空！")
    private List<String> styleCodes;

}
