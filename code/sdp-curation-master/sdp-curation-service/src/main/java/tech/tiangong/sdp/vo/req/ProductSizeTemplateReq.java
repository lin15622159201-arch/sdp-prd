package tech.tiangong.sdp.vo.req;

import lombok.Data;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.temu.vo.resp.TemuIdNameResp;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;

/**
 * 商品-SKC尺码
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/13 11:39
 */
@Data
public class ProductSizeTemplateReq implements Serializable {

    @Serial
    private static final long serialVersionUID = 8092367284471774939L;
    /**
     * 主键 id
     */
    private Long productSizeId;
    /**
     * 名称
     */
    private String name;
    /**
     * 重点部位
     * Yes:重点部位
     */
    private Bool show;
    /**
     * 尺码参数组元数据
     */
    private List<TemuIdNameResp> elementList;
    /**
     * 尺码 列表
     */
    private List<ProductSizeReq> sizeReqs;
    public boolean add () {
        return Objects.isNull(this.productSizeId) || this.productSizeId < 1;
    }
}
