package tech.tiangong.sdp.temu.vo.req;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuReq;

import java.io.Serial;

/**
 * Temu商品-货品外包装信息
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:55
 */
@Data
public class TemuProductOuterPackageReq implements TemuReq {

    @Serial
    private static final long serialVersionUID = -6777802582314555654L;
    /**
     * 外包装形状
     */
    private Integer packageShape;

    /**
     * 外包装类型
     */
    private Integer packageType;
}
