package tech.tiangong.sdp.vo.dto;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * 商品状态分组结果
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/5 16:47
 */
@Data
public class ProductStateGroupDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = -7723618037449809788L;
    /**
     * 状态
     */
    private Integer taskStatus;
    /**
     * 总数
     */
    private Long total;
}
