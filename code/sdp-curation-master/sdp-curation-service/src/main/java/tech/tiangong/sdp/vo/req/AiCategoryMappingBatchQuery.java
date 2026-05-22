package tech.tiangong.sdp.vo.req;

import lombok.Data;
import tech.tiangong.sdp.enums.AiCategoryMappingTypeEnum;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serial;
import java.io.Serializable;
import java.util.List;

@Data
public class AiCategoryMappingBatchQuery implements Serializable {

    @Serial
    private static final long serialVersionUID = 7117371436523085382L;
    @NotNull
    @Size(min = 1, message = "AI品类编码不能为空")
    private List<String> aiCategoryCodes; // AI品类编码
    private AiCategoryMappingTypeEnum type; // 映射类型
}
