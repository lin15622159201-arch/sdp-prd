package tech.tiangong.sdp.vo.req.yoc;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

/**
 * YOC店铺审核请求
 *
 * @author while
 * @since 1.0.0
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class YocShopSubjectReq implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * 主体编码
     */
    private String subjectCode;

    /**
     * 主体名称
     */
    private String subjectName;
}
