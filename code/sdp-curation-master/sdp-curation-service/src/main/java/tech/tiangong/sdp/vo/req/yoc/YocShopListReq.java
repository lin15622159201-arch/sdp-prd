package tech.tiangong.sdp.vo.req.yoc;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * YOC店铺列表请求
 *
 * @author while
 * @since 1.0.0
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class YocShopListReq implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * 店铺id列表
     */
    private List<Long> shopIdList;

}
