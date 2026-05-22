package tech.tiangong.sdp.temu.vo.req;

import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.tiangong.sdp.temu.vo.TemuCommonReq;

import java.io.Serial;
import java.util.List;

/**
 * Temu商品-货品包装清单类型列表查询
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:55
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class TemuProductAccessoriesListGetPageReq extends TemuCommonReq {

    @Serial
    private static final long serialVersionUID = 3756342379861352979L;
    /**
     * 属性值（模糊搜索）
     */
    private String fuzzyValue ;
    /**
     * 页码
     */
    private Integer page;
    /**
     * 分页大小
     */
    private Integer pageSize;
    /**
     * 属性ID
     */
    private List<Integer> vidList;
}
