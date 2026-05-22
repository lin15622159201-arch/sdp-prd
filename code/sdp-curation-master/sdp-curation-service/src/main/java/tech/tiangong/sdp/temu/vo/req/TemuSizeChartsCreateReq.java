package tech.tiangong.sdp.temu.vo.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import tech.tiangong.sdp.temu.vo.TemuCommonReq;

import java.io.Serial;

/**
 * Temu-新增尺码表
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/8 14:30
 */
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TemuSizeChartsCreateReq extends TemuCommonReq {
    @Serial
    private static final long serialVersionUID = -2445292345807753395L;

    /**
     * 是否可复用
     */
    private Boolean reusable;


    /**
     * 类目 ID
     */
    private Long catId;

    /**
     * 尺码分类 ID
     */
    private Integer classId;

    /**
     * 模板名称
     */
    private String name;

    /**
     * 附加信息
     */
    private TemuSizeChartsExtReq ext;
    /**
     * 内容
     */
    private TemuSizeChartsContentReq content;

}
