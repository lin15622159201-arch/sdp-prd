package tech.tiangong.sdp.vo.resp;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * 商品-属性
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/13 10:33
 */
@Data
public class ProductAttrResp implements Serializable {
    @Serial
    private static final long serialVersionUID = -3538668120123771089L;
    /**
     * 主键 ID
     */
    private Long attrId;

    /**
     * 商品 id
     */
    private Long productId;

    /**
     * 模板属性 id
     */
    private Integer templatePid;
    /**
     * 属性 id
     */
    private Integer pid;
    /**
     * 引用属性 id
     */
    private Integer refPid;
    /**
     * 引用属性名
     */
    private String propName;
    /**
     * 基础属性值id，没有的情况传0
     */
    private Integer vid;
    /**
     * 基础属性值
     */
    private String propValue;
    /**
     * 属性值单位，没有的情况传空字符串
     */
    private String valueUnit;
    /**
     * 数值录入
     */
    private String numberInputValue;
    /**
     * 值扩展属性
     */
    private String valueExtendInfo;
    /**
     * 控制类型
     */
    private Integer controlType;
}
