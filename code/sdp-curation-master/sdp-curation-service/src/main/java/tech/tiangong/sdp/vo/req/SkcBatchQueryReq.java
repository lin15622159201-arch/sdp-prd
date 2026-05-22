package tech.tiangong.sdp.vo.req;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;
import java.util.List;

/**
 * SKC批量查询参数
 * @author liuhongfu
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SkcBatchQueryReq implements Serializable {
    /**
     * skc集合
     */
    @NotEmpty(message = "skc数组信息不能为空！")
    private List<String> skcs;

}
